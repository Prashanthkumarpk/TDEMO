import type { JobStatus, SystemStatus, IncidentPriority, IncidentStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

const VARIANT_CLASSES: Record<string, string> = {
  default: 'bg-surface-light text-text-secondary border border-border',
  success: 'status-healthy',
  warning: 'status-warning',
  danger: 'status-critical',
  info: 'text-info bg-info/10 border border-info/25',
  muted: 'text-text-secondary bg-white/5 border border-white/10',
};

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-mono font-medium ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}>
      {children}
    </span>
  );
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const map: Record<JobStatus, { label: string; variant: BadgeProps['variant'] }> = {
    completed: { label: 'Completed', variant: 'success' },
    running: { label: 'Running', variant: 'info' },
    failed: { label: 'Failed', variant: 'danger' },
    cancelled: { label: 'Cancelled', variant: 'danger' },
    scheduled: { label: 'Scheduled', variant: 'muted' },
    delayed: { label: 'Delayed', variant: 'warning' },
  };
  const { label, variant } = map[status] ?? { label: status, variant: 'default' };
  return <Badge variant={variant}>{label}</Badge>;
}

export function SystemStatusBadge({ status }: { status: SystemStatus }) {
  const map: Record<SystemStatus, { dot: string; variant: BadgeProps['variant'] }> = {
    healthy: { dot: '●', variant: 'success' },
    warning: { dot: '●', variant: 'warning' },
    critical: { dot: '●', variant: 'danger' },
    unknown: { dot: '●', variant: 'muted' },
  };
  const { dot, variant } = map[status];
  return <Badge variant={variant} size="sm"><span>{dot}</span>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: IncidentPriority }) {
  const map: Record<IncidentPriority, BadgeProps['variant']> = {
    critical: 'danger',
    high: 'warning',
    medium: 'info',
    low: 'muted',
  };
  return <Badge variant={map[priority]}>{priority.toUpperCase()}</Badge>;
}

export function SystemEnvBadge({ env }: { env: string }) {
  const colors: Record<string, string> = {
    PRD: 'text-danger bg-danger/10 border border-danger/25',
    QAS: 'text-warning bg-warning/10 border border-warning/25',
    DEV: 'text-info bg-info/10 border border-info/25',
    BW: 'text-success bg-success/10 border border-success/25',
    BTP: 'text-purple-400 bg-purple-400/10 border border-purple-400/25',
    ECC: 'text-text-secondary bg-white/5 border border-white/10',
    SOL: 'text-text-secondary bg-white/5 border border-white/10',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold rounded-sm ${colors[env] ?? colors.SOL}`}>
      {env}
    </span>
  );
}

export function IncidentStatusBadge({ status }: { status: IncidentStatus }) {
  const map: Record<IncidentStatus, BadgeProps['variant']> = {
    open: 'danger',
    in_progress: 'warning',
    resolved: 'success',
    closed: 'muted',
  };
  const labels: Record<IncidentStatus, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  };
  return <Badge variant={map[status]}>{labels[status]}</Badge>;
}
