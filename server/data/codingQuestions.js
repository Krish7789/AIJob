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
    {
    id: "g18",
    title: "Find Peak Element",
    company: "Google",
    difficulty: "Medium",
    description:
      "Given an array nums, find a peak element and return its index. A peak element is greater than its neighbors.",
    input_format: "n\nn space-separated integers",
    output_format: "Print index of any peak element.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\n1 2 3 1\n",
        output: "2\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "6\n1 2 1 3 5 6\n",
        output: "5\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g19",
    title: "Container With Most Water",
    company: "Google",
    difficulty: "Medium",
    description:
      "Given n non-negative integers where each represents a point at coordinate (i, height[i]), find two lines that together with x-axis forms a container that holds the most water.",
    input_format: "n\nn space-separated integers",
    output_format: "Print maximum water area.",
    constraints: ["2 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "9\n1 8 6 2 5 4 8 3 7\n",
        output: "49\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2\n1 1\n",
        output: "1\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g20",
    title: "First Missing Positive",
    company: "Google",
    difficulty: "Hard",
    description:
      "Given an unsorted integer array nums, return the smallest missing positive integer.",
    input_format: "n\nn space-separated integers",
    output_format: "Print smallest missing positive integer.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n1 2 0\n",
        output: "3\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "4\n3 4 -1 1\n",
        output: "2\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g21",
    title: "Spiral Matrix",
    company: "Google",
    difficulty: "Medium",
    description:
      "Given an m x n matrix, return all elements of the matrix in spiral order.",
    input_format: "rows cols\nmatrix rows...",
    output_format: "Print spiral order elements.",
    constraints: ["1 <= rows, cols <= 1000"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3 3\n1 2 3\n4 5 6\n7 8 9\n",
        output: "1 2 3 6 9 8 7 4 5\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2 2\n1 2\n3 4\n",
        output: "1 2 4 3\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g22",
    title: "Set Matrix Zeroes",
    company: "Google",
    difficulty: "Medium",
    description:
      "Given an m x n matrix, if an element is 0, set its entire row and column to 0.",
    input_format: "rows cols\nmatrix rows...",
    output_format: "Print modified matrix.",
    constraints: ["1 <= rows, cols <= 1000"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3 3\n1 1 1\n1 0 1\n1 1 1\n",
        output: "1 0 1\n0 0 0\n1 0 1\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2 2\n0 1\n1 1\n",
        output: "0 0\n0 1\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g23",
    title: "Top K Frequent Elements",
    company: "Google",
    difficulty: "Medium",
    description:
      "Given an integer array nums and an integer k, return the k most frequent elements.",
    input_format: "n\nn space-separated integers\nk",
    output_format: "Print k most frequent elements.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "6\n1 1 1 2 2 3\n2\n",
        output: "1 2\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "5\n4 4 4 6 6\n1\n",
        output: "4\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g24",
    title: "Rotate Image",
    company: "Google",
    difficulty: "Medium",
    description:
      "You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees clockwise.",
    input_format: "n\nmatrix rows...",
    output_format: "Print rotated matrix.",
    constraints: ["1 <= n <= 1000"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n1 2 3\n4 5 6\n7 8 9\n",
        output: "7 4 1\n8 5 2\n9 6 3\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2\n1 2\n3 4\n",
        output: "3 1\n4 2\n",
      },
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"],
  },

  {
    id: "g25",
    title: "Implement Trie (Prefix Tree)",
    company: "Google",
    difficulty: "Hard",
    description:
      "Implement a Trie with insert, search, and startsWith methods.",
    input_format:
      "n\noperations (type word) where type=1(insert), 2(search), 3(startsWith)",
    output_format: "Print results of search and startsWith operations.",
    constraints: ["1 <= n <= 10^4"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "5\n1 apple\n2 apple\n2 app\n3 app\n2 apple\n",
        output: "true false true true\n",
      },
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n1 hello\n2 hell\n3 he\n",
        output: "false true\n",
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
  {
    id: "a3",
    title: "Palindrome Number",
    company: "Amazon",
    difficulty: "Easy",
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    input_format: "Single integer x",
    output_format: "Print true or false.",
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    sample_tests: [
      { name: "Sample 1", input: "121\n", output: "true\n" },
      { name: "Sample 2", input: "-121\n", output: "false\n" }
    ],
    hidden_tests: [
      { name: "Hidden 1", input: "10\n", output: "false\n" },
      { name: "Hidden 2", input: "1331\n", output: "true\n" }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "a4",
    title: "Merge Intervals",
    company: "Amazon",
    difficulty: "Medium",
    description:
      "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.",
    input_format: "First line n intervals; next n lines: start end",
    output_format: "Print merged intervals.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n1 3\n2 6\n8 10\n",
        output: "1 6\n8 10\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2\n1 4\n4 5\n",
        output: "1 5\n"
      },
      {
        name: "Hidden 2",
        input: "3\n1 4\n0 2\n3 5\n",
        output: "0 5\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "a5",
    title: "Two Sum",
    company: "Amazon",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    input_format: "First line n; next line n integers; next line target",
    output_format: "Print two indices.",
    constraints: ["2 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\n2 7 11 15\n9\n",
        output: "0 1\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n3 2 4\n6\n",
        output: "1 2\n"
      },
      {
        name: "Hidden 2",
        input: "2\n3 3\n6\n",
        output: "0 1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "a6",
    title: "Group Anagrams",
    company: "Amazon",
    difficulty: "Medium",
    description:
      "Given an array of strings strs, group the anagrams together.",
    input_format: "First line n; next n lines words",
    output_format: "Print groups of anagrams (each group in one line).",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\neat\ntea\ntan\nate\n",
        output: "eat tea ate\ntan\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\nbat\tab\tba\n",
        output: "bat ab ba\n"
      },
      {
        name: "Hidden 2",
        input: "3\nabc\ncab\nbac\n",
        output: "abc cab bac\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "a7",
    title: "Valid Parentheses",
    company: "Amazon",
    difficulty: "Easy",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    input_format: "Single line string s",
    output_format: "Print true or false.",
    constraints: ["1 <= |s| <= 10^5"],
    sample_tests: [
      { name: "Sample 1", input: "()\n", output: "true\n" },
      { name: "Sample 2", input: "([)]\n", output: "false\n" }
    ],
    hidden_tests: [
      { name: "Hidden 1", input: "{[]}\n", output: "true\n" },
      { name: "Hidden 2", input: "((\n", output: "false\n" }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "a8",
    title: "Number of Islands",
    company: "Amazon",
    difficulty: "Medium",
    description:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    input_format: "First line m n; next m lines of n chars (0/1)",
    output_format: "Print integer count.",
    constraints: ["1 <= m,n <= 300"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4 5\n11000\n11000\n00100\n00011\n",
        output: "3\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1 1\n1\n",
        output: "1\n"
      },
      {
        name: "Hidden 2",
        input: "3 3\n111\n000\n111\n",
        output: "2\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "a9",
    title: "Search in Rotated Sorted Array",
    company: "Amazon",
    difficulty: "Medium",
    description:
      "Given the array nums after rotation and target value, return the index of target, or -1 if not present.",
    input_format: "First line n; next line n ints; next line target",
    output_format: "Print index or -1.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "7\n4 5 6 7 0 1 2\n0\n",
        output: "4\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "7\n4 5 6 7 0 1 2\n3\n",
        output: "-1\n"
      },
      {
        name: "Hidden 2",
        input: "1\n1\n0\n",
        output: "-1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
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
  {
    id: "m3",
    title: "Search in Rotated Sorted Array",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given a rotated sorted array and a target, return its index or -1 if not present.",
    input_format: "n\nn ints\n target",
    output_format: "Print index or -1.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "7\n4 5 6 7 0 1 2\n0\n",
        output: "4\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "7\n4 5 6 7 0 1 2\n3\n",
        output: "-1\n"
      },
      {
        name: "Hidden 2",
        input: "1\n1\n0\n",
        output: "-1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "m4",
    title: "Detect Cycle in Linked List",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given head of a linked list, determine if it contains a cycle.",
    input_format: "List length then values; last index for cycle or -1",
    output_format: "Print true or false.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n3 2 0\n1\n",
        output: "true\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "4\n1 2 3 4\n-1\n",
        output: "false\n"
      },
      {
        name: "Hidden 2",
        input: "1\n1\n0\n",
        output: "true\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "m5",
    title: "Validate IP Address",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given a string, determine if it is a valid IPv4 address.",
    input_format: "Single line string",
    output_format: "Print true or false.",
    constraints: ["IPv4 format only"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "192.168.1.1\n",
        output: "true\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "256.1.1.1\n",
        output: "false\n"
      },
      {
        name: "Hidden 2",
        input: "1.1.1\n",
        output: "false\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "m6",
    title: "Clone a Linked List with Random Pointer",
    company: "Microsoft",
    difficulty: "Hard",
    description:
      "Given a linked list where each node has an extra random pointer, deep clone it.",
    input_format: "n\nvalues\nrandom indices mapping",
    output_format: "Print cloned list random mapping.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n1 2 3\n0 2 -1\n",
        output: "1->2->3\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1\n5\n-1\n",
        output: "5\n"
      },
      {
        name: "Hidden 2",
        input: "4\n7 7 7 7\n1 3 0 2\n",
        output: "7->7->7->7\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "m7",
    title: "Find Missing Element in Sorted Array",
    company: "Microsoft",
    difficulty: "Easy",
    description:
      "Given sorted array of 1..n+1 with one missing, find missing element.",
    input_format: "n\nn ints",
    output_format: "Print missing integer.",
    constraints: ["2 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\n1 2 4 5\n",
        output: "3\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n1 3 4\n",
        output: "2\n"
      },
      {
        name: "Hidden 2",
        input: "3\n2 3 4\n",
        output: "1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "m8",
    title: "Check if Binary Tree is BST",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given a binary tree, check if it is a valid binary search tree.",
    input_format: "n\nvalues with null marker",
    output_format: "Print true or false.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "7\n2 1 3 null null null null\n",
        output: "true\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n2 3 1\n",
        output: "false\n"
      },
      {
        name: "Hidden 2",
        input: "5\n5 3 7 2 4\n",
        output: "true\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "m9",
    title: "Two Numbers Add Using Linked Lists",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given two linked lists representing large numbers, add them and output result list.",
    input_format: "n1\nvals1\nn2\nvals2",
    output_format: "Print sum list.",
    constraints: ["1 <= n1,n2 <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n9 9 9\n3\n1 0 1\n",
        output: "1 0 0 0\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1\n5\n1\n5\n",
        output: "1 0\n"
      },
      {
        name: "Hidden 2",
        input: "3\n0 0 1\n3\n0 0 1\n",
        output: "0 0 2\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  {
    id: "m10",
    title: "Longest Increasing Subsequence",
    company: "Microsoft",
    difficulty: "Medium",
    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    input_format: "n\nn integers",
    output_format: "Print integer length.",
    constraints: ["1 <= n <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "8\n10 9 2 5 3 7 101 18\n",
        output: "4\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "5\n1 2 3 4 5\n",
        output: "5\n"
      },
      {
        name: "Hidden 2",
        input: "6\n5 4 3 2 1 0\n",
        output: "1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
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
  {
    id: "fb3",
    title: "Binary Tree Vertical Order Traversal",
    company: "Meta",
    difficulty: "Medium",
    description:
      "Given the root of a binary tree, return its vertical order traversal.",
    input_format: "n\nLevel order traversal with null as -1",
    output_format: "Print vertical order line by line.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "7\n3 9 20 -1 -1 15 7\n",
        output: "9\n3 15\n20\n7\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n1 2 3\n",
        output: "2\n1\n3\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "fb4",
    title: "Kth Largest Element in an Array",
    company: "Meta",
    difficulty: "Medium",
    description:
      "Given an integer array nums and an integer k, return the kth largest element in the array.",
    input_format: "n\nn integers\nk",
    output_format: "Print kth largest element.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "6\n3 2 1 5 6 4\n2\n",
        output: "5\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "5\n7 10 4 3 20\n3\n",
        output: "7\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "fb5",
    title: "Word Break",
    company: "Meta",
    difficulty: "Medium",
    description:
      "Given a string s and a dictionary of words, return true if s can be segmented into a sequence of one or more dictionary words.",
    input_format: "String s\nn\nn dictionary words",
    output_format: "Print true or false.",
    constraints: ["1 <= |s| <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "leetcode\n2\nleet\ncode\n",
        output: "true\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "applepenapple\n2\napple\npen\n",
        output: "true\n"
      },
      {
        name: "Hidden 2",
        input: "catsandog\n5\ncats\ndog\nsand\nand\ncat\n",
        output: "false\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "fb6",
    title: "Lowest Common Ancestor of a Binary Tree",
    company: "Meta",
    difficulty: "Medium",
    description:
      "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes.",
    input_format: "n\nLevel order traversal with -1 as null\np q",
    output_format: "Print value of LCA.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "7\n3 5 1 6 2 0 8\n5 1\n",
        output: "3\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "7\n3 5 1 6 2 0 8\n5 4\n",
        output: "5\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  {
    id: "fb7",
    title: "Serialize and Deserialize Binary Tree",
    company: "Meta",
    difficulty: "Hard",
    description:
      "Design an algorithm to serialize and deserialize a binary tree.",
    input_format: "n\nLevel order traversal with -1 as null",
    output_format: "Print serialized string after deserialize-serialize cycle.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "7\n1 2 3 -1 -1 4 5\n",
        output: "1 2 3 -1 -1 4 5\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1\n1\n",
        output: "1\n"
      },
      {
        name: "Hidden 2",
        input: "3\n1 2 -1\n",
        output: "1 2 -1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "fb8",
    title: "Trapping Rain Water",
    company: "Meta",
    difficulty: "Hard",
    description:
      "Given n non-negative integers representing elevation map, compute how much water it can trap after raining.",
    input_format: "n\nn integers",
    output_format: "Print total trapped water.",
    constraints: ["1 <= n <= 10^5", "0 <= height[i] <= 10^9"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "12\n0 1 0 2 1 0 1 3 2 1 2 1\n",
        output: "6\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "6\n4 2 0 3 2 5\n",
        output: "9\n"
      },
      {
        name: "Hidden 2",
        input: "3\n3 2 1\n",
        output: "0\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "fb9",
    title: "Alien Dictionary",
    company: "Meta",
    difficulty: "Hard",
    description:
      "Given a sorted dictionary of an alien language, find the order of characters in the alien language.",
    input_format: "n\nn sorted words",
    output_format: "Print valid character order.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "5\nwrt\nwrf\ner\nett\nrftt\n",
        output: "wertf\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\nz\nx\nz\n",
        output: "\n"
      },
      {
        name: "Hidden 2",
        input: "2\nabc\nab\n",
        output: "\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
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
  {
    id: "n2",
    title: "Product of Array Except Self",
    company: "Netflix",
    difficulty: "Medium",
    description:
      "Given an array nums, return an array answer such that answer[i] is product of all elements except nums[i].",
    input_format: "n\nn integers",
    output_format: "Print n integers.",
    constraints: ["2 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\n1 2 3 4\n",
        output: "24 12 8 6\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n2 0 4\n",
        output: "0 8 0\n"
      },
      {
        name: "Hidden 2",
        input: "3\n5 5 5\n",
        output: "25 25 25\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "n3",
    title: "Sort Colors",
    company: "Netflix",
    difficulty: "Easy",
    description:
      "Given an array with values 0,1,2, sort it in-place.",
    input_format: "n\nn integers (0/1/2)",
    output_format: "Print sorted n integers.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "6\n2 0 2 1 1 0\n",
        output: "0 0 1 1 2 2\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1\n1\n",
        output: "1\n"
      },
      {
        name: "Hidden 2",
        input: "5\n2 2 2 2 2\n",
        output: "2 2 2 2 2\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "n4",
    title: "Longest Palindromic Substring",
    company: "Netflix",
    difficulty: "Medium",
    description:
      "Given string s, return the longest palindromic substring in s.",
    input_format: "Single line string",
    output_format: "Print longest palindrome.",
    constraints: ["1 <= |s| <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "babad\n",
        output: "bab\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "cbbd\n",
        output: "bb\n"
      },
      {
        name: "Hidden 2",
        input: "a\n",
        output: "a\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "n5",
    title: "Find Peak Element",
    company: "Netflix",
    difficulty: "Medium",
    description:
      "Given an integer array nums, return index of a peak element (greater than neighbors).",
    input_format: "n\nn integers",
    output_format: "Print index of any peak.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n1 2 3\n",
        output: "2\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n1 2 1\n",
        output: "1\n"
      },
      {
        name: "Hidden 2",
        input: "3\n5 4 3\n",
        output: "0\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "n6",
    title: "Number of 1 Bits",
    company: "Netflix",
    difficulty: "Easy",
    description:
      "Write a function to count the number of 1 bits in an unsigned integer.",
    input_format: "Single integer",
    output_format: "Print count of 1 bits.",
    constraints: ["0 <= n <= 2^32 - 1"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "11\n",
        output: "3\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "0\n",
        output: "0\n"
      },
      {
        name: "Hidden 2",
        input: "1023\n",
        output: "10\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "n7",
    title: "Linked List Cycle",
    company: "Netflix",
    difficulty: "Easy",
    description:
      "Given head of linked list, determine if it has a cycle.",
    input_format: "n\nn integers\nlast index of cycle or -1",
    output_format: "Print true or false.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3\n3 2 0\n1\n",
        output: "true\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "4\n1 2 3 4\n-1\n",
        output: "false\n"
      },
      {
        name: "Hidden 2",
        input: "1\n1\n0\n",
        output: "true\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "n8",
    title: "132 Pattern",
    company: "Netflix",
    difficulty: "Medium",
    description:
      "Given nums, return true if there exists a 132 pattern: i<j<k with nums[i]<nums[k]<nums[j].",
    input_format: "n\nn integers",
    output_format: "Print true or false.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\n1 2 3 4\n",
        output: "false\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "4\n3 1 4 2\n",
        output: "true\n"
      },
      {
        name: "Hidden 2",
        input: "3\n1 0 -1\n",
        output: "false\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  {
    id: "n9",
    title: "Sliding Window Maximum",
    company: "Netflix",
    difficulty: "Hard",
    description:
      "Given an integer array nums and an integer k, return the maximum value in each sliding window of size k.",
    input_format: "n\nn integers\nk",
    output_format: "Print space separated window maximums.",
    constraints: ["1 <= n <= 10^5", "1 <= k <= n"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "8\n1 3 -1 -3 5 3 6 7\n3\n",
        output: "3 3 5 5 6 7\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1\n1\n1\n",
        output: "1\n"
      },
      {
        name: "Hidden 2",
        input: "5\n9 8 7 6 5\n2\n",
        output: "9 8 7 6\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
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
  {
    id: "u2",
    title: "Car Pooling",
    company: "Uber",
    difficulty: "Medium",
    description:
      "Given trips as (numPassengers, from, to) and capacity, return true if possible to pick up and drop off all passengers.",
    input_format: "n\nn lines: passengers from to\ncapacity",
    output_format: "Print true or false.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "2\n2 1 5\n3 3 7\n4\n",
        output: "false\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2\n2 1 5\n3 3 7\n5\n",
        output: "true\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "u3",
    title: "K Closest Points to Origin",
    company: "Uber",
    difficulty: "Medium",
    description:
      "Given points on a 2D plane, return k closest points to origin.",
    input_format: "n\nn lines: x y\nk",
    output_format: "Print k points.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "2\n1 3\n-2 2\n1\n",
        output: "-2 2\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n3 3\n5 -1\n-2 4\n2\n",
        output: "3 3\n-2 4\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "u4",
    title: "Shortest Path in Binary Matrix",
    company: "Uber",
    difficulty: "Medium",
    description:
      "Given n x n binary grid, return shortest path from (0,0) to (n-1,n-1) moving 8 directions.",
    input_format: "n\nn rows of 0/1",
    output_format: "Print shortest path length or -1.",
    constraints: ["1 <= n <= 500"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "2\n0 1\n1 0\n",
        output: "2\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\n0 0 0\n1 1 0\n1 1 0\n",
        output: "4\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "u5",
    title: "Design Hit Counter",
    company: "Uber",
    difficulty: "Hard",
    description:
      "Design a hit counter which counts number of hits received in past 5 minutes.",
    input_format: "First line q operations\nEach line: type timestamp (1=hit,2=get)",
    output_format: "Print outputs of get operations.",
    constraints: ["1 <= q <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "6\n1 1\n1 2\n1 3\n2 4\n1 300\n2 300\n",
        output: "3 4\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "4\n1 1\n1 300\n2 300\n2 301\n",
        output: "2 1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "u6",
    title: "Word Search II",
    company: "Uber",
    difficulty: "Hard",
    description:
      "Given a board and list of words, return all words present in board.",
    input_format: "m n\nboard rows\nk\nk words",
    output_format: "Print found words.",
    constraints: ["1 <= m,n <= 12"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4 4\no a a n\ne t a e\ni h k r\ni f l v\n4\noath\neat\nrain\npea\n",
        output: "oath eat\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2 2\na b\nc d\n2\nab\nabcd\n",
        output: "ab\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  {
    id: "u7",
    title: "Bus Routes",
    company: "Uber",
    difficulty: "Hard",
    description:
      "Given bus routes where routes[i] is a list of stops for bus i, return minimum buses needed to travel from source to target.",
    input_format: "n\nn lines: stops of each bus\nsource target",
    output_format: "Print minimum buses or -1.",
    constraints: ["1 <= n <= 500"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "2\n1 2 7\n3 6 7\n1 6\n",
        output: "2\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "1\n1 2 3\n1 3\n",
        output: "1\n"
      },
      {
        name: "Hidden 2",
        input: "2\n1 2 3\n4 5 6\n1 6\n",
        output: "-1\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "u8",
    title: "Reconstruct Itinerary",
    company: "Uber",
    difficulty: "Hard",
    description:
      "Given airline tickets represented by pairs of departure and arrival airports, reconstruct itinerary in lexical order starting from JFK.",
    input_format: "n\nn lines: from to",
    output_format: "Print itinerary.",
    constraints: ["1 <= n <= 10^5"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4\nMUC LHR\nJFK MUC\nSFO SJC\nLHR SFO\n",
        output: "JFK MUC LHR SFO SJC\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3\nJFK KUL\nJFK NRT\nNRT JFK\n",
        output: "JFK NRT JFK KUL\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "u9",
    title: "Cheapest Flights Within K Stops",
    company: "Uber",
    difficulty: "Medium",
    description:
      "Given flights as (from, to, price), find cheapest price from src to dst with at most k stops.",
    input_format: "n m\nm lines: from to price\nsrc dst k",
    output_format: "Print cheapest price or -1.",
    constraints: ["1 <= n <= 100"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 1\n",
        output: "200\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 0\n",
        output: "500\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  {
    id: "u10",
    title: "Maximal Rectangle",
    company: "Uber",
    difficulty: "Hard",
    description:
      "Given a binary matrix filled with 0s and 1s, find the largest rectangle containing only 1s.",
    input_format: "m n\nm rows of 0/1",
    output_format: "Print maximum rectangle area.",
    constraints: ["1 <= m,n <= 200"],
    sample_tests: [
      {
        name: "Sample 1",
        input: "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0\n",
        output: "6\n"
      }
    ],
    hidden_tests: [
      {
        name: "Hidden 1",
        input: "2 2\n0 0\n0 0\n",
        output: "0\n"
      },
      {
        name: "Hidden 2",
        input: "1 4\n1 1 1 1\n",
        output: "4\n"
      }
    ],
    allowed_languages: ["cpp", "java", "python", "javascript"]
  },
  
  
];

module.exports = { codingQuestions };
