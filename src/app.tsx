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
import { Database } from "lucide-react";
import "./index.css";
import { QueryEditor } from "./components/query-editor";
import { QueryResults } from "./components/query-results";

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
                <BreadcrumbPage>users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-[43vh] rounded-xl border bg-card p-4">
            <QueryEditor
              onChange={(value) => console.log("Query changed:", value)}
              onExecute={(value) => console.log("Executing:", value)}
            />
          </div>
          <div className="h-[44vh] rounded-xl border bg-card p-4">
            <QueryResults />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
