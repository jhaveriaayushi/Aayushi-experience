<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Secret Files

- Never open, read, search, attach, or display `.env`, `.env.*`, credentials files, private keys, tokens, or other secret stores.
- If secret-file contents are needed, ask the user to provide a redacted value or placeholder instead.
- Treat this rule as applying even when a secret file appears relevant to debugging.
