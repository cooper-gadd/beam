import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

interface QueryEditorProps {
  onChange?: (value: string) => void;
  onExecute?: (value: string) => void;
  defaultValue?: string;
}

// SQL keywords we want to highlight
const keywords = [
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "INSERT",
  "UPDATE",
  "DELETE",
  "DROP",
  "CREATE",
  "TABLE",
  "DATABASE",
  "LIMIT",
  "OFFSET",
  "JOIN",
  "LEFT",
  "RIGHT",
  "INNER",
  "OUTER",
  "GROUP BY",
  "ORDER BY",
  "DESC",
  "ASC",
  "HAVING",
  "AS",
];

function highlightSyntax(code: string) {
  // Create a wrapper div for the highlighted content
  let html = code;

  // Highlight strings (both single and double quotes)
  html = html.replace(/(["'])(.*?)\1/g, '<span class="text-accent">$&</span>');

  // Highlight numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="text-secondary">$1</span>');

  // Highlight keywords
  const keywordPattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  html = html.replace(
    keywordPattern,
    '<span class="text-primary font-bold">$&</span>',
  );

  // Highlight comments
  html = html.replace(
    /--(.*?)$/gm,
    '<span class="text-muted-foreground italic">$&</span>',
  );

  return html;
}

export function QueryEditor({
  onChange,
  onExecute,
  defaultValue = "SELECT * FROM users LIMIT 10;",
}: QueryEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);

    // Update the highlight view
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
