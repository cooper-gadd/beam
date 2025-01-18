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
  let result = text;
  const patterns = [
    // Strings (single and double quotes)
    {
      pattern: /(["'])(.*?)\1/g,
      className: "text-chart-1",
    },
    // Numbers
    {
      pattern: /\b(\d+(\.\d+)?)\b/g,
      className: "text-chart-2",
    },
    // Comments
    {
      pattern: /--(.*?)$/gm,
      className: "text-muted-foreground italic",
    },
    // Query Keywords
    {
      pattern: new RegExp(
        `\\b(${sqlKeywords.queryKeywords.join("|")})\\b`,
        "gi",
      ),
      className: "text-chart-1 font-bold",
    },
    // Modification Keywords
    {
      pattern: new RegExp(
        `\\b(${sqlKeywords.modificationKeywords.join("|")})\\b`,
        "gi",
      ),
      className: "text-chart-2 font-bold",
    },
    // Definition Keywords
    {
      pattern: new RegExp(
        `\\b(${sqlKeywords.definitionKeywords.join("|")})\\b`,
        "gi",
      ),
      className: "text-chart-3 font-bold",
    },
    // Operators and Functions
    {
      pattern: new RegExp(
        `\\b(${sqlKeywords.operatorsAndFunctions.join("|")})\\b`,
        "gi",
      ),
      className: "text-chart-4 font-bold",
    },
    // Transaction Keywords
    {
      pattern: new RegExp(
        `\\b(${sqlKeywords.transactionKeywords.join("|")})\\b`,
        "gi",
      ),
      className: "text-chart-5 font-bold",
    },
  ];

  // Apply all patterns in order
  patterns.forEach(({ pattern, className }) => {
    result = result.replace(pattern, `<span class="${className}">$&</span>`);
  });

  return result;
}

export function QueryEditor({
  onChange,
  onExecute,
  defaultValue = "SELECT * FROM users LIMIT 10;",
}: QueryEditorProps) {
  const [value, setValue] = useState(defaultValue);
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
        <span className="text-sm text-muted-foreground">Query Editor</span>
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
          className="absolute h-full w-full overflow-hidden whitespace-pre-wrap break-words p-4 font-mono text-sm"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(value) }}
        />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          className="absolute h-full w-full resize-none bg-transparent p-4 font-mono text-sm text-transparent caret-foreground focus:outline-none"
          spellCheck={false}
          placeholder="Write your SQL query here..."
        />
      </div>
    </div>
  );
}
