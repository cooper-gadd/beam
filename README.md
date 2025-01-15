# Beam

## Getting Started

### Prerequisites

- [Bun](https://bun.sh)
- [Rust](https://www.rust-lang.org/tools/install)
- [Rust Analyzer](https://rust-analyzer.github.io/manual.html#installation)

### Clone

```bash
git clone https://github.com/cooper-gadd/beam.git
cd beam
```

### Install

```bash
bun install
```

### Run

```bash
bun run tauri dev
```

## TODO

## Phase 1: Basic Application Setup
- [x] Initialize a React + Tauri project.
- [ ] Set up Tauri with Rust and install required dependencies (`sqlx`, `tokio`, `serde`, etc.).
- [ ] Configure the Tauri manifest (`src-tauri/tauri.conf.json`) to include app metadata.
- [ ] Write a function in Rust to handle a PostgreSQL database connection pool.
- [ ] Create a simple `run_query` command for executing SQL queries.
- [ ] Build a basic React UI:
  - [ ] Input fields for database connection details.
  - [ ] A text area for writing SQL queries.
  - [ ] A button to execute queries.
  - [ ] A table to display query results.

## Phase 2: Abstraction for Multiple Databases
- [ ] Use `sqlx`'s feature flags to support multiple databases.
- [ ] Create a database-agnostic abstraction in Rust for PostgreSQL, MySQL, and SQLite.
- [ ] Store the selected database type and connection details for future queries.
- [ ] Add a dropdown in the UI to select the database type.
- [ ] Adjust input fields dynamically based on the database type.

## Phase 3: Core Features
- [ ] Support basic query execution (SELECT, INSERT, UPDATE, DELETE).
- [ ] Handle errors gracefully and display error messages in the UI.
- [ ] Parse and display query results dynamically in a table.
- [ ] Allow users to save and manage multiple database connections.
- [ ] Persist saved connections using Tauri's `fs` module or a local SQLite database.
- [ ] Build a schema explorer:
  - [ ] Display a list of tables in the database.
  - [ ] Show columns, types, and constraints for each table.

## Phase 4: Advanced Features
- [ ] Implement query history with timestamps.
- [ ] Add the ability to save, edit, and rerun queries.
- [ ] Export query results to CSV or JSON.
- [ ] Support database authentication mechanisms (e.g., SSL/TLS).
- [ ] Encrypt sensitive connection details using Tauri's secure storage.
- [ ] Add features specific to MySQL and SQLite.

## Phase 5: Polishing and Extensions
- [ ] Add syntax highlighting for SQL queries.
- [ ] Implement dark mode and platform-specific UI optimizations.
- [ ] Add support for basic data visualizations (e.g., charts or graphs).
- [ ] Test the app on Windows, macOS, and Linux.
- [ ] Build platform-specific installers (e.g., `.exe`, `.dmg`, `.AppImage`).

## Optional Future Features
- [ ] Provide prewritten SQL templates (e.g., "Create Table", "Add Column").
- [ ] Allow users to add custom plugins or extensions.
- [ ] Enable query sharing across teams or save queries to a remote server.
