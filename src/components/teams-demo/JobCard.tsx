import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Clock, Cpu } from 'lucide-react';
import type { BatchJob, JobAnalysis } from '@/types';
import { JobStatusBadge, SystemEnvBadge, Badge } from '@/components/common/Badge';
import { JOB_LOGS } from '@/data/batchJobs';

export function JobListCard({ jobs }: { jobs: BatchJob[] }) {
  return (
    <div className="space-y-2">
      {jobs.map((job, i) => (
        <div key={job.id} className="glass rounded-lg p-3 border-l-2 border-danger">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-semibold text-text-primary">{job.name}</span>
              <JobStatusBadge status={job.status} />
              <SystemEnvBadge env={job.system} />
            </div>
            <span className="text-xs font-mono text-text-secondary whitespace-nowrap shrink-0">
              #{i + 1}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-text-secondary mb-2">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              Failed at {job.failedAt}
            </span>
            {job.duration && (
              <span className="flex items-center gap-1">
                <Cpu size={11} />
                {job.duration} elapsed
              </span>
            )}
          </div>
          <div className="text-xs text-warning flex items-start gap-1.5">
            <AlertTriangle size={11} className="shrink-0 mt-0.5" />
            <span>{job.businessImpact}</span>
          </div>
          {job.probableCause && (
            <div className="mt-1.5 text-xs text-text-secondary">
              <span className="text-text-primary">Probable cause: </span>{job.probableCause}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function JobAnalysisCard({ analysis }: { analysis: JobAnalysis }) {
  const [showLog, setShowLog] = useState(false);
  const logs = JOB_LOGS[analysis.jobId] ?? [];

  return (
    <div className="space-y-3">
      {/* Root Cause */}
      <div className="glass rounded-lg p-3 border-l-2 border-primary">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1.5">Root Cause</div>
        <p className="text-sm text-text-primary leading-relaxed">{analysis.rootCause}</p>
      </div>

      {/* Confidence */}
      <div className="glass rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-secondary">Confidence Score</span>
          <span className="font-mono font-bold text-success text-sm">{analysis.confidence}%</span>
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-success confidence-fill rounded-full"
            style={{ width: `${analysis.confidence}%` }}
          />
        </div>
      </div>

      {/* Evidence */}
      <div className="glass rounded-lg p-3">
        <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">Evidence</div>
        <ul className="space-y-1.5">
          {analysis.evidence.map((ev, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text-primary">
              <span className="text-success shrink-0 mt-0.5">✓</span>
              <span>{ev}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Business Impact */}
      <div className="glass rounded-lg p-3 border-l-2 border-warning">
        <div className="text-xs font-mono uppercase tracking-wider text-warning mb-1.5">Business Impact</div>
        <p className="text-xs text-text-primary">{analysis.businessImpact}</p>
        {analysis.affectedCompanyCodes && (
          <div className="flex gap-1 mt-2">
            {analysis.affectedCompanyCodes.map(cc => (
              <Badge key={cc} variant="warning" size="sm">CC {cc}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* Related incidents */}
      {analysis.relatedIncidents.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-text-secondary">Related incidents:</span>
          {analysis.relatedIncidents.map(id => (
            <Badge key={id} variant="info" size="sm">{id}</Badge>
          ))}
        </div>
      )}

      {/* Expandable log */}
      {logs.length > 0 && (
        <div className="glass rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-3 text-xs text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setShowLog(v => !v)}
            aria-expanded={showLog}
          >
            <span className="font-mono uppercase tracking-wider">Job Log ({logs.length} entries)</span>
            {showLog ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showLog && (
            <div className="border-t border-border px-3 pb-3 max-h-48 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 text-xs py-1 border-b border-white/5 last:border-0">
                  <span className="font-mono text-text-secondary shrink-0">{log.timestamp}</span>
                  <span className={`shrink-0 font-mono uppercase w-12 ${log.level === 'error' ? 'text-danger' : log.level === 'warning' ? 'text-warning' : 'text-info'}`}>
                    {log.level}
                  </span>
                  <span className="text-text-primary">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
