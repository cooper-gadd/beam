"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  Cloud,
  PlugZap,
  Plus,
  TestTube,
  Unplug,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const connections = [
  {
    name: "Production DB",
    status: "connected",
    logo: Cloud,
  },
  {
    name: "Development DB",
    status: "disconnected",
    logo: TestTube,
  },
];

export function ConnectionSwitcher() {
  const { isMobile } = useSidebar();
  const [activeConnection, setActiveConnection] = React.useState(
    connections[0],
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                {activeConnection && (
                  <activeConnection.logo className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeConnection?.name}
                </span>
                <span className="truncate text-xs">
                  {activeConnection?.status}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Connections
            </DropdownMenuLabel>
            {connections.map((connection, index: number) => (
              <DropdownMenuItem
                key={connection.name}
                onClick={() => setActiveConnection(connection)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <connection.logo className="size-4 shrink-0" />
                </div>
                {connection.name}
                <DropdownMenuShortcut>
                  {connection.status === "connected" && (
                    <PlugZap className="h-4 w-4 text-green-500" />
                  )}
                  {connection.status === "disconnected" && (
                    <Unplug className="h-4 w-4 text-red-500" />
                  )}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add connection
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
