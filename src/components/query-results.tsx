import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Timer, Search } from "lucide-react";
import { Input } from "./ui/input";

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
  rows: generateRows(1000),
  metadata: {
    rowCount: 1000,
    executionTime: "123ms",
  },
};

export function QueryResults() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rows based on search term
  const filteredRows = results.rows?.length
    ? results.rows.filter((row) =>
        Object.values(row).some((value) =>
          value!.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : [];

  return (
    <div className="flex h-full flex-col rounded-xl bg-card">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="relative flex w-full max-w-md items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search your sql..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Timer className="h-4 w-4" />
            <span>{results.metadata.executionTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>•</span>
            <span>
              {filteredRows.length} of {results.metadata.rowCount} rows
            </span>
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-b-xl">
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow className="even:bg-muted hover:bg-transparent">
                {results.columns.map((column) => (
                  <TableHead
                    key={column}
                    className="border-b px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.map((row, i) => (
                <TableRow key={i} className="even:bg-muted">
                  {results.columns.map((column) => (
                    <TableCell
                      key={column}
                      className="px-4 py-2 text-left font-mono [&[align=center]]:text-center [&[align=right]]:text-right"
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
    </div>
  );
}
