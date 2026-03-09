import { execSync } from "node:child_process";

const isVercel = Boolean(process.env.VERCEL);
const command = isVercel
  ? "pnpm --dir services/maya-share run build"
  : "pnpm --filter @different-ai/maya build";

execSync(command, { stdio: "inherit" });
