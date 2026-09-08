import { useState } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon, Server, Headphones, Settings, Code, Briefcase, TrendingUp, Users } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { PERSONAS } from '@/data/personas';

const ICON_MAP: Record<string, LucideIcon> = {
  Server, Headphones, Settings, Code, Briefcase, TrendingUp, Users,
};

export function Personas() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useIntersectionObserver();
  const persona = PERSONAS[active];
  const Icon = ICON_MAP[persona.icon] ?? Users;

  return (
    <section id="personas" className="section-padding" aria-label="Target users">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Target Users"
          title="Designed for every"
          titleHighlight="SAP stakeholder."
          subtitle="From Basis administrators to business users — one conversational entry point serves every authorized role."
        />

        <div ref={ref} className="mt-12 grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Persona list */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {PERSONAS.map((p, i) => {
              const PIcon = ICON_MAP[p.icon] ?? Users;
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap lg:whitespace-normal text-left transition-all border shrink-0 ${
                    active === i
                      ? 'glass border-primary/40 text-text-primary'
                      : 'glass border-border text-text-secondary hover:border-white/15 hover:text-text-primary'
                  }`}
                  aria-pressed={active === i}
                  aria-label={p.role}
                >
                  <PIcon size={16} style={active === i ? { color: p.primaryColor } : undefined} aria-hidden="true" />
                  <span className="text-sm font-medium">{p.role}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Persona detail */}
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center border"
                style={{ backgroundColor: persona.primaryColor + '15', borderColor: persona.primaryColor + '30' }}
              >
                <Icon size={24} style={{ color: persona.primaryColor }} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">{persona.role}</h3>
                <p className="text-xs text-text-secondary">One of 7 supported user profiles</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-3">Responsibilities</div>
                <div className="space-y-2">
                  {persona.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: persona.primaryColor }} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-3">Sample Agent Commands</div>
                <div className="space-y-2">
                  {persona.agentCapabilities.map((cap, i) => (
                    <div key={i} className="text-xs glass border border-border rounded-lg px-3 py-2 font-mono text-text-primary">
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
