
import { useEffect, useRef, useState } from "react";

type SpeechRecognitionType = any;

interface UseSpeechRecognitionOptions {
  silenceTimeoutMs?: number; // auto-stop after silence
}

export function useSpeechRecognition(
  onFinalResult: (text: string) => void,
  options?: UseSpeechRecognitionOptions
) {
  const silenceTimeoutMs = options?.silenceTimeoutMs ?? 3000; // default 3s

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState("");

  const finalTranscriptRef = useRef("");
  const isStartingRef = useRef(false);

  
  useEffect(() => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      console.error("SpeechRecognition API not supported.");
      setSupported(false);
      return;
    }

    const recognition: SpeechRecognitionType = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
      finalTranscriptRef.current = "";
      setLiveTranscript("");
      isStartingRef.current = false;
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      // Save final chunks
      if (finalText.trim()) {
        finalTranscriptRef.current += finalText.trim() + " ";
      }

      // Update live transcript
      setLiveTranscript(
        (finalTranscriptRef.current + " " + interim).trim()
      );

      // Reset silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      silenceTimerRef.current = setTimeout(() => {
        stopListening(); // auto-stop after silence
      }, silenceTimeoutMs);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);

      // ignore aborted (happens normally)
      if (event.error === "aborted") return;

      setListening(false);
      isStartingRef.current = false;
    };

    recognition.onend = () => {
      setListening(false);
      isStartingRef.current = false;
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [onFinalResult, silenceTimeoutMs]);

  
  const startListening = async () => {
    if (!recognitionRef.current) return;
    if (listening) return;
    if (isStartingRef.current) return;

    try {
      isStartingRef.current = true;

      // Ensure mic permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      finalTranscriptRef.current = "";
      setLiveTranscript("");

      recognitionRef.current.start();
    } catch (err) {
      console.error("Microphone permission denied", err);
      isStartingRef.current = false;
    }
  };

 
  const stopListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
    setListening(false);
    isStartingRef.current = false;

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }

    const final = finalTranscriptRef.current.trim();

    if (final.length > 0) {
      onFinalResult(final);
    }

    setLiveTranscript("");
    finalTranscriptRef.current = "";
  };

  return {
    startListening,
    stopListening,
    listening,
    supported,
    liveTranscript, 
  };
}
