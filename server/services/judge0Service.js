const axios = require("axios");

const JUDGE0_URL = "https://ce.judge0.com";

const LANGUAGE_MAP = {
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
};

async function runCode({ sourceCode, language, stdin }) {
  const language_id = LANGUAGE_MAP[language];

  if (!language_id) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const response = await axios.post(
    `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
    {
      source_code: sourceCode,
      language_id,
      stdin,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return {
    stdout: response.data.stdout || "",
    stderr: response.data.stderr || "",
    compile_output: response.data.compile_output || "",
    status: response.data.status || {},
  };
}

module.exports = { runCode };
