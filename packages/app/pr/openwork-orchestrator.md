# PRD: MAYA Orchestrator (Host-First + Fallback Remote)

## Summary
Reframe MAYA as the lifecycle supervisor for OpenCode. Clients connect to an MAYA host, which returns the OpenCode connection details for the active workspace. If the host URL is not an MAYA server, fall back to the existing direct-OpenCode flow so remote workspaces still work.

**Simplest design decision:** the MAYA host exposes **only the active workspace**. No multi-workspace share list. When the host switches workspaces, clients follow it.

## Goals
- Host mode: MAYA starts and supervises OpenCode and exposes a pairing endpoint for clients.
- Client mode: connect to MAYA host URL + token; host provides OpenCode base URL + directory.
- Fallback: if a user enters a URL that is not an MAYA host, connect directly to OpenCode as today.
- UI: the connection flow and workspace surfaces reflect MAYA host vs direct OpenCode.

## Non-goals
- Multiple shared workspaces or “pinned” workspace lists.
- Peer discovery or QR pairing (future).
- New auth systems beyond bearer token.
- New OpenCode APIs.

## User flows
### Host mode
1) User picks a local workspace.
2) MAYA starts OpenCode (`opencode serve`).
3) MAYA starts MAYA server and registers the active workspace.
4) Settings shows pairing URL + client token.

### Client mode (MAYA host)
1) User enters **MAYA Host URL** + token.
2) MAYA client calls host `/health` and `/workspaces`.
3) Host returns active workspace + OpenCode base URL + directory.
4) Client connects to OpenCode using existing SDK flow.
5) Skills/plugins/config actions route to MAYA host (preferred). If unavailable, fall back to OpenCode or show read-only.

### Client mode (fallback to OpenCode)
1) User enters a URL that is not an MAYA host.
2) Client attempts MAYA `/health` and fails with non-MAYA response.
3) Client treats the URL as OpenCode base URL (existing flow).

## API contract (MAYA host)
**Base URL:** `http(s)://<host>:<port>`
**Auth:** `Authorization: Bearer <token>`

### `GET /health`
Returns `{ healthy: true, version: string }`.
If missing or 404, treat as non-MAYA host and fallback to OpenCode.

### `GET /workspaces`
Returns only the active workspace:
```
{
  active: {
    id: "ws-123",
    name: "My Workspace",
    opencode: {
      baseUrl: "http://127.0.0.1:4096",
      directory: "/path/to/workspace"
    }
  }
}
```

### `GET /workspaces/active`
Alias for the active workspace payload (optional).

### `GET /capabilities`
Returns `{ skills: { read, write }, plugins: { read, write }, mcp: { read, write } }`.

## Data model changes
**WorkspaceInfo** (Tauri + UI) must differentiate remote MAYA vs direct OpenCode:
- `remoteType: "maya" | "opencode"`
- `mayaHostUrl?: string`
- `mayaWorkspaceId?: string`
- `opencodeBaseUrl?: string` (existing `baseUrl` becomes this)
- `opencodeDirectory?: string` (existing `directory` becomes this)

**Workspace ID**
- For MAYA remote: stable ID should include `mayaHostUrl + mayaWorkspaceId`.
- For OpenCode remote: keep current `stable_workspace_id_for_remote(baseUrl, directory)`.

## UI rewires (specific components)
### Onboarding client step
File: `packages/app/src/app/pages/onboarding.tsx`
- Replace “Remote base URL” with **MAYA Host URL**.
- Add **Access token** input.
- Add “Advanced: Connect directly to OpenCode” toggle that reveals the current baseUrl + directory inputs.
- Submit button calls `onConnectClient()` which attempts MAYA first, then fallback.

### Create Remote Workspace modal
File: `packages/app/src/app/components/create-remote-workspace-modal.tsx`
- Primary fields: **MAYA Host URL** + **Access token**.
- Advanced toggle: **Direct OpenCode base URL** + directory.
- Store `remoteType` in workspace state based on which input path is used.

### Workspace picker + switch overlay
Files:
- `packages/app/src/app/components/workspace-picker.tsx`
- `packages/app/src/app/components/workspace-switch-overlay.tsx`
Changes:
- Show badge: **MAYA** vs **OpenCode** for remote workspaces.
- Primary line: MAYA host URL (if MAYA remote) else OpenCode baseUrl.
- Secondary line: workspace name from host (MAYA) or directory (OpenCode).

### Settings connection card
File: `packages/app/src/app/pages/settings.tsx`
- Show **MAYA host status** when in client mode: URL, connection state, token status.
- Host mode: show **pairing URL + client token** from MAYA server.
- Keep OpenCode engine status visible for host mode only.

## State + logic rewires (exact mapping)
### Workspace connection flow
File: `packages/app/src/app/context/workspace.ts`
- Split current `connectToServer()` into:
  - `connectToOpenworkHost(hostUrl, token)`
  - `connectToOpencode(baseUrl, directory)` (existing logic)
- Update `createRemoteWorkspaceFlow()` to:
  1) Try MAYA host handshake.
  2) If handshake fails (non-MAYA), fallback to OpenCode base URL path.
- Update `activateWorkspace()` to branch based on `remoteType`.

### Client + header status
File: `packages/app/src/app/app.tsx`
- Track MAYA host connection state alongside OpenCode client state.
- Header status should prefer MAYA host state in client mode (e.g., “Connected · MAYA”).

### Extensions (skills/plugins/mcp)
File: `packages/app/src/app/context/extensions.ts`
- If remoteType is `maya` and host capabilities allow, use MAYA server endpoints for:
  - skills list/install/remove
  - plugin list/add/remove (project scope only)
- If remoteType is `opencode`, keep current OpenCode-only behavior (read-only or host-only).

## Host lifecycle changes
**MAYA host** must manage MAYA server alongside OpenCode:
- Start MAYA server after OpenCode engine starts.
- Update MAYA server when active workspace changes.
- Expose pairing URL + token to UI.

Files (desktop):
- `packages/desktop/src-tauri/src/commands/engine.rs`
- `packages/desktop/src-tauri/src/lib.rs`
- `packages/desktop/src-tauri/src/types.rs`
- `packages/desktop/src-tauri/src/commands/workspace.rs`

## Fallback behavior (explicit)
- If `GET /health` fails (404, network error, non-JSON), treat the input as a direct OpenCode base URL.
- The UI should show a small inline hint: “Connected via OpenCode (not MAYA).”

## Migration
- Existing remote workspaces stored as OpenCode remotes remain valid.
- New MAYA remotes store `remoteType = maya` with host URL + workspace ID.
- No changes to local workspaces.

## Risks
- Confusing connection state (MAYA vs OpenCode). Mitigate with badges + status text.
- Host switching workspace unexpectedly disconnects client. Mitigate with a short toast + auto-reconnect.
- Non-MAYA URLs falsely detected. Mitigate with clear fallback flow.

## Open questions
- Do we need a QR pairing artifact now, or later?
- Should host expose a “Read-only mode” toggle for shared clients?
- Should MAYA server enforce token rotation or persistence?

## Acceptance criteria
- Client can connect to MAYA host and MAYA supplies OpenCode base URL + directory.
- Entering a non-MAYA URL still connects via OpenCode with no regression.
- UI clearly distinguishes MAYA vs OpenCode remote connections.
