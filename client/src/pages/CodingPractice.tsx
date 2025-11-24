// src/pages/CodingPractice.tsx
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

type LanguageKey = "cpp" | "java" | "python" | "javascript";

interface CodingQuestion {
  id: string;
  title: string;
  company: string;
  difficulty: string;
  description: string;
  input_format: string;
  output_format: string;
  constraints: string[];
  sample_tests: {
    name: string;
    input: string;
    output: string;
    explanation?: string;
  }[];
  allowed_languages: LanguageKey[];
}

interface TestResult {
  name: string;
  type: "sample" | "hidden" | string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
}

interface Verdict {
  status: string;
  passedCount: number;
  totalCount: number;
  testResults: TestResult[];
  compileError?: string | null;
  runtimeError?: string | null;
}

const companies = ["Google", "Amazon", "Microsoft", "Meta", "Netflix", "Apple", "Uber", "Goldman Sachs"];

const defaultTemplates: Record<LanguageKey, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // read input from stdin, write output to stdout
    return 0;
}
`,
  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // read input and print output
    }
}
`,
  python: `import sys

def main():
    data = sys.stdin.read().strip().split()
    // process input

if __name__ == "__main__":
    main()
`,
  javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
// process input
`,
};

const CodingPractice = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("Google");
  const [questions, setQuestions] = useState<CodingQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] =
    useState<CodingQuestion | null>(null);
  const [language, setLanguage] = useState<LanguageKey>("cpp");
  const [code, setCode] = useState<string>(defaultTemplates["cpp"]);
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/coding-questions?company=${encodeURIComponent(
            selectedCompany
          )}`
        );
        const data = await res.json();
        setQuestions(data);

        if (data.length > 0) {
          setSelectedQuestion(data[0]);
          const lang: LanguageKey =
            (data[0].allowed_languages[0] as LanguageKey) || "cpp";
          setLanguage(lang);
          setCode(defaultTemplates[lang]);
          setVerdict(null);
        } else {
          setSelectedQuestion(null);
        }
      } catch (err) {
        console.error("Failed to fetch coding questions:", err);
      }
    };

    if (backendUrl) {
      fetchQuestions();
    }
  }, [selectedCompany, backendUrl]);

  const handleSelectQuestion = (q: CodingQuestion) => {
    setSelectedQuestion(q);
    const firstLang: LanguageKey =
      (q.allowed_languages[0] as LanguageKey) || "cpp";
    setLanguage(firstLang);
    setCode(defaultTemplates[firstLang]);
    setVerdict(null);
  };

  const handleLanguageChange = (lang: LanguageKey) => {
    setLanguage(lang);
    setCode(defaultTemplates[lang]);
    setVerdict(null);
  };

  const runOrSubmit = async (mode: "run" | "submit") => {
    if (!selectedQuestion) return;
    if (!code.trim()) {
      alert("Write some code first.");
      return;
    }

    setLoading(true);
    setVerdict(null);

    try {
      const res = await fetch(
        `${backendUrl}/api/coding-questions/${selectedQuestion.id}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language,
            code,
            mode,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = (await res.json()) as Verdict;
      setVerdict(data);
    } catch (err) {
      console.error("Error submitting solution:", err);
      alert("Something went wrong while running your code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 px-6 flex flex-col">
      <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 text-center">
        MNC Coding Practice
      </h1>
      <p className="text-gray-300 text-center mb-6 max-w-2xl mx-auto">
        Practice handpicked coding questions from top companies with a built-in
        code editor and judge.
      </p>

      {/* Company selector strip */}
      <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-3 mb-4 max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {companies.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCompany(c)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${
                selectedCompany === c
                  ? "bg-cyan-600 border-cyan-300"
                  : "bg-gray-800 border-gray-600 hover:bg-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main split area: left = question, right = editor+results */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:h-[calc(100vh-11rem)]">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Question list */}
          <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-4 h-32 overflow-y-auto">
            <h2 className="font-semibold mb-2 text-cyan-300">
              Questions ({questions.length})
            </h2>
            {questions.length === 0 && (
              <p className="text-gray-400 text-sm">
                No questions configured for this company yet.
              </p>
            )}
            <div className="space-y-2">
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`w-full text-left p-2 rounded-lg border text-xs md:text-sm transition ${
                    selectedQuestion?.id === q.id
                      ? "bg-cyan-600/30 border-cyan-400"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <div className="font-medium line-clamp-1">{q.title}</div>
                  <div className="text-[11px] text-gray-400 flex justify-between mt-1">
                    <span>{q.company}</span>
                    <span className="capitalize">{q.difficulty}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question details */}
          <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-5 flex-1 overflow-y-auto">
            {selectedQuestion ? (
              <>
                <h2 className="text-lg md:text-xl font-semibold mb-1">
                  {selectedQuestion.title}
                </h2>
                <p className="text-xs text-gray-400 mb-3">
                  {selectedQuestion.company} •{" "}
                  <span className="capitalize">
                    {selectedQuestion.difficulty}
                  </span>
                </p>

                <h3 className="font-semibold text-cyan-300 text-sm mb-1">
                  Description
                </h3>
                <p className="text-sm text-gray-300 whitespace-pre-line mb-3">
                  {selectedQuestion.description}
                </p>

                <h3 className="font-semibold text-cyan-300 text-sm mb-1">
                  Input Format
                </h3>
                <p className="text-sm text-gray-300 whitespace-pre-line mb-2">
                  {selectedQuestion.input_format}
                </p>

                <h3 className="font-semibold text-cyan-300 text-sm mb-1">
                  Output Format
                </h3>
                <p className="text-sm text-gray-300 whitespace-pre-line mb-2">
                  {selectedQuestion.output_format}
                </p>

                <h3 className="font-semibold text-cyan-300 text-sm mb-1">
                  Constraints
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-300 mb-3">
                  {selectedQuestion.constraints.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-cyan-300 text-sm mb-1">
                  Sample Test Case
                </h3>
                {selectedQuestion.sample_tests.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 mb-3 text-xs"
                  >
                    <div className="text-gray-400 mb-1">{t.name}</div>
                    <div className="text-gray-300 mb-1">
                      <span className="font-semibold">Input:</span>
                      <pre className="whitespace-pre-wrap mt-1">
                        {t.input.trim()}
                      </pre>
                    </div>
                    <div className="text-gray-300 mb-1">
                      <span className="font-semibold">Output:</span>
                      <pre className="whitespace-pre-wrap mt-1">
                        {t.output.trim()}
                      </pre>
                    </div>
                    {t.explanation && (
                      <div className="text-gray-400 mt-1">
                        <span className="font-semibold">Explanation:</span>{" "}
                        {t.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Select a question to view details.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {selectedQuestion ? (
            <>
              {/* Editor card */}
              <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-4 flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Language:</span>
                    <select
                      className="bg-gray-900 border border-gray-600 text-sm rounded px-2 py-1"
                      value={language}
                      onChange={(e) =>
                        handleLanguageChange(e.target.value as LanguageKey)
                      }
                    >
                      {selectedQuestion.allowed_languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => runOrSubmit("run")}
                      disabled={loading}
                      className={`px-4 py-1.5 rounded text-sm font-semibold ${
                        loading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      Run (Sample Tests)
                    </button>
                    <button
                      onClick={() => runOrSubmit("submit")}
                      disabled={loading}
                      className={`px-4 py-1.5 rounded text-sm font-semibold ${
                        loading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      Submit (All Tests)
                    </button>
                  </div>
                </div>

                <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
                  <div
  className="editor-wrapper"
  style={{ outline: "none" }}
  tabIndex={0}
  onKeyDown={(e) => e.stopPropagation()}
  onKeyUp={(e) => e.stopPropagation()}
  onKeyPress={(e) => e.stopPropagation()}
>
  <Editor
    height="320px"
    theme="vs-dark"
    language={
      language === "cpp"
        ? "cpp"
        : language === "python"
        ? "python"
        : language === "java"
        ? "java"
        : "javascript"
    }
    value={code}
    onChange={(value) => setCode(value || "")}
    options={{
      autoClosingBrackets: "always",
      cursorBlinking: "blink",
      detectIndentation: false,
      tabIndex: 0,
      accessibilitySupport: "off",
      minimap: { enabled: false },
      fontSize: 13,
    }}
  />
</div>


                </div>
              </div>

              {/* Verdict / results card */}
              <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-4 h-52 overflow-y-auto">
                {loading && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative">
                      <div className="w-10 h-10 border-4 border-transparent border-t-cyan-400 border-l-blue-400 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 blur-xl opacity-40 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse"></div>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      Running your code…
                    </p>
                  </div>
                )}

                {verdict && !loading && (
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-cyan-300">
                        Result: {verdict.status}
                      </h3>
                      <span className="text-gray-300">
                        Passed {verdict.passedCount} / {verdict.totalCount}
                      </span>
                    </div>

                    {verdict.compileError && (
                      <div className="bg-red-900/40 border border-red-500/60 rounded p-3 text-[11px] text-red-200 whitespace-pre-wrap">
                        <strong>Compile Error:</strong>
                        <pre>{verdict.compileError}</pre>
                      </div>
                    )}

                    {verdict.runtimeError && (
                      <div className="bg-red-900/40 border border-red-500/60 rounded p-3 text-[11px] text-red-200 whitespace-pre-wrap">
                        <strong>Runtime Error:</strong>
                        <pre>{verdict.runtimeError}</pre>
                      </div>
                    )}

                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {verdict.testResults.map((t, idx) => (
                        <div
                          key={idx}
                          className={`rounded p-2 border ${
                            t.passed
                              ? "bg-green-900/40 border-green-500/60"
                              : "bg-red-900/40 border-red-500/60"
                          }`}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold">
                              {t.name} ({t.type})
                            </span>
                            <span>{t.passed ? "Passed" : "Failed"}</span>
                          </div>
                          <div className="text-gray-200">
                            <span className="font-semibold">Expected:</span>{" "}
                            <pre className="inline whitespace-pre-wrap">
                              {t.expectedOutput.trim()}
                            </pre>
                          </div>
                          <div className="text-gray-200">
                            <span className="font-semibold">Got:</span>{" "}
                            <pre className="inline whitespace-pre-wrap">
                              {t.actualOutput.trim()}
                            </pre>
                          </div>
                          {t.error && (
                            <div className="text-red-200 mt-1">
                              <span className="font-semibold">Error:</span>{" "}
                              {t.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!loading && !verdict && (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Run or submit your code to see results.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No question selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingPractice;
