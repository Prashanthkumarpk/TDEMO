import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ARCHITECTURE_LAYERS } from '@/data/architecture';

const LAYER_ICONS: Record<string, string> = {
  experience: '💬',
  agent: '🤖',
  orchestration: '🔀',
  integration: '🔗',
  'sap-landscape': '⚙️',
  security: '🔐',
};

export function Architecture() {
  const [expanded, setExpanded] = useState<string | null>('orchestration');
  const [ref, visible] = useIntersectionObserver();

  const toggle = (id: string) => setExpanded(v => v === id ? null : id);

  return (
    <section id="architecture" className="section-padding relative" aria-label="Technical architecture">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Technical Architecture"
          title="Built to scale"
          titleHighlight="responsibly."
          subtitle="Six distinct layers with security and governance embedded throughout — not bolted on afterward."
        />

        <div ref={ref} className="mt-16 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Layer accordion */}
          <div className="space-y-2">
            {ARCHITECTURE_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <button
                  className={`w-full glass rounded-xl px-5 py-4 flex items-center justify-between transition-all border ${
                    expanded === layer.id ? 'border-opacity-50' : 'border-border hover:border-white/15'
                  }`}
                  style={expanded === layer.id ? { borderColor: layer.color + '50' } : {}}
                  onClick={() => toggle(layer.id)}
                  aria-expanded={expanded === layer.id}
                  aria-controls={`layer-${layer.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" role="img" aria-label={layer.name}>{LAYER_ICONS[layer.id]}</span>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-text-primary">{layer.name}</div>
                      <div className="text-xs text-text-secondary">{layer.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex gap-1">
                      {layer.components.slice(0, 3).map(c => (
                        <div key={c.id} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color + '80' }} />
                      ))}
                      {layer.components.length > 3 && (
                        <span className="text-xs text-text-secondary">+{layer.components.length - 3}</span>
                      )}
                    </div>
                    {expanded === layer.id ? (
                      <ChevronDown size={14} className="text-text-secondary" />
                    ) : (
                      <ChevronRight size={14} className="text-text-secondary" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expanded === layer.id && (
                    <motion.div
                      id={`layer-${layer.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 glass rounded-xl p-4 border border-border">
                        <div className="grid sm:grid-cols-2 gap-2">
                          {layer.components.map(comp => (
                            <div key={comp.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/3 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: layer.color }} />
                              <div>
                                <div className="text-xs font-medium text-text-primary">{comp.name}</div>
                                <div className="text-xs text-text-secondary opacity-70">{comp.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Architecture flow diagram */}
          <div className="space-y-4">
            <div className="glass rounded-xl p-4 border border-border">
              <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-4">Request Flow</div>
              <div className="space-y-1">
                {[
                  { label: 'User', color: '#5DA9FF', arrow: true },
                  { label: 'Microsoft Teams', color: '#5DA9FF', arrow: true },
                  { label: 'Agent Layer', color: '#A01441', arrow: true },
                  { label: 'Orchestration', color: '#C52A5C', arrow: true },
                  { label: 'Governance Check', color: '#F5B942', arrow: true },
                  { label: 'Integration Layer', color: '#8B8FA8', arrow: true },
                  { label: 'SAP System', color: '#39C985', arrow: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex flex-col items-center w-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.arrow && <div className="w-px h-4" style={{ backgroundColor: item.color + '40' }} />}
                    </div>
                    <span className="text-xs text-text-secondary py-1">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-primary/20">
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3">Security Principle</div>
              <p className="text-xs text-text-secondary leading-relaxed">
                The agent can never provide more access than the authenticated user and approved technical integration are authorized to use.
              </p>
            </div>

            <div className="glass rounded-xl p-4 border border-success/20">
              <div className="text-xs font-mono uppercase tracking-wider text-success mb-3">Reusable Foundation</div>
              <div className="space-y-1.5 text-xs text-text-secondary">
                {['Finance', 'Procurement', 'Sales & Distribution', 'HR & Payroll', 'Supply Chain', 'Analytics', 'Insurance & Reinsurance'].map(m => (
                  <div key={m} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-success" />
                    <span>{m}</span>
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
