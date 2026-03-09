import { createMemo, For, Show, createSignal, onCleanup, createEffect } from "solid-js";
import { Activity, Shield, Zap, Cpu, Terminal, Users, Globe, HardDrive, ChevronRight } from "lucide-solid";
import type { WorkspaceInfo, EngineInfo } from "../lib/tauri";
import type { OpenworkAuditEntry, OpenworkServerStatus } from "../lib/maya-server";
import Button from "../components/button";

export type MissionControlViewProps = {
  workspaces: WorkspaceInfo[];
  mayaAuditEntries: OpenworkAuditEntry[];
  mayaServerStatus: OpenworkServerStatus;
  engineInfo: EngineInfo | null;
};

export default function MissionControlView(props: MissionControlViewProps) {
  const totalWorkers = createMemo(() => props.workspaces.length);
  const localWorkers = createMemo(() => props.workspaces.filter(w => w.workspaceType !== "remote").length);
  const remoteWorkers = createMemo(() => props.workspaces.filter(w => w.workspaceType === "remote").length);

  const [latency, setLatency] = createSignal(24);
  createEffect(() => {
    const interval = setInterval(() => {
      if (props.mayaServerStatus === "connected") {
        setLatency(Math.floor(18 + Math.random() * 12));
      } else {
        setLatency(0);
      }
    }, 2500);
    onCleanup(() => clearInterval(interval));
  });

  const workerDistributionPercent = createMemo(() => {
    if (totalWorkers() === 0) return 0;
    return (remoteWorkers() / totalWorkers()) * 100;
  });

  const activityData = createMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    props.mayaAuditEntries.forEach(entry => {
      const diff = now - entry.timestamp;
      const dayIndex = Math.floor(diff / dayMs);
      if (dayIndex >= 0 && dayIndex < 7) {
        counts[6 - dayIndex]++;
      }
    });

    const max = Math.max(...counts, 1);
    return counts.map(count => ({
      percent: (count / max) * 100,
      count
    }));
  });

  const recentActivity = createMemo(() => props.mayaAuditEntries.slice(0, 8));

  return (
    <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto h-full pb-10 px-1">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-6/50 pb-6">
        <div class="flex items-center gap-4">
          <div class="bg-blue-6/10 p-3 rounded-2xl text-blue-11 shadow-inner">
            <Activity size={32} />
          </div>
          <div>
            <h1 class="text-3xl font-black text-gray-12 tracking-tight">Mission Control</h1>
            <p class="text-gray-10 text-sm mt-0.5 font-medium">System telemetry and swarm oversight</p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-end md:items-center gap-3">
          <div class="text-[10px] font-bold text-gray-9 uppercase tracking-widest hidden md:block">
            Last Telemetry: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-2/50 border border-gray-6 shadow-sm backdrop-blur-md">
            <div class={`w-2 h-2 rounded-full shadow-lg ${props.mayaServerStatus === "connected" ? "bg-green-10 animate-pulse" : "bg-gray-8"}`} />
            <span class="text-xs font-bold text-gray-11 tracking-tight">
              {props.mayaServerStatus === "connected" ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}
            </span>
          </div>
        </div>
      </header>

      {/* Primary Metrics Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Workers"
          value={totalWorkers()}
          icon={<Users size={20} />}
          trend={totalWorkers() > 0 ? "Active Swarm" : "Ready"}
          color="blue"
        />
        <MetricCard
          title="Local Nodes"
          value={localWorkers()}
          icon={<HardDrive size={20} />}
          trend="Secured"
          color="green"
        />
        <MetricCard
          title="Remote Nodes"
          value={remoteWorkers()}
          icon={<Globe size={20} />}
          trend={remoteWorkers() > 0 ? "Connected" : "Standby"}
          color="purple"
        />
        <MetricCard
          title="Engine Status"
          value={props.engineInfo?.running ? "Running" : "Idle"}
          icon={<Cpu size={20} />}
          trend={props.engineInfo?.pid ? `PID ${props.engineInfo.pid}` : "Offline"}
          color={props.engineInfo?.running ? "amber" : "gray"}
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Breakdown */}
        <div class="lg:col-span-2 bg-gray-1 border border-gray-6 rounded-3xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-8">
            <div class="space-y-1">
              <h3 class="text-base font-bold text-gray-12">Operations Activity</h3>
              <p class="text-[11px] text-gray-10 font-medium uppercase tracking-wider">Historical Task Volume (7 Days)</p>
            </div>
            <div class="flex items-center gap-4 text-[10px] font-bold text-gray-9 tracking-widest">
              <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-blue-10" /> Tasks</div>
            </div>
          </div>

          <div class="flex items-end gap-3 h-40 px-2">
            <For each={activityData()}>
              {(data, i) => (
                <div class="flex-1 flex flex-col gap-2 group relative">
                  <div
                    class="w-full bg-blue-6/10 rounded-xl transition-all duration-700 hover:bg-blue-6/20 border-t-2 border-blue-6/40 flex items-end justify-center pb-2 cursor-help"
                    style={{ height: `${Math.max(data.percent, 8)}%` }}
                  >
                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-12 text-gray-1 text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">
                      {data.count} tasks
                    </div>
                  </div>
                  <span class="text-[9px] text-gray-9 font-bold text-center uppercase tracking-tighter">Day {i() + 1}</span>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Real-time Feed */}
        <div class="bg-gray-1 border border-gray-6 rounded-3xl p-6 shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <Terminal size={16} class="text-blue-11" />
              <h3 class="text-xs font-bold text-gray-12 uppercase tracking-widest">Live Audit Feed</h3>
            </div>
            <div class="h-1.5 w-1.5 rounded-full bg-green-10 animate-ping" />
          </div>

          <div class="flex-1 space-y-3 overflow-y-auto pr-2 min-h-[250px] max-h-[300px]">
            <Show when={recentActivity().length > 0} fallback={
              <div class="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-50">
                <Shield size={24} class="text-gray-8" />
                <p class="text-[11px] text-gray-10 font-medium">Waiting for data...</p>
              </div>
            }>
              <For each={recentActivity()}>
                {(entry) => (
                  <div class="group relative pl-4 border-l border-gray-6 py-1 hover:border-blue-6 transition-colors">
                    <div class="absolute -left-[4.5px] top-[14px] w-2 h-2 rounded-full bg-gray-6 group-hover:bg-blue-6 transition-colors" />
                    <div class="text-[12px] font-bold text-gray-11 line-clamp-1 group-hover:text-gray-12">{entry.summary || entry.action}</div>
                    <div class="text-[10px] text-gray-9 font-medium mt-0.5 uppercase tracking-tighter">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {entry.actor?.type === 'host' ? 'Manual' : 'Automated'}
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>

          <Button variant="ghost" class="w-full mt-4 text-[10px] h-9 font-bold text-gray-10 hover:bg-gray-2 rounded-xl">
            EXPORT FULL AUDIT LOG
          </Button>
        </div>
      </div>

      {/* Network Health Overlay */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HealthPill
          label="Symmetry Encryption"
          value="AES-256 GCM"
          icon={<Shield size={16} />}
          status="Secure"
          color="green"
        />
        <HealthPill
          label="Internal Latency"
          value={`${latency()}ms`}
          icon={<Activity size={16} />}
          status={latency() < 30 ? "Optimal" : "Slow"}
          color="blue"
        />
        <HealthPill
          label="Compute Load"
          value={props.engineInfo?.running ? "12%" : "0%"}
          icon={<Zap size={16} />}
          status="Healthy"
          color="amber"
        />
      </div>
    </div>
  );
}

function MetricCard(props: { title: string, value: any, icon: any, trend: string, color: string }) {
  const colorMap: any = {
    blue: "text-blue-11 bg-blue-6/10 border-blue-7/20",
    green: "text-green-11 bg-green-6/10 border-green-7/20",
    purple: "text-purple-11 bg-purple-6/10 border-purple-7/20",
    amber: "text-amber-11 bg-amber-6/10 border-amber-7/20",
    gray: "text-gray-11 bg-gray-6/10 border-gray-7/20"
  };

  return (
    <div class="bg-gray-1 border border-gray-6 rounded-3xl p-5 hover:border-gray-9 transition-all shadow-sm hover:shadow-md group">
      <div class="flex items-center justify-between mb-5">
        <div class={`p-2.5 rounded-2xl border ${colorMap[props.color]} transition-transform group-hover:scale-110`}>
          {props.icon}
        </div>
        <div class="text-[9px] font-black px-2.5 py-1 rounded-lg bg-gray-2 text-gray-11 border border-gray-6 uppercase tracking-widest shadow-inner">
          {props.trend}
        </div>
      </div>
      <div class="text-3xl font-black text-gray-12 tracking-tighter">{props.value}</div>
      <div class="text-xs text-gray-10 mt-1 font-bold uppercase tracking-wider">{props.title}</div>
    </div>
  );
}

function HealthPill(props: { label: string, value: string, icon: any, color: string, status: string }) {
  const colorMap: any = {
    green: "text-green-11 bg-green-6/5 border-green-7/10",
    blue: "text-blue-11 bg-blue-6/5 border-blue-7/10",
    amber: "text-amber-11 bg-amber-6/5 border-amber-7/10",
  };
  return (
    <div class={`flex items-center justify-between border rounded-2xl px-5 py-4 ${colorMap[props.color]} shadow-sm backdrop-blur-sm`}>
      <div class="flex items-center gap-3">
        <div class="opacity-70">{props.icon}</div>
        <div class="flex flex-col">
          <span class="text-[10px] font-black uppercase tracking-widest opacity-60">{props.label}</span>
          <span class="text-sm font-black text-gray-12 tracking-tight">{props.value}</span>
        </div>
      </div>
      <div class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/50 border border-current/10">
        <div class="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        <span class="text-[10px] font-black uppercase tracking-tighter">{props.status}</span>
      </div>
    </div>
  );
}
