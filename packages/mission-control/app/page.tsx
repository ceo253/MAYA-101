import React from 'react';

export default function MissionControl() {
  const activeAgents = [
    { name: "OWL Master", status: "Orchestrating", load: "12%" },
    { name: "Researcher-1", status: "Web Search", load: "85%" },
    { name: "Coder-Alpha", status: "Idle", load: "0%" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter">MAYA MISSION CONTROL</h1>
        <div className="flex gap-4">
          <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
            <span className="text-gray-500 text-xs uppercase">BYOK Spend</span>
            <div className="text-xl font-mono">$12.42</div>
          </div>
          <div className="bg-green-900/20 px-4 py-2 rounded-lg border border-green-800/50">
            <span className="text-green-500 text-xs uppercase">Engine Status</span>
            <div className="text-xl font-mono text-green-400">ONLINE</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Agents Column */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase">Active Swarm Agents</h2>
          <div className="space-y-4">
            {activeAgents.map(agent => (
              <div key={agent.name} className="flex justify-between items-center p-3 bg-black/50 rounded-xl border border-gray-800">
                <div>
                  <div className="text-sm font-medium">{agent.name}</div>
                  <div className="text-[10px] text-blue-400">{agent.status}</div>
                </div>
                <div className="text-xs font-mono text-gray-500">{agent.load}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Dispatcher Stats */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase">Cloud Dispatcher</h2>
          <div className="space-y-4">
            <div className="p-3 bg-black/50 rounded-xl border border-gray-800">
              <div className="text-xs text-gray-500">Warm-Start Workers</div>
              <div className="text-2xl font-mono">2 / 5</div>
            </div>
            <div className="p-3 bg-black/50 rounded-xl border border-gray-800">
              <div className="text-xs text-gray-500">Avg. Latency</div>
              <div className="text-2xl font-mono">842ms</div>
            </div>
          </div>
        </div>

        {/* Memory Sync */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase">Dual Memory Sync</h2>
          <div className="flex flex-col items-center justify-center h-full pb-8">
            <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 flex items-center justify-center relative">
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-bold">SYNCING</span>
            </div>
            <div className="mt-4 text-[10px] text-gray-500 uppercase">Last Sync: 2s ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
