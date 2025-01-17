import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRight, Columns, Database, Table } from "lucide-react";
import * as React from "react";
import { ConnectionSwitcher } from "./connection-switcher";

const data = {
  schemas: [
    {
      name: "public",
      tables: [
        {
          name: "users",
          columns: ["id", "username", "email", "created_at"],
        },
        {
          name: "products",
          columns: ["id", "name", "price", "stock"],
        },
        {
          name: "orders",
          columns: ["id", "user_id", "total", "status"],
        },
      ],
    },
    {
      name: "sys",
      tables: [
        {
          name: "pg_stat_activity",
          columns: ["pid", "usename", "query", "state"],
        },
        {
          name: "pg_tables",
          columns: ["schemaname", "tablename", "tableowner"],
        },
      ],
    },
    {
      name: "auth",
      tables: [
        {
          name: "users",
          columns: ["id", "role", "permissions"],
        },
        {
          name: "sessions",
          columns: ["id", "user_id", "expires_at"],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Schemas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.schemas.map((schema, index) => (
                <SchemaTree key={index} schema={schema} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ConnectionSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

interface Schema {
  name: string;
  tables: Table[];
}

interface Table {
  name: string;
  columns: string[];
}

function SchemaTree({ schema }: { schema: Schema }) {
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={schema.name === "public"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Database className="h-4 w-4" />
            {schema.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {schema.tables.map((table, index) => (
              <TableTree key={index} table={table} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function TableTree({ table }: { table: Table }) {
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Table className="h-4 w-4" />
            {table.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {table.columns.map((column, index) => (
              <SidebarMenuButton key={index}>
                <Columns className="h-4 w-4" />
                {column}
              </SidebarMenuButton>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
