import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Timer } from "lucide-react";

// Helper function to generate fake data
const generateRows = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `user_${i + 1}`,
    email: `user${i + 1}@example.com`,
    created_at: new Date(2024, 0, i + 1).toISOString().split("T")[0],
  }));
};

const results = {
  columns: ["id", "username", "email", "created_at"],
  rows: generateRows(1000), // Generate 100 rows - change this number as needed
  metadata: {
    rowCount: 1000, // Update this to match the number of rows
    executionTime: "123ms",
  },
};

export function QueryResults() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-card">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span>{results.metadata.executionTime}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {results.metadata.rowCount} rows
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card">
            <TableRow className="even:bg-muted hover:bg-transparent">
              {results.columns.map((column) => (
                <TableHead
                  key={column}
                  className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.rows.map((row, i) => (
              <TableRow key={i} className="even:bg-muted">
                {results.columns.map((column) => (
                  <TableCell
                    key={column}
                    className="border px-4 py-2 text-left font-mono [&[align=center]]:text-center [&[align=right]]:text-right"
                  >
                    {row[column as keyof typeof row]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
