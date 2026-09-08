import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { DIFFERENTIATORS } from '@/data/businessValue';
import { type LucideIcon, MessageSquare, Layers, Activity, Eye, Shield, Globe, TrendingUp, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare, Layers, Activity, Eye, Shield, Globe, TrendingUp, Sparkles,
};

const MSG_STRENGTHS = [
  { title: 'Deep SAP Expertise', desc: 'SAP implementation, integration, and support experience across multiple modules and landscapes.' },
  { title: 'Industry Knowledge', desc: 'Insurance, reinsurance, financial services, and enterprise process expertise.' },
  { title: 'Enterprise Integration', desc: 'SAP BTP, Integration Suite, API Management, and cross-system connectivity capability.' },
  { title: 'Microsoft Ecosystem', desc: 'Microsoft 365, Teams, Copilot Studio, and Azure experience.' },
  { title: 'Delivery Experience', desc: 'Proven delivery methodology for SAP transformation and innovation projects.' },
  { title: 'Responsible AI Mindset', desc: 'Governance-first approach to AI — security, transparency, and human oversight built in.' },
  { title: 'Prototype to Production', desc: 'Capability to take this concept from hackathon prototype to scalable enterprise implementation.' },
];

export function WhyMsg() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="why-msg" className="section-padding relative" aria-label="Why MSG Global Solutions">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Why This Wins */}
        <SectionTitle
          eyebrow="Differentiators"
          title="Why this wins."
          subtitle="Eight reasons this solution stands apart from conventional SAP chatbots and general-purpose AI tools."
        />

        <div ref={ref} className="mt-12 grid sm:grid-cols-2 gap-4 mb-20">
          {DIFFERENTIATORS.map((diff, i) => {
            const Icon = ICON_MAP[diff.icon] ?? Activity;
            return (
              <motion.div
                key={diff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass rounded-xl p-5 border border-border hover:border-primary/25 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <Icon size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-danger line-through opacity-60 mb-0.5">Not: {diff.not}</div>
                    <div className="text-sm text-text-primary font-medium">{diff.but}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why MSG */}
        <SectionTitle
          eyebrow="MSG Global Solutions"
          title="The expertise to"
          titleHighlight="make it real."
          subtitle="MSG Global Solutions has the capabilities to evolve this concept from hackathon prototype to enterprise-grade agentic platform."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MSG_STRENGTHS.map((strength, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              className="glass rounded-xl p-5 border border-border hover:border-white/15 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold text-text-primary">{strength.title}</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{strength.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
