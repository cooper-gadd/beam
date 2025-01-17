import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export const connectionSchema = z.object({
  name: z.string().min(1, "Give your connection a name"),
  host: z.string().min(1, "Where is your database hosted?"),
  port: z.number().min(1, "Which port should we use?"),
  database: z.string().min(1, "Which database do you want to connect to?"),
  username: z.string().min(1, "What's your database username?"),
  password: z.string().min(1, "What's your database password?"),
});

export function NewConnectionDialog() {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof connectionSchema>>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      name: "",
      host: "localhost",
      port: 5432,
      database: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof connectionSchema>) {
    try {
      console.log("Creating connection:", values);
      form.reset();
      form.clearErrors();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create connection:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="gap-2 p-2"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">
            Connect Database
          </div>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to Database</DialogTitle>
          <DialogDescription>
            Enter your database details to establish a new connection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Production DB" {...field} />
                  </FormControl>
                  <FormDescription>
                    A name to help you recognize this connection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host</FormLabel>
                    <FormControl>
                      <Input placeholder="localhost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5432"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : 0,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="database"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database</FormLabel>
                  <FormControl>
                    <Input placeholder="my_database" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="postgres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Connect</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
