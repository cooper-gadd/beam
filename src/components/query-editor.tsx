import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

interface QueryEditorProps {
  onChange?: (value: string) => void;
  onExecute?: (value: string) => void;
  defaultValue?: string;
}

// SQL keywords grouped by category
const sqlKeywords = {
  // Data Query Keywords (SELECT, FROM, WHERE, etc.)
  queryKeywords: [
    "SELECT",
    "FROM",
    "WHERE",
    "HAVING",
    "GROUP BY",
    "ORDER BY",
    "LIMIT",
    "OFFSET",
    "JOIN",
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "FULL JOIN",
    "CROSS JOIN",
    "ON",
    "AS",
    "WITH",
    "UNION",
    "ALL",
    "DISTINCT",
    "CASE",
    "WHEN",
    "THEN",
    "ELSE",
    "END",
    "BETWEEN",
    "IN",
    "EXISTS",
    "ANY",
    "SOME",
    "ALL",
  ],

  // Data Manipulation Keywords (INSERT, UPDATE, DELETE, etc.)
  modificationKeywords: [
    "INSERT",
    "UPDATE",
    "DELETE",
    "INTO",
    "VALUES",
    "SET",
    "MERGE",
    "RETURNING",
    "DEFAULT",
  ],

  // Data Definition Keywords (CREATE, ALTER, DROP, etc.)
  definitionKeywords: [
    "CREATE",
    "ALTER",
    "DROP",
    "TABLE",
    "VIEW",
    "INDEX",
    "SEQUENCE",
    "TRIGGER",
    "PROCEDURE",
    "FUNCTION",
    "DATABASE",
    "SCHEMA",
    "COLUMN",
    "CONSTRAINT",
    "PRIMARY KEY",
    "FOREIGN KEY",
    "REFERENCES",
    "UNIQUE",
    "CHECK",
    "NOT NULL",
  ],

  // Logical Operators and Functions
  operatorsAndFunctions: [
    "AND",
    "OR",
    "NOT",
    "IS",
    "NULL",
    "LIKE",
    "ILIKE",
    "SIMILAR TO",
    "COUNT",
    "SUM",
    "AVG",
    "MIN",
    "MAX",
    "COALESCE",
    "NULLIF",
    "EXTRACT",
    "NOW",
    "CAST",
    "TO",
  ],

  // Transaction Control
  transactionKeywords: [
    "BEGIN",
    "COMMIT",
    "ROLLBACK",
    "TRANSACTION",
    "SAVEPOINT",
    "SET TRANSACTION",
    "ISOLATION LEVEL",
  ],
};

