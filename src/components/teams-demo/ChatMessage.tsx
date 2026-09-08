import { useState } from 'react';
import { Copy, Check, Shield, Lock } from 'lucide-react';
import type { ConversationMessage } from '@/types';
import { SystemEnvBadge } from '@/components/common/Badge';
import { JobListCard, JobAnalysisCard } from './JobCard';
import { IncidentDraftCard, IncidentCreatedCard, SecurityRefusalCard } from './IncidentCard';
import { ScenarioDiscoveryCard, ScenarioComparisonCard } from './ScenarioCard';
import type { BatchJob, JobAnalysis, IncidentDraft, Incident, BusinessScenario, ScenarioComparison } from '@/types';

function AgentAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-white">SA</span>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-info to-blue-700 flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-white">ME</span>
    </div>
  );
}

function MarkdownText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function MessageContent({ msg, onApprove, onCancel }: {
  msg: ConversationMessage;
  onApprove: () => void;
  onCancel: () => void;
}) {
  switch (msg.cardType) {
    case 'job_list':
      return (
        <div className="space-y-2">
          <p className="text-sm text-text-primary mb-2 leading-relaxed">
            <MarkdownText text={msg.content} />
          </p>
          <JobListCard jobs={msg.cardData as BatchJob[]} />
        </div>
      );
    case 'job_analysis':
      return (
        <div className="space-y-2">
          <p className="text-sm text-text-primary mb-2 leading-relaxed">
            <MarkdownText text={msg.content} />
          </p>
          <JobAnalysisCard analysis={msg.cardData as JobAnalysis} />
        </div>
      );
    case 'incident_draft':
      return (
        <div className="space-y-2">
          <p className="text-sm text-text-primary mb-2 leading-relaxed">
            <MarkdownText text={msg.content} />
          </p>
          <IncidentDraftCard
            draft={msg.cardData as IncidentDraft}
            onApprove={onApprove}
            onCancel={onCancel}
          />
        </div>
      );
    case 'incident_created':
      return (
        <div className="space-y-2">
          <p className="text-sm text-text-primary mb-2 leading-relaxed">
            <MarkdownText text={msg.content} />
          </p>
          <IncidentCreatedCard incident={msg.cardData as Incident} />
        </div>
      );
    case 'scenario_discovery':
      return (
        <div className="space-y-2">
          <p className="text-sm text-text-primary mb-2 leading-relaxed">
            <MarkdownText text={msg.content} />
          </p>
          <ScenarioDiscoveryCard scenario={msg.cardData as BusinessScenario} />
        </div>
      );
    case 'scenario_comparison':
      return (
        <div className="space-y-2">
          <p className="text-sm text-text-primary mb-2 leading-relaxed">
            <MarkdownText text={msg.content} />
          </p>
          <ScenarioComparisonCard comparison={msg.cardData as ScenarioComparison} />
        </div>
      );
    case 'security_refusal':
      return (
        <div className="space-y-2">
          <SecurityRefusalCard content={msg.content} />
        </div>
      );
    default:
      return (
        <p className={`text-sm leading-relaxed whitespace-pre-line ${msg.isStreaming ? 'streaming-cursor' : ''}`}>
          <MarkdownText text={msg.content} />
        </p>
      );
  }
}

interface ChatMessageProps {
  message: ConversationMessage;
  onApprove: () => void;
  onCancel: () => void;
}

export function ChatMessage({ message: msg, onApprove, onCancel }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const copyContent = () => {
    navigator.clipboard.writeText(msg.content).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (msg.role === 'user') {
    return (
      <div className="flex items-end gap-2 justify-end">
        <div className="max-w-[75%]">
          <div className="bubble-user px-4 py-2.5">
            <p className="text-sm text-white leading-relaxed">{msg.content}</p>
          </div>
          <div className="text-xs text-text-secondary mt-1 text-right pr-1">{msg.timestamp}</div>
        </div>
        <UserAvatar />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <AgentAvatar />
      <div className="max-w-[85%] flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold text-primary">SAP Command Center</span>
          {msg.system && <SystemEnvBadge env={msg.system} />}
          {msg.auditRequired && (
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <Shield size={10} className="text-warning" />
              <span className="text-warning">Audited</span>
            </span>
          )}
          {msg.requiresApproval && (
            <span className="flex items-center gap-1 text-xs text-warning">
              <Lock size={10} />
              Approval required
            </span>
          )}
        </div>

        <div className="bubble-agent px-4 py-3">
          <MessageContent msg={msg} onApprove={onApprove} onCancel={onCancel} />
        </div>

        <div className="flex items-center justify-between mt-1 px-1">
          <span className="text-xs text-text-secondary">{msg.timestamp}</span>
          {msg.role === 'agent' && !msg.isStreaming && (
            <button
              onClick={copyContent}
              className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors"
              aria-label="Copy response"
            >
              {copied ? <Check size={11} className="text-success" /> : <Copy size={11} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <AgentAvatar />
      <div className="bubble-agent px-4 py-3">
        <div className="flex items-center gap-1.5" aria-label="Agent is typing">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary ml-1">Analyzing SAP data…</span>
        </div>
      </div>
    </div>
  );
}
