import { motion } from 'framer-motion';
import { type LucideIcon, Zap, Search, CheckCircle, Brain, Smile, Globe, Layers, Shield, Compass, Star } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { VALUE_PILLARS, METRIC_CARDS, ROADMAP_PHASES } from '@/data/businessValue';

const ICON_MAP: Record<string, LucideIcon> = {
  Zap, Search, CheckCircle, Brain, Smile, Globe, Layers, Shield, Compass, Star,
};

export function BusinessValue() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="business-value" className="section-padding" aria-label="Business value">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Business Value"
          title="Measurable impact"
          titleHighlight="across the enterprise."
          subtitle="From faster incident triage to cross-system visibility — the value compounds with every SAP scenario added."
        />

        {/* Metric cards */}
        <div ref={ref} className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {METRIC_CARDS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-xl p-5 text-center border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="text-3xl font-heading font-bold gradient-text mb-1">{metric.value}</div>
              <div className="text-xs font-semibold text-text-primary mb-1">{metric.label}</div>
              <div className="text-xs text-text-secondary opacity-60">{metric.description}</div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-center text-text-secondary opacity-50 mb-12">
          Illustrative hackathon targets. Actual outcomes depend on the customer landscape, integrations, process maturity, and implementation scope.
        </p>

        {/* Value pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {VALUE_PILLARS.map((pillar, i) => {
            const Icon = ICON_MAP[pillar.icon] ?? Zap;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                className="glass rounded-xl p-5 border border-border hover:border-white/15 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Icon size={20} className="text-primary shrink-0" aria-hidden="true" />
                  {pillar.metric && (
                    <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {pillar.metric}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">{pillar.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Roadmap */}
        <div id="roadmap">
          <SectionTitle
            eyebrow="Evolution Roadmap"
            title="From assistance to"
            titleHighlight="governed autonomy."
            subtitle="A phased approach that builds trust, capability, and organizational readiness at each stage."
          />

          <div className="mt-12 relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ROADMAP_PHASES.map((phase, i) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="relative"
                >
                  {/* Phase number circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 text-sm font-bold font-heading relative z-10 bg-background"
                    style={{ borderColor: phase.color, color: phase.color }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>

                  <div className="glass rounded-xl p-4 border border-border hover:border-white/15 transition-colors">
                    <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: phase.color }}>{phase.phase}</div>
                    <div className="text-sm font-semibold text-text-primary mb-1">{phase.title}</div>
                    <div className="text-xs text-text-secondary mb-3">{phase.subtitle}</div>
                    <div className="space-y-1">
                      {phase.capabilities.map((cap, j) => (
                        <div key={j} className="flex items-start gap-1.5 text-xs text-text-secondary">
                          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: phase.color }} />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
