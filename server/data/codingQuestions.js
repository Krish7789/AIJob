// server/data/codingQuestions.js

const codingQuestions = [
  /* -------------------------------------------------------------------------- */
  /*                                GOOGLE QUESTIONS                             */
  /* -------------------------------------------------------------------------- */

  {
    id: "g1",
    title: "Two Sum",
    company: "Google",
    difficulty: "Easy",
    description:
      "Given an array nums and an integer target, return the indices of two numbers such that they add up to target. Assume exactly one solution exists.",
    input_format:
      "First line: integer n\nSecond line: n space-separated integers\nThird line: target",
    output_format: "Print two indices i j (0-based).",
    constraints: [
      "2 <= n <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\n2 7 11 15\n9\n",
        output: "0 1\n",
        explanation: "2 + 7 = 9",
      },
    ],
    hidden_tests: [
      { name: "Hidden 1", input: "3\n3 3 3\n6\n", output: "0 1\n" },
      { name: "Hidden 2", input: "5\n1 2 3 4 5\n9\n", output: "3 4\n" },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g2",
    title: "Search in Rotated Sorted Array",
    company: "Google",
    difficulty: "Medium",
    description:
      "Given a rotated sorted array and a target, return its index. Return -1 if not found.",
    input_format: "n\nn space-separated integers\ntarget",
    output_format: "Print index of target.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "7\n4 5 6 7 0 1 2\n0\n",
        output: "4\n",
      },
    ],
    hidden_tests: [
      { name: "Hidden 1", input: "5\n1 3 5 7 9\n3\n", output: "1\n" },
      { name: "Hidden 2", input: "5\n6 7 1 2 3\n9\n", output: "-1\n" },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g3",
    title: "Word Ladder",
    company: "Google",
    difficulty: "Hard",
    description:
      "Given a beginWord, endWord, and a dictionary, return the length of shortest transformation sequence.",
    input_format:
      "beginWord endWord\nn\nn space-separated dictionary words",
    output_format: "Print length of sequence.",
    constraints: ["1 <= n <= 5000"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "hit cog\n6\nhot dot dog lot log cog\n",
        output: "5\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "hit cog\n3\nhot dot dog\n",
        output: "0\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  /* -------------------------------------------------------------------------- */
  /*                                AMAZON QUESTIONS                             */
  /* -------------------------------------------------------------------------- */

  {
    id: "a1",
    title: "Longest Substring Without Repeating Characters",
    company: "Amazon",
    difficulty: "Medium",
    description:
      "Given a string s, return the length of the longest substring without repeating characters.",
    input_format: "Single line: string s",
    output_format: "Print integer length.",
    constraints: ["1 <= |s| <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "abcabcbb\n",
        output: "3\n",
      },
    ],
    hidden_tests: [
      { name: "Hidden 1", input: "bbbbb\n", output: "1\n" },
      { name: "Hidden 2", input: "pwwkew\n", output: "3\n" },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "a2",
    title: "LRU Cache",
    company: "Amazon",
    difficulty: "Hard",
    description:
      "Design an LRU cache supporting get(key) and put(key,val) in O(1).",
    input_format:
      "First line: capacity\nNext lines: operations in format (type key value). type=1(get), 2(put)",
    output_format: "Print outputs of get operations.",
    constraints: ["1 <= capacity <= 10000"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "2\n2 1 1\n2 2 2\n1 1\n2 3 3\n1 2\n",
        output: "1 -1\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1\n2 1 1\n2 2 2\n1 1\n",
        output: "-1\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  /* -------------------------------------------------------------------------- */
  /*                              MICROSOFT QUESTIONS                            */
  /* -------------------------------------------------------------------------- */

  {
    id: "m1",
    title: "Number of Islands",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given grid of 0s and 1s, count number of islands (connected 1s).",
    input_format: "Rows Columns\ngrid rows...",
    output_format: "Print integer count.",
    constraints: ["1 <= grid <= 2000x2000"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4 5\n11110\n11010\n11000\n00000\n",
        output: "1\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3 3\n110\n110\n001\n",
        output: "2\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "m2",
    title: "Merge Intervals",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given intervals, merge all overlapping intervals.",
    input_format: "n\nn lines of: start end",
    output_format: "Print merged intervals.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\n1 3\n2 6\n8 10\n15 18\n",
        output: "1 6\n8 10\n15 18\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2\n1 4\n4 5\n",
        output: "1 5\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  /* -------------------------------------------------------------------------- */
  /*                                 META QUESTIONS                              */
  /* -------------------------------------------------------------------------- */

  {
    id: "fb1",
    title: "Clone Graph",
    company: "Meta",
    difficulty: "Medium",
    description:
      "Clone an undirected graph. Each node contains a value and list of neighbors.",
    input_format: "Serialized adjacency list",
    output_format: "Print cloned graph in same format.",
    constraints: ["1 <= nodes <= 100"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "1 [[2,4],[1,3],[2,4],[1,3]]\n",
        output: "1 [[2,4],[1,3],[2,4],[1,3]]\n",
      },
    ],
    hidden_tests: [],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "fb2",
    title: "Minimum Window Substring",
    company: "Meta",
    difficulty: "Hard",
    description:
      "Find minimum window in s which contains all characters of t.",
    input_format: "String s\nString t",
    output_format: "Smallest substring",
    constraints: ["1 <= |s|, |t| <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "ADOBECODEBANC\nABC\n",
        output: "BANC\n",
      },
    ],
    hidden_tests: [],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  /* -------------------------------------------------------------------------- */
  /*                                 NETFLIX QUESTIONS                           */
  /* -------------------------------------------------------------------------- */

  {
    id: "n1",
    title: "Top K Frequent Elements",
    company: "Netflix",
    difficulty: "Medium",
    description:
      "Given integer array nums and integer k, return k most frequent elements.",
    input_format: "n\nn numbers\nk",
    output_format: "k elements in any order.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "6\n1 1 1 2 2 3\n2\n",
        output: "1 2\n",
      },
    ],
    hidden_tests: [],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  /* -------------------------------------------------------------------------- */
  /*                                 UBER QUESTIONS                              */
  /* -------------------------------------------------------------------------- */

  {
    id: "u1",
    title: "Meeting Rooms II",
    company: "Uber",
    difficulty: "Medium",
    description:
      "Given meeting times, return minimum number of rooms required.",
    input_format: "n\nn lines start end",
    output_format: "Print integer",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n0 30\n5 10\n15 20\n",
        output: "2\n",
      },
    ],
    hidden_tests: [],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },
];

module.exports = { codingQuestions };
