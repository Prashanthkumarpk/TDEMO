import { useState } from 'react';
import { CheckCircle, XCircle, Edit3, Bell, Paperclip } from 'lucide-react';
import type { IncidentDraft, Incident } from '@/types';
import { PriorityBadge, SystemEnvBadge, IncidentStatusBadge } from '@/components/common/Badge';
import { useAppStore } from '@/store/appStore';

export function IncidentDraftCard({
  draft,
  onApprove,
  onCancel,
}: {
  draft: IncidentDraft;
  onApprove: () => void;
  onCancel: () => void;
}) {
  const [isApproving, setIsApproving] = useState(false);
  const incidentApproved = useAppStore(s => s.incidentApproved);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      onApprove();
    }, 800);
  };

  if (incidentApproved) return null;

  return (
    <div className="glass rounded-xl p-4 border border-warning/30 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-wider text-warning">Awaiting Approval</span>
      </div>

      {/* Title & Priority */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-2">{draft.title}</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <PriorityBadge priority={draft.priority} />
          <SystemEnvBadge env={draft.system} />
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-2 text-xs">
        <div>
          <span className="text-text-secondary block mb-0.5">Business Impact</span>
          <span className="text-text-primary">{draft.businessImpact}</span>
        </div>
        <div>
          <span className="text-text-secondary block mb-0.5">Technical Evidence</span>
          <span className="text-text-primary">{draft.technicalEvidence}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Suggested Group</span>
          <span className="text-text-primary font-medium">{draft.suggestedGroup}</span>
        </div>
      </div>

      {/* Attachments */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Paperclip size={11} className="text-text-secondary" />
        {draft.attachments.map((a, i) => (
          <span key={i} className="text-xs text-info bg-info/10 border border-info/20 px-2 py-0.5 rounded-full">{a}</span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1 flex-wrap">
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-success/15 hover:bg-success/25 border border-success/30 text-success text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <CheckCircle size={13} />
          {isApproving ? 'Creating…' : 'Approve & Create'}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 glass hover:bg-white/5 text-text-secondary text-xs font-medium rounded-lg transition-colors border border-border">
          <Edit3 size={13} />
          Modify Priority
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-3 py-1.5 glass hover:bg-white/5 text-text-secondary text-xs font-medium rounded-lg transition-colors border border-border"
        >
          <XCircle size={13} />
          Cancel
        </button>
      </div>
    </div>
  );
}

export function IncidentCreatedCard({ incident }: { incident: Incident }) {
  return (
    <div className="glass rounded-xl p-4 border border-success/30 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <CheckCircle size={14} className="text-success" />
        <span className="text-xs font-mono uppercase tracking-wider text-success">Incident Created</span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-mono font-bold text-text-primary">{incident.id}</span>
        <PriorityBadge priority={incident.priority} />
        <SystemEnvBadge env={incident.system} />
        <IncidentStatusBadge status={incident.status} />
      </div>

      <p className="text-sm text-text-primary">{incident.title}</p>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-2 text-success">
          <span>✓</span>
          <span>{incident.assignmentGroup} channel notified</span>
        </div>
        <div className="flex items-center gap-2 text-success">
          <span>✓</span>
          <span>Follow-up reminder scheduled — 30 minutes</span>
        </div>
        <div className="flex items-center gap-2 text-success">
          <Bell size={11} />
          <span>Audit event logged</span>
        </div>
      </div>
    </div>
  );
}

export function SecurityRefusalCard({ content }: { content: string }) {
  return (
    <div className="glass rounded-xl p-4 border border-danger/30">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-danger" />
        <span className="text-xs font-mono uppercase tracking-wider text-danger">Action Restricted</span>
      </div>
      <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line">{content}</p>
      <div className="mt-3 p-2 bg-danger/8 rounded-lg text-xs text-text-secondary border border-danger/15">
        Authorization is evaluated before data retrieval and before action execution.
      </div>
    </div>
  );
}
