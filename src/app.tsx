import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database, Download, Timer } from "lucide-react";
import "./index.css";

const results = {
  columns: ["id", "username", "email", "created_at"],
  rows: [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      created_at: "2024-01-01",
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      created_at: "2024-01-02",
    },
  ],
  metadata: {
    rowCount: 2,
    executionTime: "123ms",
  },
};

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden md:inline">Production DB</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">public</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">users</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Query #1</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-[40vh] rounded-xl border bg-card p-4">
            <pre className="text-sm">SELECT * FROM users LIMIT 10;</pre>
          </div>
          <div className="flex-1 rounded-xl border bg-card">
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Timer className="h-4 w-4" />
                <span>{results.metadata.executionTime}</span>
                <span>•</span>
                <span>{results.metadata.rowCount} rows</span>
              </div>
              <button className="inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
            <div className="max-h-[60vh] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {results.columns.map((column) => (
                      <TableHead key={column} className="whitespace-nowrap">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.rows.map((row, i) => (
                    <TableRow key={i}>
                      {results.columns.map((column) => (
                        <TableCell key={column} className="font-mono">
                          {row[column as keyof typeof row]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between border-t p-2">
              <div className="text-sm text-muted-foreground">
                Showing {results.rows.length} of {results.metadata.rowCount}{" "}
                rows
              </div>
              <div className="flex items-center gap-2">
                {/* Add pagination controls */}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
