import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({ eyebrow, title, titleHighlight, subtitle, centered = false, className = '' }: SectionTitleProps) {
  const [ref, visible] = useIntersectionObserver();
  const align = centered ? 'text-center items-center' : '';

  return (
    <div ref={ref} className={`flex flex-col gap-3 ${align} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2"
        >
          <div className="h-px w-8 bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
          <div className="h-px w-8 bg-primary" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold"
      >
        {title}{' '}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary text-lg max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
