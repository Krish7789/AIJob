// src/pages/InterviewSimulator.tsx
import { useCallback, useState, useEffect } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

interface HistoryItem {
  question: string;
  answer: string;
}

export default function InterviewSimulator() {
  // text-to-speech function
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

  // speak initial question
  // useEffect(() => {
  //   speakAI("Welcome. Let's start your interview. Tell me about yourself.");
  // }, []);

  const [currentQuestion, setCurrentQuestion] = useState(
    "Tell me about yourself."
  );
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");

  // send answer to backend
  const sendAnswerToBackend = useCallback(
    async (answer: string) => {
      if (!answer.trim()) return;

      // add user message to chat
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

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        // clean score
        const safeScore =
          typeof data.score === "number"
            ? data.score
            : Number(data.score) || 0;

        // update chat history
        setHistory((prev) => [
          ...prev,
          { question: currentQuestion, answer },
        ]);

        setCurrentQuestion(data.next_question || currentQuestion);
        setScore(safeScore);
        setGood(data.feedback_good || "");
        setBad(data.feedback_bad || "");

        // prepare AI message
        const aiText =
          `Score: ${safeScore}/10\n` +
          (data.feedback_good ? `Good: ${data.feedback_good}\n` : "") +
          (data.feedback_bad
            ? `Needs Improvement: ${data.feedback_bad}\n\n`
            : "\n") +
          `Next Question: ${data.next_question || "Let's continue..."}`;

        // add AI message to chat
        setChat((prev) => [...prev, { sender: "ai", text: aiText }]);

        // speak the next question
        if (data.next_question) {
          speakAI(data.next_question);
        }
      } catch (err) {
        console.error("Interview error:", err);
        setChat((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              "Something went wrong while analyzing your answer. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [currentQuestion, history]
  );

  // mic hook
  const { startListening, stopListening, listening } = useSpeechRecognition(
  sendAnswerToBackend
);


  // manual typing
  const handleTypeAnswer = async () => {
    const typed = window.prompt("Type your answer:");
    if (!typed) return;
    await sendAnswerToBackend(typed);
  };
  if (!hasStarted) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center pt-24">
      <h1 className="text-3xl font-bold mb-6">AI Interview Simulator</h1>

      <p className="text-lg text-gray-300 mb-10 text-center max-w-lg">
        Get ready for a 5-question AI-powered mock interview. Click below to begin.
      </p>

      <button
        onClick={() => {
          setHasStarted(true);
          speakAI("Welcome. Let's start your interview. Tell me about yourself.");
        }}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-xl font-semibold hover:scale-105 transition-transform shadow-lg"
      >
        Start Interview
      </button>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col pt-24">
      <h1 className="text-3xl font-bold mb-4 text-center">
        AI Interview Simulator
      </h1>

      <div className="flex-1 bg-gray-800 rounded-lg p-4 overflow-y-auto mb-4 space-y-3 shadow-md">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[75%] whitespace-pre-line ${
              msg.sender === "user"
                ? "bg-blue-600 self-end ml-auto"
                : "bg-gray-700 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="p-3 bg-gray-700 rounded-lg w-48 animate-pulse">
            Analyzing your answer…
          </div>
        )}
      </div>

     <div className="flex gap-3">
  {!listening && (
    <button
      onClick={startListening}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-lg font-semibold shadow-md ${
        loading
          ? "opacity-60 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      Speak
    </button>
  )}

  {listening && (
    <button
      onClick={stopListening}
      className="px-4 py-2 rounded-lg text-lg font-semibold shadow-md bg-red-600 hover:bg-red-700"
    >
      Stop Recording
    </button>
  )}

  <button
    onClick={handleTypeAnswer}
    disabled={loading}
    className={`bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-lg font-semibold shadow-md ${
      loading ? "opacity-60 cursor-not-allowed" : ""
    }`}
  >
    Type Answer
  </button>
</div>


      {score !== null && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Your Score: {score}/10</h2>

          {good && (
            <p className="text-green-400 mt-2">
              <strong>Good:</strong> {good}
            </p>
          )}

          {bad && (
            <p className="text-red-400 mt-2">
              <strong>Needs Improvement:</strong> {bad}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
