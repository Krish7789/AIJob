// src/hooks/useSpeechRecognition.ts
import { useEffect, useRef, useState } from "react";

type SpeechRecognitionType = any;

export function useSpeechRecognition(
  onFinalResult: (text: string) => void
) {
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const [listening, setListening] = useState(false);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      console.error("SpeechRecognition API not supported.");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.continuous = true; // keep recording even if silent
    recognition.interimResults = true;

    recognition.onstart = () => {
      finalTranscriptRef.current = "";
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalChunk += event.results[i][0].transcript;
        }
      }

      if (finalChunk.trim()) {
        finalTranscriptRef.current += finalChunk.trim() + " ";
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
    };
  }, [onFinalResult]);

  const startListening = () => {
    finalTranscriptRef.current = "";
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);

    const text = finalTranscriptRef.current.trim();
    if (text.length > 0) {
      onFinalResult(text);
    }
  };

  return { startListening, stopListening, listening };
}
