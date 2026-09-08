import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { TeamsDemo } from '@/components/teams-demo/TeamsDemo';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const DEMO_HIGHLIGHTS = [
  { emoji: '💬', label: 'Natural-language query' },
  { emoji: '⚡', label: 'Streaming agent response' },
  { emoji: '📊', label: 'Rich evidence cards' },
  { emoji: '🔐', label: 'Human approval required' },
  { emoji: '✅', label: 'Incident created & notified' },
  { emoji: '🛡️', label: 'Authorization refusal demo' },
];

export function Demo() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="demo" className="section-padding relative" aria-label="Interactive Teams agent demonstration">
      {/* Ambient glow behind the demo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] -z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(160,20,65,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Live Demo"
          title="Instead of explaining —"
          titleHighlight="experience it."
          subtitle="A fully simulated Microsoft Teams agent. Run the guided demo to watch the complete agentic workflow live."
        />

        <div ref={ref} className="mt-8 grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Chat area with glow frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow border effect */}
            <div
              className="absolute -inset-px rounded-2xl -z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(160,20,65,0.4) 0%, rgba(93,169,255,0.15) 50%, rgba(160,20,65,0.3) 100%)',
                filter: 'blur(1px)',
              }}
              aria-hidden="true"
            />
            <div className="h-[540px] md:h-[620px] lg:h-[660px] rounded-2xl overflow-hidden">
              <TeamsDemo />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            {/* What happens in the demo */}
            <div
              className="rounded-2xl border p-5"
              style={{ background: 'rgba(17,19,26,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Guided Demo — 8 steps
              </h3>
              <div className="space-y-2.5">
                {[
                  { n: '01', text: 'Request failed PRD jobs', color: '#F15B64' },
                  { n: '02', text: 'Agent retrieves 3 failures', color: '#F5B942' },
                  { n: '03', text: 'Request root-cause analysis', color: '#F5B942' },
                  { n: '04', text: 'Evidence + confidence score', color: '#A01441' },
                  { n: '05', text: 'Request incident creation', color: '#A01441' },
                  { n: '06', text: 'Agent prepares + asks approval', color: '#C52A5C' },
                  { n: '07', text: 'User approves', color: '#39C985' },
                  { n: '08', text: 'Incident created, team notified', color: '#39C985' },
                ].map(step => (
                  <div key={step.n} className="flex items-center gap-3 text-xs">
                    <span className="font-mono shrink-0 w-5 text-right" style={{ color: step.color }}>
                      {step.n}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }} />
                    <span className="text-text-secondary shrink-0 max-w-[150px] text-right leading-tight">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights grid */}
            <div
              className="rounded-2xl border p-5"
              style={{ background: 'rgba(17,19,26,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <h3 className="text-sm font-semibold text-text-primary mb-3">Watch for these moments</h3>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary p-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span>{h.emoji}</span>
                    <span>{h.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture hint */}
            <div
              className="rounded-2xl border p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(160,20,65,0.08) 0%, rgba(17,19,26,0.8) 100%)',
                borderColor: 'rgba(160,20,65,0.2)',
              }}
            >
              <h3 className="text-sm font-semibold text-primary mb-3">Agents behind this demo</h3>
              <div className="space-y-1.5">
                {[
                  'Dispatcher → SAP Operations Agent',
                  'Incident Agent (with approval gate)',
                  'Governance Agent (auth check)',
                  'Knowledge Agent (past incidents)',
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-text-secondary opacity-40 text-center px-2">
              All data is fictional mock data. No real SAP credentials or external APIs are used.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
