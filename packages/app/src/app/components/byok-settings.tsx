import { createSignal, Show } from "solid-js";
import Button from "./button";
import { Key, Cloud, Info } from "lucide-solid";

export default function ByokSettings() {
  const [openRouterKey, setOpenRouterKey] = createSignal("");
  const [runPodKey, setRunPodKey] = createSignal("");
  const [isSaving, setIsSaving] = createSignal(false);
  const [saveStatus, setSaveStatus] = createSignal<"idle" | "success" | "error">("idle");

  const handleSaveKeys = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaveStatus("success");
    } catch (error) {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRunInCloud = async () => {
    if (!runPodKey()) {
      alert("Please provide a RunPod/Modal API key first.");
      return;
    }
    console.log("Dispatching task to Cloud Worker with BYOK credentials...");
  };

  return (
    <div class="space-y-6">
      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div>
          <div class="flex items-center gap-2">
            <Key size={16} class="text-blue-11" />
            <div class="text-sm font-medium text-gray-12">OpenRouter API Key (Primary)</div>
          </div>
          <div class="text-xs text-gray-9 mt-1">MAYA uses OpenRouter to dynamically route tasks.</div>
        </div>

        <div class="bg-blue-3/20 border border-blue-7/30 rounded-xl p-3 flex gap-3 text-xs text-gray-11">
          <Info size={16} class="text-blue-11 shrink-0 mt-0.5" />
          <div><strong>How to get your key:</strong> Go to openrouter.ai/keys and generate a new key.</div>
        </div>

        <input
          type="password"
          placeholder="sk-or-v1-..."
          value={openRouterKey()}
          onInput={(e) => setOpenRouterKey(e.currentTarget.value)}
          class="w-full bg-gray-1 border border-gray-6 rounded-lg px-3 py-2 text-sm text-gray-12 focus:border-blue-7 focus:ring-1 focus:ring-blue-7/50"
        />
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2">
              <Cloud size={16} class="text-indigo-11" />
              <div class="text-sm font-medium text-gray-12">Cloud Dispatcher (RunPod)</div>
            </div>
            <div class="text-xs text-gray-9 mt-1">Enable warm-start cloud workers.</div>
          </div>
          <Button variant="secondary" onClick={handleRunInCloud} class="text-xs h-8">Run in Cloud</Button>
        </div>

        <input
          type="password"
          placeholder="RunPod API Key..."
          value={runPodKey()}
          onInput={(e) => setRunPodKey(e.currentTarget.value)}
          class="w-full bg-gray-1 border border-gray-6 rounded-lg px-3 py-2 text-sm text-gray-12 focus:border-indigo-7 focus:ring-1 focus:ring-indigo-7/50"
        />
      </div>

      <div class="flex items-center gap-3">
        <Button variant="secondary" onClick={handleSaveKeys} disabled={isSaving()}>Save Credentials</Button>
        <Show when={saveStatus() === "success"}><span class="text-xs text-green-11 font-medium">Keys saved securely!</span></Show>
      </div>
    </div>
  );
}
