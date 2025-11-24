// server/controllers/codingController.js
const { codingQuestions } = require("../data/codingQuestions");
const { runCode } = require("../services/judge0Service");

exports.getCodingQuestions = (req, res) => {
  const { company } = req.query;

  let result = codingQuestions;

  if (company) {
    result = codingQuestions.filter(
      (q) => q.company.toLowerCase() === company.toLowerCase()
    );
  }

  res.json(result);
};

exports.submitSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const { language, code, mode } = req.body;

    const question = codingQuestions.find((q) => q.id === id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (!question.allowed_languages.includes(language)) {
      return res
        .status(400)
        .json({ error: "Language not allowed for this question" });
    }

    const tests =
      mode === "run"
        ? question.sample_tests
        : [...question.sample_tests, ...question.hidden_tests];

    const testResults = [];
    let passedCount = 0;
    let totalCount = tests.length;
    let globalStatus = "Accepted";
    let compileError = null;
    let runtimeError = null;

    for (const test of tests) {
      const { input, output, name } = test;

      const execResult = await runCode({
        sourceCode: code,
        language,
        stdin: input,
      });

      const actualOut = (execResult.stdout || "").trim();
      const expectedOut = (output || "").trim();

      // compile error
      if (execResult.compile_output) {
        compileError = execResult.compile_output;
        globalStatus = "Compile Error";

        testResults.push({
          name,
          type: mode === "run" ? "sample" : test.explanation ? "sample" : "hidden",
          passed: false,
          input,
          expectedOutput: output,
          actualOutput: execResult.stdout || "",
          error: "Compile Error",
        });

        break;
      }

      // runtime error
      if (execResult.stderr) {
        runtimeError = execResult.stderr;
        globalStatus = "Runtime Error";

        testResults.push({
          name,
          type: mode === "run" ? "sample" : test.explanation ? "sample" : "hidden",
          passed: false,
          input,
          expectedOutput: output,
          actualOutput: execResult.stdout || "",
          error: "Runtime Error",
        });

        break;
      }

      const passed = actualOut === expectedOut;

      if (!passed && globalStatus === "Accepted") {
        globalStatus = mode === "run" ? "Failed Samples" : "Wrong Answer";
      }

      if (passed) passedCount++;

      testResults.push({
        name,
        type: mode === "run" ? "sample" : test.explanation ? "sample" : "hidden",
        passed,
        input,
        expectedOutput: output,
        actualOutput: execResult.stdout || "",
      });
    }

    res.json({
      status: globalStatus,
      passedCount,
      totalCount,
      testResults,
      compileError,
      runtimeError,
    });
  } catch (err) {
    console.error("submitSolution error:", err);
    res.status(500).json({ error: "Failed to run code" });
  }
};
