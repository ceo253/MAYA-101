# Release checklist

MAYA releases should be deterministic, easy to reproduce, and fully verifiable with CLI tooling.

## Preflight

- Sync the default branch (currently `dev`).
- Run `pnpm release:review` and fix any mismatches.
- If you are building sidecar assets, set `SOURCE_DATE_EPOCH` to the tag timestamp for deterministic manifests.

## App release (desktop)

1. Bump versions (app + desktop + Tauri + Cargo):
    - `pnpm bump:patch` or `pnpm bump:minor` or `pnpm bump:major`
2. Re-run `pnpm release:review`.
3. Build sidecars for the desktop bundle:
   - `pnpm --filter @different-ai/maya prepare:sidecar`
4. Commit the version bump.
5. Tag and push:
   - `git tag vX.Y.Z`
   - `git push origin vX.Y.Z`

## maya-orchestrator (npm + sidecars)

1. Bump versions (includes `packages/orchestrator/package.json`):
   - `pnpm bump:patch` or `pnpm bump:minor` or `pnpm bump:major`
2. Build sidecar assets and manifest:
   - `pnpm --filter maya-orchestrator build:sidecars`
3. Create the GitHub release for sidecars:
   - `gh release create maya-orchestrator-vX.Y.Z packages/orchestrator/dist/sidecars/* --repo different-ai/maya`
4. Publish the package:
   - `pnpm --filter maya-orchestrator publish --access public`

## maya-server + opencode-router (if version changed)

- `pnpm --filter maya-server publish --access public`
- `pnpm --filter opencode-router publish --access public`

## Verification

- `maya start --workspace /path/to/workspace --check --check-events`
- `gh run list --repo different-ai/maya --workflow "Release App" --limit 5`
- `gh release view vX.Y.Z --repo different-ai/maya`

Use `pnpm release:review --json` when automating these checks in scripts or agents.

## AUR

`Release App` publishes the Arch AUR package automatically after the Linux `.deb` asset is uploaded.

Required repo config:

- GitHub Actions secret: `AUR_SSH_PRIVATE_KEY` (SSH key with push access to the AUR package repo)
- Optional repo variable: `AUR_REPO` (defaults to `maya`)

## npm publishing

If you want `Release App` to publish `maya-orchestrator`, `maya-server`, and `opencode-router` to npm, configure:

- GitHub Actions secret: `NPM_TOKEN` (npm automation token)

If `NPM_TOKEN` is not set, the npm publish job is skipped.
