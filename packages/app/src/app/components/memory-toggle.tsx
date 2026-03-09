import { createSignal } from "solid-js";
import Button from "./button";
import { Database, Cloud, Zap, HardDrive } from "lucide-solid";

export default function MemoryToggle() {
  const [memoryMode, setMemoryMode] = createSignal<"local" | "cloud">("local");

  const toggleMemory = () => {
    const next = memoryMode() === "local" ? "cloud" : "local";
    setMemoryMode(next);
    console.log(`MAYA Memory Mode Switched: ${next}`);
  };

  return (
    <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center gap-2">
            <Database size={16} class="text-gray-11" />
            <div class="text-sm font-medium text-gray-12">Dual Memory System</div>
          </div>
          <div class="text-xs text-gray-9 mt-1">Select where MAYA stores agent memories.</div>
        </div>
        
        <button 
          onClick={toggleMemory}
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-6 bg-gray-1 text-xs font-medium transition-colors"
        >
          <div class={`w-2 h-2 rounded-full ${memoryMode() === "local" ? "bg-blue-500" : "bg-green-500"}`} />
          {memoryMode() === "local" ? "100% Local" : "Cloud Sync (Supabase)"}
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class={`p-3 rounded-xl border transition-all ${memoryMode() === "local" ? "border-blue-500/50 bg-blue-500/5" : "border-gray-6 opacity-60"}`}>
          <HardDrive size={20} class="mb-2 text-gray-11" />
          <div class="text-xs font-semibold text-gray-12">SQLite / ChromaDB</div>
          <div class="text-[10px] text-gray-9">Fast, private, offline-first.</div>
        </div>
        <div class={`p-3 rounded-xl border transition-all ${memoryMode() === "cloud" ? "border-green-500/50 bg-green-500/5" : "border-gray-6 opacity-60"}`}>
          <Cloud size={20} class="mb-2 text-gray-11" />
          <div class="text-xs font-semibold text-gray-12">Secured Cloud</div>
          <div class="text-[10px] text-gray-9">Sync across devices.</div>
        </div>
      </div>
    </div>
  );
}
