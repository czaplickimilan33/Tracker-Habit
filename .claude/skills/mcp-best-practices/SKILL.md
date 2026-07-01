---
name: mcp-best-practices
description: Working with the Model Context Protocol (MCP) - choosing between tools/resources/prompts, picking a transport, adding sampling/notifications/roots to a server, or debugging an MCP client integration. Use when building an MCP server (e.g. exposing Tracker-Habit data to Claude), wiring up an MCP client, or deciding how to use an already-connected MCP server efficiently inside a Claude Code session.
---

# MCP Best Practices

Condensed from Anthropic Academy's "Introduction to Model Context Protocol" and
"Model Context Protocol: Advanced Topics" courses (anthropic.skilljar.com),
adapted for day-to-day use in Claude Code.

## The three primitives — pick the right one

MCP servers expose capability through three primitive types. Choosing the
wrong one is the most common design mistake.

| Primitive | Who controls it | Use for | Example |
|---|---|---|---|
| **Tool** | Model-controlled — Claude decides when to call it | Actions with side effects, or model-driven lookups | `create_habit_entry`, `search_code`, `send_email` |
| **Resource** | Application-controlled — the client/user attaches it | Read-only data the app decides to include in context | A config file, a habit-log export, a doc |
| **Prompt** | User-controlled — invoked explicitly (e.g. a slash command) | Reusable instruction templates | "review this PR", "summarize this week's habits" |

Rule of thumb: if Claude should decide on its own whether to fetch/act, make
it a **tool**. If a human or the client app decides what to attach, make it a
**resource**. If it's a canned instruction a user triggers by name, make it a
**prompt**.

## Transports

- **STDIO** — local process, spawned by the client. Use for local dev tools
  and anything that only needs to run on the same machine as the client.
- **StreamableHTTP** — remote/hosted servers reachable over HTTP, supports
  multiple concurrent clients. Use for anything you want to deploy once and
  have multiple people/agents connect to (this is what remote MCP servers
  like Notion, Gmail, Zapier etc. use).

Remote (StreamableHTTP) servers generally need **OAuth** — the server issues
tokens the client presents on each request. Local STDIO servers usually skip
auth entirely since the client already trusts the local process.

## Advanced server features

- **Sampling** — a server can ask the *client's* model to generate a
  completion, instead of calling an LLM API itself. This shifts model cost
  and complexity from the server to the client. Reach for this when a server
  needs "a bit of LLM reasoning" but shouldn't own its own API key/billing.
- **Progress & logging notifications** — for long-running tool calls, stream
  progress/log notifications back to the client instead of blocking silently
  until completion. Improves UX for anything that takes more than a couple
  seconds.
- **Roots** — the permission system for filesystem access: the client tells
  the server which directories it's allowed to touch. Always scope a
  filesystem-touching server to the narrowest roots that work.

## Using already-connected MCP servers efficiently (client side)

This matters most in day-to-day Claude Code sessions with many MCP servers
enabled (Notion, Gmail, Google Drive/Calendar, Zapier, GitHub, etc.):

1. **Check what's enabled before assuming a capability is missing.** Tools
   from MCP servers may be deferred — use tool search/listing rather than
   guessing a tool doesn't exist.
2. **Prefer the narrow/specific tool over a broad one** when both exist
   (e.g. a `search_*` tool with filters over paging through a `list_*` tool),
   to avoid burning context on irrelevant results.
3. **Don't re-fetch data a resource already provided** — if a resource was
   attached with the data you need, use it instead of calling a tool to
   re-fetch the same thing.
4. **Respect write-scoped tools** — MCP servers that expose both read and
   write actions (Gmail, Notion, GitHub) usually separate them; confirm
   intent before triggering anything that sends, deletes, or publishes.
5. **Auth failures are usually a server-side OAuth issue**, not a bug in your
   request — re-auth or reconnect the server rather than retrying the same
   call repeatedly.

## If you build an MCP server for this project

Tracker-Habit doesn't expose an MCP server today. If that's ever wanted (e.g.
so any MCP client, not just this repo's Claude Code session, could log or
query habits), a first cut would look like:

- **Tools**: `log_habit_completion(habit_id, date)`, `create_habit(name, cadence)`
  — actions with side effects, model-controlled.
- **Resources**: a read-only `habits://summary/{period}` resource exposing
  recent completion data for the client to attach to context.
- **Transport**: STDIO for local use during development; StreamableHTTP +
  OAuth if it's ever deployed for multiple users/devices.
- Start with the official Python or TypeScript MCP SDK and the MCP Inspector
  for local testing, per the "Introduction to Model Context Protocol" course.
