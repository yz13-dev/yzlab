type LanguageDetector = {
  name: string;
  extensions?: string[];
  priority: number;
  confidence: (code: string) => number; // от 0 до 1
};

const languageRegistry: LanguageDetector[] = [
  {
    name: "typescript",
    extensions: [".ts", ".tsx"],
    priority: 3,
    confidence: (code) => {
      const patterns = [
        /\b(type|interface)\s+\w+/,
        /\bconst\s+\w+\s*:\s*\w+/,
        /\bimport\s+[\w\{\},\s]+\s+from\s+['"][^'"]+['"]/,
        /<\w+[^>]*>\s*\w+/, // TSX
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "javascript",
    extensions: [".js", ".jsx", ".mjs"],
    priority: 2,
    confidence: (code) => {
      const patterns = [
        /\b(const|let|var|function|class|import|export)\b/,
        /=>|\.then\(|\.catch\(|`\$\{/,
        /console\.log/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "python",
    extensions: [".py"],
    priority: 1,
    confidence: (code) => {
      const patterns = [
        /\b(def|class|lambda|import|from|print)\b/,
        /:\s*(#.*)?$/,
        /^\s*(if|for|while|elif|else)\s+.*:\s*$/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "java",
    extensions: [".java"],
    priority: 1,
    confidence: (code) => {
      const patterns = [
        /\b(public|private|protected|class|interface|static|void)\b/,
        /\bString\s+\w+\s*=/,
        /System\.out\.(print|println)/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "c",
    extensions: [".c", ".h"],
    priority: 1,
    confidence: (code) => {
      const patterns = [
        /#include\s+<[\w.]+>/,
        /\b(printf|scanf|malloc|free)\s*\(/,
        /\bint\s+main\s*\(\s*\)/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "cpp",
    extensions: [".cpp", ".cc", ".hpp"],
    priority: 2,
    confidence: (code) => {
      const patterns = [
        /#include\s+<iostream>/,
        /\b(std::|cout|cin|endl)\b/,
        /\busing\s+namespace\s+\w+/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "csharp",
    extensions: [".cs"],
    priority: 2,
    confidence: (code) => {
      const patterns = [
        /\busing\s+System\b/,
        /\bnamespace\s+\w+/,
        /\bpublic\s+class\s+\w+/,
        /Console\.WriteLine/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "ruby",
    extensions: [".rb"],
    priority: 1,
    confidence: (code) => {
      const patterns = [
        /\b(def|class|module|require|puts)\b/,
        /\bdo\s*\|[^|]*\|\s*end/,
        /:\w+\s*=>/, // hash syntax
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "go",
    extensions: [".go"],
    priority: 2,
    confidence: (code) => {
      const patterns = [
        /\bpackage\s+\w+/,
        /\bfunc\s+\w+\s*\(/,
        /\bfmt\.Println\(/,
        /\btype\s+\w+\s+(struct|interface)\s*\{/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "rust",
    extensions: [".rs"],
    priority: 2,
    confidence: (code) => {
      const patterns = [
        /\bfn\s+\w+\s*\(/,
        /\blet\s+mut?\s+\w+\s*=?/,
        /println!\s*\(/,
        /\b(use|impl|trait|enum|pub)\b/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "html",
    extensions: [".html", ".htm"],
    priority: 1,
    confidence: (code) => {
      const patterns = [
        /<!doctype\s+html>/i,
        /<html[\s>]/i,
        /<head>|<body>|<div>|<span>|<p>|<a>/i,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "sql",
    extensions: [".sql"],
    priority: 1,
    confidence: (code) => {
      const patterns = [
        /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/i,
        /\bFROM\b/i,
        /\bWHERE\b/i,
      ];
      return scoreByMatches(code, patterns);
    },
  },
  {
    name: "shell",
    extensions: [".sh"],
    priority: 1,
    confidence: (code) => {
      const patterns = [
        /^#!\/bin\/(bash|sh)/,
        /\becho\b/,
        /\b(if|then|else|fi|for|do|done)\b/,
      ];
      return scoreByMatches(code, patterns);
    },
  },
];

function scoreByMatches(code: string, patterns: RegExp[]): number {
  if (!code.trim()) return 0;
  const matchCount = patterns.filter((rx) => rx.test(code)).length;
  return matchCount / patterns.length;
}

function normalizeCode(code: string): string {
  return code
    .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "") // JS/C-like comments
    .replace(/\s+/g, " ")
    .trim();
}

export function detectLang(code: string, filename?: string): string {
  const normalizedCode = normalizeCode(code);
  const ext = filename?.split(".").pop()?.toLowerCase();

  let bestLang = "plaintext";
  let bestScore = 0;
  let bestPriority = 0;

  for (const lang of languageRegistry) {
    const score = lang.confidence(normalizedCode);
    const isMatchExt = ext && lang.extensions?.includes(`.${ext}`);
    const priorityBoost = isMatchExt ? 0.2 : 0;

    const totalScore = score + priorityBoost;

    if (
      totalScore > bestScore ||
      (totalScore === bestScore && lang.priority > bestPriority)
    ) {
      bestLang = lang.name;
      bestScore = totalScore;
      bestPriority = lang.priority;
    }
  }

  return bestLang;
}
