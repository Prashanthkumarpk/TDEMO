import { SectionTitle } from '@/components/common/SectionTitle';
import { TeamsDemo } from '@/components/teams-demo/TeamsDemo';

export function Demo() {
  return (
    <section id="demo" className="section-padding" aria-label="Interactive Teams agent demonstration">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Live Demo"
          title="Instead of explaining —"
          titleHighlight="experience it."
          subtitle="A realistic Microsoft Teams agent simulation. Ask questions, analyze failures, approve incidents, discover business scenarios."
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* Main chat area */}
          <div className="h-[640px]">
            <TeamsDemo />
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            <div className="glass rounded-xl p-4 border border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Demo Scenarios
              </h3>
              <div className="space-y-2 text-xs text-text-secondary">
                {[
                  { label: 'Batch Job Intelligence', badge: 'PRD', color: 'text-danger' },
                  { label: 'Root-Cause Analysis', badge: 'PRD', color: 'text-danger' },
                  { label: 'Incident Copilot', badge: 'GOVN', color: 'text-warning' },
                  { label: 'Business Scenario Discovery', badge: 'QAS', color: 'text-warning' },
                  { label: 'Cross-System Comparison', badge: 'ALL', color: 'text-info' },
                  { label: 'Security Governance Demo', badge: 'SEC', color: 'text-success' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span>{item.label}</span>
                    <span className={`font-mono text-xs ${item.color}`}>{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-success/20">
              <h3 className="text-sm font-semibold text-success mb-3">What to watch for</h3>
              <div className="space-y-2 text-xs text-text-secondary">
                {[
                  'Typing animation and streaming response',
                  'Rich job and incident cards',
                  'Confidence score and evidence list',
                  'Human-in-the-loop approval flow',
                  'Security refusal demonstration',
                  'Cross-system comparison cards',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-success shrink-0">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-warning/20">
              <h3 className="text-sm font-semibold text-warning mb-2">Demo Disclaimer</h3>
              <p className="text-xs text-text-secondary">
                This is a fully local simulation using typed mock data. No real SAP systems, credentials, or external APIs are used.
              </p>
            </div>

            <div className="glass rounded-xl p-4 border border-primary/20">
              <h3 className="text-sm font-semibold text-primary mb-3">Architecture behind this</h3>
              <div className="space-y-1.5 text-xs text-text-secondary">
                {[
                  'Dispatcher → Operations Agent',
                  'Incident Agent with approval',
                  'Governance Agent (authorization check)',
                  'Knowledge Agent (similar incidents)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
