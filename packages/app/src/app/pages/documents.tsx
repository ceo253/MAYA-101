import { createSignal, Show } from "solid-js";
import {
  Book, Zap, Cpu, Shield, Code, HelpCircle,
  ChevronDown, MessageSquare, Play, Info,
  Lock, Settings, Terminal, Globe
} from "lucide-solid";

export default function DocumentsView() {
  return (
    <div class="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto h-full pb-20 px-6">
      <header class="text-center space-y-3 pt-6">
        <div class="inline-flex items-center justify-center p-3 bg-blue-6/10 rounded-2xl text-blue-11 mb-2 shadow-sm">
          <Book size={40} />
        </div>
        <h1 class="text-3xl font-black text-gray-12 tracking-tighter">Help & Learning</h1>
        <p class="text-gray-10 text-base max-w-xl mx-auto font-medium leading-relaxed">
          The simple guide to mastering MAYA. No technical jargon, just clear steps.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <Accordion
          title="Getting Started with MAYA"
          icon={<Play size={18} />}
          color="bg-green-6/10 text-green-11"
          defaultOpen={true}
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <p>Welcome to MAYA! Think of MAYA as your digital operations center. Here is how to get started:</p>
            <ul class="list-disc pl-5 space-y-1.5">
              <li><strong>Create a Worker:</strong> Click the "Add a worker" button. This is like creating a new workspace for a project.</li>
              <li><strong>Type a Command:</strong> In any session, just type what you want to achieve. MAYA will figure out the best way to do it.</li>
              <li><strong>Review the Audit:</strong> Every action MAYA takes is recorded. Check Mission Control to see exactly what happened.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion
          title="Building & Automating Stuff"
          icon={<Terminal size={18} />}
          color="bg-blue-6/10 text-blue-11"
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <p>You can use MAYA to build apps, scripts, or automate boring tasks:</p>
            <ul class="list-disc pl-5 space-y-1.5">
              <li><strong>Code Generation:</strong> Ask MAYA to "Build a React landing page" and it will write the code and save files in your worker.</li>
              <li><strong>Workflow Automation:</strong> Tell it to "Watch this folder and summarize every new PDF" to create a hands-off system.</li>
              <li><strong>Content Pipeline:</strong> Use it to write, format, and push blog posts directly to your website.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion
          title="Understanding Workers & Skills"
          icon={<Info size={18} />}
          color="bg-cyan-6/10 text-cyan-11"
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <div class="space-y-3">
              <div class="p-3 bg-gray-2/50 border border-gray-6 rounded-xl">
                <h4 class="font-bold text-gray-12 mb-1">Workers</h4>
                <p>Isolated safe spaces where MAYA works. You can have separate ones for Marketing or Finance to keep files organized.</p>
              </div>
              <div class="p-3 bg-gray-2/50 border border-gray-6 rounded-xl">
                <h4 class="font-bold text-gray-12 mb-1">Skills</h4>
                <p>Tools like "Web Search" that allow MAYA to find info. You can enable specific skills for each different worker.</p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Remote Swarms & Cloud Workers"
          icon={<Globe size={18} />}
          color="bg-purple-6/10 text-purple-11"
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <p>Cloud Workers allow you to run heavy tasks without slowing down your own computer:</p>
            <ul class="list-disc pl-5 space-y-1.5">
              <li><strong>Scalability:</strong> Spin up powerful remote instances to process massive datasets or long simulations.</li>
              <li><strong>24/7 Availability:</strong> Cloud workers can keep running even when you turn your computer off.</li>
              <li><strong>Distributed Work:</strong> Your local worker can "delegate" tasks to a swarm of cloud workers to finish faster.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion
          title="Technical: MCPs & External Tools"
          icon={<Code size={18} />}
          color="bg-amber-6/10 text-amber-11"
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <p>MCP (Model Context Protocol) is the "plug" that connects MAYA to the internet and other software:</p>
            <ul class="list-disc pl-5 space-y-1.5">
              <li><strong>Live Data:</strong> Connect to Slack, Discord, or Notion to let MAYA read messages and send replies.</li>
              <li><strong>Local Tools:</strong> Use MCP to give MAYA access to your terminal, specialized databases, or even your internal company tools.</li>
              <li><strong>Standards-Based:</strong> MCP follows an open standard, meaning any developer can build a new tool for MAYA easily.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion
          title="What MAYA Can Do (Capabilities)"
          icon={<Zap size={18} />}
          color="bg-pink-6/10 text-pink-11"
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <p>MAYA is designed for "General Purpose Operations":</p>
            <ul class="list-disc pl-5 space-y-1.5">
              <li><strong>File & OS Management:</strong> Read, write, move, and organize files on your disk safely.</li>
              <li><strong>Web & Research:</strong> Search the internet, scrape data, and summarize large amounts of information.</li>
              <li><strong>Execution:</strong> Run code in Python, JavaScript, or Bash to solve complex math or data problems.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion
          title="Privacy & Safety Guardrails"
          icon={<Shield size={18} />}
          color="bg-green-6/10 text-green-11"
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <p>We take safety very seriously. Here is how MAYA stays in control:</p>
            <ul class="list-disc pl-5 space-y-1.5">
              <li><strong>Implicit Denial:</strong> By default, MAYA cannot do anything. It needs your "Handshake" (permission) for every new action.</li>
              <li><strong>Sandboxing:</strong> Every local or cloud worker is an "island." It cannot jump into your private personal files unless you invite it.</li>
              <li><strong>Human-in-the-Loop:</strong> You are always the boss. If MAYA tries to do something risky, it will pause and wait for your green light.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion
          title="GitHub Project & Community"
          icon={<Globe size={18} />}
          color="bg-slate-6/10 text-slate-11"
        >
          <div class="space-y-3 text-gray-11 text-xs leading-relaxed">
            <p>MAYA is open-source! You can contribute, report bugs, or request features on our GitHub page:</p>
            <div class="p-4 bg-gray-2/50 border border-gray-6 rounded-2xl flex items-center justify-between">
              <div>
                <h4 class="font-bold text-gray-12">Official GitHub Repository</h4>
                <p class="text-[10px] text-gray-10 mt-0.5">https://github.com/different-ai/maya</p>
              </div>
              <a 
                href="https://github.com/different-ai/maya" 
                target="_blank" 
                class="px-4 py-2 bg-gray-12 text-gray-1 rounded-xl font-bold text-[11px] hover:opacity-90 transition-opacity"
              >
                Visit GitHub
              </a>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Troubleshooting & FAQs"
          icon={<HelpCircle size={18} />}
          color="bg-orange-6/10 text-orange-11"
        >
          <div class="space-y-3">
            <div class="p-3 bg-gray-2/30 rounded-xl">
              <h4 class="font-bold text-gray-12 text-[11px]">MAYA is stuck?</h4>
              <p class="text-gray-10 text-[10px] mt-0.5">Go to <strong>Advanced</strong> and click <strong>"Restart Engine"</strong>.</p>
            </div>
            <div class="p-3 bg-gray-2/30 rounded-xl">
              <h4 class="font-bold text-gray-12 text-[11px]">Missing files?</h4>
              <p class="text-gray-10 text-[10px] mt-0.5">Check <strong>Settings</strong> to ensure folder access is granted.</p>
            </div>
          </div>
        </Accordion>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-gray-6/50">
        <button class="w-full sm:w-auto px-8 py-3 bg-gray-12 text-gray-1 rounded-2xl font-bold hover:opacity-90 transition-opacity text-sm">
          Join Community Discord
        </button>
        <button class="w-full sm:w-auto px-8 py-3 bg-white text-gray-12 border border-gray-6 rounded-2xl font-bold hover:bg-gray-2 transition-colors text-sm">
          Contact Support
        </button>
      </div>
    </div>
  );
}

function Accordion(props: { title: string, icon: any, children: any, color: string, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = createSignal(props.defaultOpen ?? false);

  return (
    <div class="border border-gray-6 rounded-2xl overflow-hidden bg-gray-1/50 backdrop-blur-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen())}
        class="w-full flex items-center justify-between p-5 text-left hover:bg-gray-2/50 transition-colors focus:outline-none"
      >
        <div class="flex items-center gap-4">
          <div class={`p-2.5 rounded-xl ${props.color} flex items-center justify-center`}>
            {props.icon}
          </div>
          <span class="text-lg font-bold text-gray-12 tracking-tight">{props.title}</span>
        </div>
        <ChevronDown size={20} class={`text-gray-9 transition-transform duration-500 ${isOpen() ? 'rotate-180' : ''}`} />
      </button>
      <div
        class={`transition-all duration-500 ease-in-out px-6 overflow-hidden ${isOpen() ? 'max-h-[1000px] pb-6 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div class="pt-2 border-t border-gray-6/30">
          {props.children}
        </div>
      </div>
    </div>
  );
}
