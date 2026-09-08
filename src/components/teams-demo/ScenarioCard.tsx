import type { BusinessScenario, ScenarioComparison } from '@/types';
import { SystemEnvBadge, Badge } from '@/components/common/Badge';

const STATUS_LABELS: Record<string, string> = {
  fully_configured: 'Configured',
  partially_configured: 'Partial',
  not_configured: 'Missing',
  unknown: 'Unknown',
};

const STATUS_VARIANTS: Record<string, string> = {
  fully_configured: 'text-success',
  partially_configured: 'text-warning',
  not_configured: 'text-danger',
  unknown: 'text-text-secondary',
};

export function ScenarioDiscoveryCard({ scenario }: { scenario: BusinessScenario }) {
  const gap = scenario.gaps?.[0];

  return (
    <div className="space-y-3">
      {/* Scenario header */}
      <div className="glass rounded-lg p-3 border-l-2 border-info">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">{scenario.name}</h4>
            <p className="text-xs text-text-secondary mt-0.5">{scenario.module}</p>
          </div>
          <Badge variant="info" size="sm">Discovered</Badge>
        </div>
        <p className="text-xs text-text-secondary">{scenario.description}</p>
      </div>

      {/* Components */}
      <div className="glass rounded-lg p-3">
        <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">Discovered Components</div>
        <div className="space-y-1.5">
          {scenario.components.map((comp, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-text-secondary capitalize">{comp.type}</span>
                <span className="text-text-primary">{comp.name}</span>
              </div>
              <span className={`font-mono text-xs ${STATUS_VARIANTS[comp.status]}`}>
                {STATUS_LABELS[comp.status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gap alert */}
      {gap && (
        <div className="glass rounded-lg p-3 border-l-2 border-warning">
          <div className="text-xs font-mono uppercase tracking-wider text-warning mb-1.5">Gap Identified</div>
          <p className="text-xs text-text-primary mb-1">{gap.description}</p>
          <p className="text-xs text-text-secondary">{gap.recommendation}</p>
        </div>
      )}

      {/* System status row */}
      <div className="flex items-center gap-2 flex-wrap">
        {Object.entries(scenario.systems).map(([env, status]) => (
          <div key={env} className="flex items-center gap-1">
            <SystemEnvBadge env={env} />
            <span className={`text-xs ${STATUS_VARIANTS[status]}`}>
              {STATUS_LABELS[status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScenarioComparisonCard({ comparison }: { comparison: ScenarioComparison }) {
  return (
    <div className="space-y-3">
      {/* Comparison header */}
      <div className="grid grid-cols-2 gap-2">
        <div className={`glass rounded-lg p-3 border-l-2 ${comparison.statusA === 'fully_configured' ? 'border-success' : 'border-warning'}`}>
          <div className="flex items-center gap-2 mb-1">
            <SystemEnvBadge env={comparison.systemA} />
            <span className={`text-xs font-semibold ${STATUS_VARIANTS[comparison.statusA]}`}>
              {STATUS_LABELS[comparison.statusA]}
            </span>
          </div>
          <p className="text-xs text-text-secondary">Company Codes 1000 &amp; 2000</p>
        </div>
        <div className={`glass rounded-lg p-3 border-l-2 ${comparison.statusB === 'fully_configured' ? 'border-success' : 'border-warning'}`}>
          <div className="flex items-center gap-2 mb-1">
            <SystemEnvBadge env={comparison.systemB} />
            <span className={`text-xs font-semibold ${STATUS_VARIANTS[comparison.statusB]}`}>
              {STATUS_LABELS[comparison.statusB]}
            </span>
          </div>
          <p className="text-xs text-text-secondary">Company Code 1000 only</p>
        </div>
      </div>

      {/* Differences */}
      <div className="glass rounded-lg p-3">
        <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">Key Differences</div>
        <div className="space-y-1.5">
          {comparison.differences.map((diff, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={i % 2 === 0 ? 'text-success' : 'text-warning'}>
                {i % 2 === 0 ? '✓' : '△'}
              </span>
              <span className="text-text-primary">{diff}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="glass rounded-lg p-3 border-l-2 border-info">
        <div className="text-xs font-mono uppercase tracking-wider text-info mb-1.5">Suggested Next Step</div>
        <p className="text-xs text-text-primary">{comparison.recommendation}</p>
      </div>
    </div>
  );
}
