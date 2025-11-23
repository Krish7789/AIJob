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

    const recognition: SpeechRecognitionType = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.continuous = true; // keep recording even in silence
    recognition.interimResults = true; // capture interim text

    finalTranscriptRef.current = "";

    recognition.onstart = () => {
      setListening(true);
      finalTranscriptRef.current = "";
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

      // Store final recognized chunks
      if (finalText.trim()) {
        finalTranscriptRef.current += finalText.trim() + " ";
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      setListening(false);
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

    const final = finalTranscriptRef.current.trim();
    if (final.length > 0) {
      onFinalResult(final);   // <-- sends answer to backend
    }
  };

  return { startListening, stopListening, listening };
}