function highlightSyntax(text: string) {
  // Split text into lines
  const lines = text.split("\n");

  // Prepare compound keywords (those containing spaces)
  const compoundKeywords = [
    ...sqlKeywords.queryKeywords,
    ...sqlKeywords.modificationKeywords,
    ...sqlKeywords.definitionKeywords,
    ...sqlKeywords.operatorsAndFunctions,
    ...sqlKeywords.transactionKeywords,
  ].filter((keyword) => keyword.includes(" "));

  // Process each line
  const processedLines = lines.map((line) => {
    // Check if line is a comment
    if (line.trim().startsWith("--")) {
      return `<span class="text-muted-foreground italic">${line}</span>`;
    }

    // Process strings, keeping track of quote positions
    const stringPositions: { start: number; end: number }[] = [];
    const stringRegex = /(["'])(.*?)\1/g;
    let stringMatch;
    while ((stringMatch = stringRegex.exec(line)) !== null) {
      stringPositions.push({
        start: stringMatch.index,
        end: stringMatch.index + stringMatch[0].length,
      });
    }

    // Function to check if position is within a string
    const isInString = (position: number) => {
      return stringPositions.some(
        ({ start, end }) => position >= start && position < end,
      );
    };

    // First, handle strings
    let processedLine = line;
    stringPositions.forEach(({ start, end }) => {
      const str = line.substring(start, end);
      processedLine =
        processedLine.slice(0, start) +
        `<span class="text-chart-1">${str}</span>` +
        processedLine.slice(end);
    });

    // Handle compound keywords first
    compoundKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      processedLine = processedLine.replace(regex, (match) => {
        if (!isInString(processedLine.indexOf(match))) {
          if (sqlKeywords.queryKeywords.includes(keyword.toUpperCase())) {
            return `<span class="text-chart-1 font-bold">${match}</span>`;
          }
          if (
            sqlKeywords.modificationKeywords.includes(keyword.toUpperCase())
          ) {
            return `<span class="text-chart-2 font-bold">${match}</span>`;
          }
          if (sqlKeywords.definitionKeywords.includes(keyword.toUpperCase())) {
            return `<span class="text-chart-3 font-bold">${match}</span>`;
          }
          if (
            sqlKeywords.operatorsAndFunctions.includes(keyword.toUpperCase())
          ) {
            return `<span class="text-chart-4 font-bold">${match}</span>`;
          }
          if (sqlKeywords.transactionKeywords.includes(keyword.toUpperCase())) {
            return `<span class="text-chart-5 font-bold">${match}</span>`;
          }
        }
        return match;
      });
    });

    // Split line into words while preserving spaces
    const words = processedLine.split(/(\s+)/);

    // Process each word
    const processedWords = words.map((word) => {
      // Skip empty strings and whitespace
      if (!word.trim()) return word;

      // Skip if word is within a string
      if (isInString(line.indexOf(word))) return word;

      // Check for numbers
      if (/^\d+(\.\d+)?$/.test(word)) {
        return `<span class="text-chart-2">${word}</span>`;
      }

      // Check against SQL keywords
      const upperWord = word.toUpperCase();

      if (sqlKeywords.queryKeywords.includes(upperWord)) {
        return `<span class="text-chart-1 font-bold">${word}</span>`;
      }
      if (sqlKeywords.modificationKeywords.includes(upperWord)) {
        return `<span class="text-chart-2 font-bold">${word}</span>`;
      }
      if (sqlKeywords.definitionKeywords.includes(upperWord)) {
        return `<span class="text-chart-3 font-bold">${word}</span>`;
      }
      if (sqlKeywords.operatorsAndFunctions.includes(upperWord)) {
        return `<span class="text-chart-4 font-bold">${word}</span>`;
      }
      if (sqlKeywords.transactionKeywords.includes(upperWord)) {
        return `<span class="text-chart-5 font-bold">${word}</span>`;
      }

      return word;
    });

    return processedWords.join("");
  });

  // Add line numbers and wrap each line in a div
  const numberedLines = processedLines.map((line, index) => {
    return `<div class="editor-line">
      <span class="line-number text-muted-foreground select-none" data-line="${
        index + 1
      }">${index + 1}</span>
      <span class="line-content">${line}</span>
    </div>`;
  });

  return numberedLines.join("");
}

export function QueryEditor({ onChange, onExecute }: QueryEditorProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);

    if (highlightRef.current) {
      highlightRef.current.innerHTML = highlightSyntax(newValue);
    }
  };

  // Sync scroll between textarea and highlight
  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    if (!textarea || !highlight) return;

    const handleScroll = () => {
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    };

    textarea.addEventListener("scroll", handleScroll);
    return () => textarea.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <span className="text-sm text-muted-foreground">SQL</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onExecute?.(value)}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative flex-1">
        <pre
          ref={highlightRef}
          className="absolute h-full w-full overflow-hidden whitespace-pre-wrap break-words p-4 font-mono text-sm [&_.editor-line]:flex [&_.editor-line]:gap-4 [&_.line-content]:flex-1 [&_.line-number]:mr-2 [&_.line-number]:w-5 [&_.line-number]:text-right"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(value) }}
        />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          className="absolute h-full w-full resize-none bg-transparent p-4 pl-[3.8rem] font-mono text-sm text-transparent caret-foreground focus:outline-none"
          spellCheck={false}
          placeholder="Your SQL goes here..."
        />
      </div>
    </div>
  );
}
