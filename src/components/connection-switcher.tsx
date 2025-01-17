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
import {
  ChevronsUpDown,
  Cloud,
  DatabaseZap,
  PlugZap,
  TestTube,
  Unplug,
} from "lucide-react";
import * as React from "react";
import { NewConnectionDialog } from "./new-connection";

const connections = [
  // Can be empty array when no connections exist
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
    connections.length > 0 ? connections[0] : null,
  );

  const hasConnections = connections.length > 0;

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
                {activeConnection ? (
                  <activeConnection.logo className="size-4" />
                ) : (
                  <DatabaseZap className="size-4 text-muted-foreground" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeConnection ? activeConnection.name : "No Connection"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeConnection
                    ? activeConnection.status.charAt(0).toUpperCase() +
                      activeConnection.status.slice(1)
                    : "Click to connect"}
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
              {hasConnections ? "Connections" : "No Connections"}
            </DropdownMenuLabel>

            {hasConnections ? (
              <>
                {connections.map((connection) => (
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
              </>
            ) : (
              <DropdownMenuItem
                className="text-sm text-muted-foreground"
                disabled
              >
                No connections available
              </DropdownMenuItem>
            )}

            <NewConnectionDialog />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
