// src/pages/InterviewSimulator.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

interface HistoryItem {
  question: string;
  answer: string;
}

type FlagType =
  | "PERMISSIONS_GRANTED"
  | "PERMISSIONS_DENIED"
  | "CAMERA_ON"
  | "CAMERA_OFF"
  | "MIC_START"
  | "MIC_STOP"
  | "TAB_FOCUS"
  | "TAB_BLUR"
  | "FULLSCREEN_ENTER"
  | "FULLSCREEN_EXIT";

interface FlagItem {
  type: FlagType;
  at: number; // timestamp (ms)
  meta?: string;
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function InterviewSimulator() {
  // ✅ Theme-friendly page shell (no white)
  // You can replace these classes with your oo-* utility classes if you already created them.
  const shellBg = "min-h-screen pt-24 bg-gradient-to-b from-[#0b1220] via-[#0f172a] to-[#0b1220] text-white";
  const glass = "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl";
  const glassStrong =
    "rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl";
  const btnPrimary =
    "rounded-2xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 active:scale-[0.99] transition shadow-[0_14px_35px_rgba(34,211,238,0.18)]";
  const btnSecondary =
    "rounded-2xl px-5 py-3 font-semibold text-white/90 bg-white/10 border border-white/10 hover:bg-white/15 active:scale-[0.99] transition";
  const pill =
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/85 text-xs";

  // text-to-speech
  const speakAI = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [chat, setChat] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text:
        "Welcome! Let's start your interview.\n\n" +
        "First Question:\n" +
        "Tell me about yourself.",
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState("Tell me about yourself.");
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");

  // ✅ Proctoring: camera/mic/tab/fullscreen flags
  const [flags, setFlags] = useState<FlagItem[]>([]);
  const addFlag = useCallback((type: FlagType, meta?: string) => {
    setFlags((prev) => [{ type, at: Date.now(), meta }, ...prev].slice(0, 50));
  }, []);

  // ✅ CAMERA: permanent fix (keep mounted always)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setCamError(null);

      // already running
      if (streamRef.current && videoRef.current?.srcObject) {
        setCameraOn(true);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOn(true);
      addFlag("PERMISSIONS_GRANTED");
      addFlag("CAMERA_ON");
    } catch (e: any) {
      setCamError(e?.message || "Camera permission denied");
      setCameraOn(false);
      addFlag("PERMISSIONS_DENIED", e?.message);
      addFlag("CAMERA_OFF");
    }
  }, [addFlag]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
    addFlag("CAMERA_OFF");
  }, [addFlag]);

  // cleanup on page leave
  useEffect(() => {
    return () => {
      stopCamera();
      window.speechSynthesis.cancel();
    };
  }, [stopCamera]);

  // ✅ Tab focus/blur flags
  useEffect(() => {
    const onFocus = () => addFlag("TAB_FOCUS");
    const onBlur = () => addFlag("TAB_BLUR");
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [addFlag]);

  // ✅ Fullscreen state (optional proctor-like)
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const handler = () => {
      const fs = Boolean(document.fullscreenElement);
      setIsFullscreen(fs);
      addFlag(fs ? "FULLSCREEN_ENTER" : "FULLSCREEN_EXIT");
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [addFlag]);

  const requestFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen?.();
    } catch {
      // ignore
    }
  }, []);

  // ✅ send answer to backend
  const sendAnswerToBackend = useCallback(
    async (answer: string) => {
      if (!answer.trim()) return;

      // add user message
      setChat((prev) => [...prev, { sender: "user", text: answer }]);
      setLoading(true);

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/interview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "Software Engineer",
            answer,
            history,
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        const safeScore = typeof data.score === "number" ? data.score : Number(data.score) || 0;

        setHistory((prev) => [...prev, { question: currentQuestion, answer }]);
        setCurrentQuestion(data.next_question || currentQuestion);
        setScore(safeScore);
        setGood(data.feedback_good || "");
        setBad(data.feedback_bad || "");

        const aiText =
          `Score: ${safeScore}/10\n` +
          (data.feedback_good ? `Good: ${data.feedback_good}\n` : "") +
          (data.feedback_bad ? `Needs Improvement: ${data.feedback_bad}\n\n` : "\n") +
          `Next Question: ${data.next_question || "Let's continue..."}`;

        setChat((prev) => [...prev, { sender: "ai", text: aiText }]);

        if (data.next_question) speakAI(data.next_question);
      } catch (err) {
        console.error("Interview error:", err);
        setChat((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Something went wrong while analyzing your answer. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [currentQuestion, history]
  );

  // mic hook
  const { startListening, stopListening, listening } = useSpeechRecognition(sendAnswerToBackend);

  // attach proctor flags to mic actions
  const startMic = useCallback(() => {
    addFlag("MIC_START");
    startListening();
  }, [addFlag, startListening]);

  const stopMic = useCallback(() => {
    addFlag("MIC_STOP");
    stopListening();
  }, [addFlag, stopListening]);

  // manual typing
  const handleTypeAnswer = async () => {
    const typed = window.prompt("Type your answer:");
    if (!typed) return;
    await sendAnswerToBackend(typed);
  };

  const statusText = useMemo(() => {
    if (!cameraOn) return "Camera: Off";
    if (camError) return "Camera: Error";
    return "Camera: On";
  }, [cameraOn, camError]);

  const allGood = cameraOn && !camError;

  // ✅ IMPORTANT: we do NOT return early anymore (keeps camera mounted)
  return (
    <div className={shellBg}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* LEFT: Proctor Panel */}
          <div className={`${glassStrong} p-5`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Proctor Panel</h3>
              <span
                className={
                  allGood
                    ? "text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/20"
                    : "text-xs px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/20"
                }
              >
                {allGood ? "All Good" : "Needs Setup"}
              </span>
            </div>

            {/* Video always mounted */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 aspect-video">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            </div>

            {camError && <p className="mt-3 text-sm text-red-300">{camError}</p>}

            <div className="mt-4 flex gap-2 flex-wrap">
              <button onClick={startCamera} className="px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-400/20 hover:bg-cyan-500/20 transition">
                Enable Camera
              </button>
              <button onClick={stopCamera} className="px-4 py-2 rounded-full bg-white/5 text-white/85 border border-white/10 hover:bg-white/10 transition">
                Stop
              </button>
              <button onClick={requestFullscreen} className="px-4 py-2 rounded-full bg-white/5 text-white/85 border border-white/10 hover:bg-white/10 transition">
                Fullscreen
              </button>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className={pill}>{statusText}</span>
              <span className={pill}>{listening ? "Mic: Recording" : "Mic: Ready"}</span>
              <span className={pill}>{isFullscreen ? "Fullscreen: On" : "Fullscreen: Off"}</span>
            </div>

            {/* Flags */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white/90">Flags</h4>
                <button
                  onClick={() => setFlags([])}
                  className="text-xs text-white/60 hover:text-white/80 transition"
                >
                  Clear
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
                {flags.length === 0 ? (
                  <div className="text-sm text-white/60">
                    No flags yet. Start the interview to begin tracking.
                  </div>
                ) : (
                  flags.map((f, idx) => (
                    <div
                      key={`${f.type}-${f.at}-${idx}`}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{f.type}</span>
                        <span className="text-xs text-white/50">{formatTime(f.at)}</span>
                      </div>
                      {f.meta ? <div className="text-xs text-white/60 mt-1">{f.meta}</div> : null}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Interview Panel */}
          <div className={`${glassStrong} p-6`}>
            <h1 className="text-4xl font-extrabold text-center tracking-tight">
              AI Interview Simulator
            </h1>

            {/* Start banner (keeps camera mounted) */}
            {!hasStarted && (
              <div className={`${glass} mt-6 p-6 text-center`}>
                <p className="text-white/85 text-lg">
                  Get ready for a 5-question AI-powered mock interview.
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Tip: Enable camera + fullscreen for a proctor-style experience.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={async () => {
                      // ✅ ensure camera stays attached before starting
                      await startCamera();
                      setHasStarted(true);
                      speakAI("Welcome. Let's start your interview. Tell me about yourself.");
                    }}
                    className={btnPrimary}
                  >
                    Start Interview
                  </button>
                  <button
                    onClick={async () => {
                      await startCamera();
                      await requestFullscreen();
                    }}
                    className={btnSecondary}
                  >
                    Setup Camera + Fullscreen
                  </button>
                </div>
              </div>
            )}

            {/* Chat */}
            <div className="mt-6 flex-1">
              <div className="h-[420px] overflow-y-auto space-y-3 p-4 rounded-2xl border border-white/10 bg-black/20">
                {chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl max-w-[78%] whitespace-pre-line ${
                      msg.sender === "user"
                        ? "ml-auto bg-gradient-to-r from-blue-600/80 to-cyan-500/60 border border-white/10"
                        : "mr-auto bg-white/10 border border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}

                {loading && (
                  <div className="p-3 bg-white/10 border border-white/10 rounded-2xl w-56 animate-pulse">
                    Analyzing your answer…
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                {!listening ? (
                  <button
                    onClick={startMic}
                    disabled={!hasStarted || loading}
                    className={`${btnPrimary} ${
                      !hasStarted || loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    Speak
                  </button>
                ) : (
                  <button onClick={stopMic} className="rounded-2xl px-5 py-3 font-semibold bg-red-600 hover:bg-red-700 transition shadow-md">
                    Stop Recording
                  </button>
                )}

                <button
                  onClick={handleTypeAnswer}
                  disabled={!hasStarted || loading}
                  className={`${btnSecondary} ${
                    !hasStarted || loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  Type Answer
                </button>
              </div>

              {/* Score / Feedback */}
              {score !== null && (
                <div className={`${glass} mt-6 p-5`}>
                  <h2 className="text-xl font-bold mb-2">Your Score: {score}/10</h2>

                  {good && (
                    <p className="text-emerald-300 mt-2">
                      <strong className="text-emerald-200">Good:</strong> {good}
                    </p>
                  )}

                  {bad && (
                    <p className="text-red-300 mt-2">
                      <strong className="text-red-200">Needs Improvement:</strong> {bad}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="mt-6 text-center text-xs text-white/45">
              Camera stays active throughout the session (no sudden disappear).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
