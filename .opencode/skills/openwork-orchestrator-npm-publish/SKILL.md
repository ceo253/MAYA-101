---
name: maya-orchestrator-npm-publish
description: |
  Publish the maya-orchestrator npm package with clean git hygiene.

  Triggers when user mentions:
  - "maya-orchestrator npm publish"
  - "publish maya-orchestrator"
  - "bump maya-orchestrator"
---

## Quick usage (already configured)

1. Ensure you are on the default branch and the tree is clean.
2. Bump versions via the shared release bump (this keeps `maya-orchestrator` aligned with the app/desktop release).

```bash
pnpm bump:patch
# or: pnpm bump:minor
# or: pnpm bump:major
# or: pnpm bump:set -- X.Y.Z
```

3. Commit the bump.
4. Preferred: publish via the "Release App" GitHub Actions workflow by tagging `vX.Y.Z`.

Manual recovery path (sidecars + npm) below.

```bash
pnpm --filter maya-orchestrator build:sidecars
gh release create maya-orchestrator-vX.Y.Z packages/orchestrator/dist/sidecars/* \
  --repo different-ai/maya \
  --title "maya-orchestrator vX.Y.Z sidecars" \
  --notes "Sidecar binaries and manifest for maya-orchestrator vX.Y.Z"
```

5. Build maya-orchestrator binaries for all supported platforms.

```bash
pnpm --filter maya-orchestrator build:bin:all
```

6. Publish `maya-orchestrator` as a meta package + platform packages (optionalDependencies).

```bash
node packages/orchestrator/scripts/publish-npm.mjs
```

7. Verify the published version.

```bash
npm view maya-orchestrator version
```

---

## Scripted publish

```bash
./.opencode/skills/maya-orchestrator-npm-publish/scripts/publish-maya-orchestrator.sh
```

---

## First-time setup (if not configured)

Authenticate with npm before publishing.

```bash
npm login
```

Alternatively, export an npm token in your environment (see `.env.example`).

---

## Notes

- `maya-orchestrator` is published as:
  - `maya-orchestrator` (wrapper + optionalDependencies)
  - `maya-orchestrator-darwin-arm64`, `maya-orchestrator-darwin-x64`, `maya-orchestrator-linux-arm64`, `maya-orchestrator-linux-x64`, `maya-orchestrator-windows-x64` (platform binaries)
- `maya-orchestrator` is versioned in lockstep with MAYA app/desktop releases.
- maya-orchestrator downloads sidecars from `maya-orchestrator-vX.Y.Z` release assets by default.
