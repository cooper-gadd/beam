import * as React from "react";
import {
  ChevronRight,
  Database,
  Table,
  Columns,
  PlugZap,
  Unplug,
  Cloud,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  connections: [
    {
      name: "Production DB",
      status: "connected",
    },
    {
      name: "Development DB",
      status: "disconnected",
    },
  ],
  databases: [
    {
      name: "ecommerce_db",
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
      name: "analytics_db",
      tables: [
        {
          name: "events",
          columns: ["id", "event_type", "timestamp"],
        },
        {
          name: "metrics",
          columns: ["id", "name", "value", "date"],
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
          <SidebarGroupLabel>Connections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.connections.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <Cloud />
                    {item.name}
                  </SidebarMenuButton>
                  <SidebarMenuBadge>
                    {item.status === "connected" && (
                      <PlugZap className="h-4 w-4 text-green-500" />
                    )}
                    {item.status === "disconnected" && (
                      <Unplug className="h-4 w-4 text-red-500" />
                    )}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Databases</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.databases.map((database, index) => (
                <DatabaseTree key={index} database={database} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

interface Database {
  name: string;
  tables: Table[];
}

interface Table {
  name: string;
  columns: string[];
}

function DatabaseTree({ database }: { database: Database }) {
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={true}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Database className="h-4 w-4" />
            {database.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {database.tables.map((table, index) => (
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
