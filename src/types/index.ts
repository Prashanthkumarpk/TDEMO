// ─── SAP System Types ────────────────────────────────────────────────────────

export type SystemEnv = 'DEV' | 'QAS' | 'PRD' | 'BW' | 'BTP' | 'ECC' | 'SOL';
export type SystemStatus = 'healthy' | 'warning' | 'critical' | 'unknown';

export interface SapSystem {
  id: string;
  name: string;
  env: SystemEnv;
  description: string;
  status: SystemStatus;
  host?: string;
  client?: string;
  version?: string;
  activeJobs?: number;
  failedJobs?: number;
  openIncidents?: number;
}

// ─── Batch Job Types ──────────────────────────────────────────────────────────

export type JobStatus = 'completed' | 'running' | 'failed' | 'cancelled' | 'scheduled' | 'delayed';

export interface BatchJob {
  id: string;
  name: string;
  system: SystemEnv;
  status: JobStatus;
  startTime: string;
  endTime?: string;
  duration?: string;
  failedAt?: string;
  businessImpact: string;
  probableCause?: string;
  technicalMessage?: string;
  jobClass?: string;
  programName?: string;
  variant?: string;
  owner?: string;
  priority?: 'normal' | 'high' | 'critical';
}

export interface JobLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  object?: string;
}

export interface JobAnalysis {
  jobId: string;
  rootCause: string;
  evidence: string[];
  confidence: number;
  relatedIncidents: string[];
  recommendedAction: string;
  businessImpact: string;
  affectedCompanyCodes?: string[];
}

// ─── Incident Types ──────────────────────────────────────────────────────────

export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  system: SystemEnv;
  category: string;
  assignmentGroup: string;
  description: string;
  businessImpact: string;
  technicalEvidence?: string;
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
  relatedJobId?: string;
  attachments?: string[];
}

export interface IncidentDraft {
  title: string;
  priority: IncidentPriority;
  system: SystemEnv;
  businessImpact: string;
  technicalEvidence: string;
  suggestedGroup: string;
  attachments: string[];
  relatedJobId?: string;
}

// ─── Business Scenario Types ─────────────────────────────────────────────────

export type ScenarioStatus = 'fully_configured' | 'partially_configured' | 'not_configured' | 'unknown';

export interface ScenarioComponent {
  name: string;
  type: 'job' | 'workflow' | 'interface' | 'config' | 'service' | 'document' | 'report';
  status: ScenarioStatus;
  description?: string;
}

export interface BusinessScenario {
  id: string;
  name: string;
  module: string;
  description: string;
  systems: Record<SystemEnv, ScenarioStatus>;
  components: ScenarioComponent[];
  gaps?: ScenarioGap[];
  relatedDocumentation?: string[];
}

export interface ScenarioGap {
  system: SystemEnv;
  description: string;
  severity: 'critical' | 'medium' | 'low';
  recommendation: string;
}

export interface ScenarioComparison {
  scenarioId: string;
  systemA: SystemEnv;
  systemB: SystemEnv;
  statusA: ScenarioStatus;
  statusB: ScenarioStatus;
  differences: string[];
  recommendation: string;
}

// ─── Conversation / Chat Types ────────────────────────────────────────────────

export type MessageRole = 'user' | 'agent';
export type MessageCardType = 'job_list' | 'job_analysis' | 'incident_draft' | 'incident_created' |
  'scenario_discovery' | 'scenario_comparison' | 'system_health' | 'security_refusal' |
  'plain' | 'approval' | 'command_list';

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  cardType?: MessageCardType;
  cardData?: unknown;
  confidence?: number;
  system?: SystemEnv;
  isStreaming?: boolean;
  requiresApproval?: boolean;
  auditRequired?: boolean;
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  system: SystemEnv;
  steps: DemoStep[];
}

export interface DemoStep {
  id: string;
  role: MessageRole;
  content: string;
  delay: number;
  cardType?: MessageCardType;
  cardData?: unknown;
  confidence?: number;
  requiresApproval?: boolean;
  auditRequired?: boolean;
}

// ─── Architecture Types ───────────────────────────────────────────────────────

export interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  components: ArchitectureComponent[];
  color: string;
  position: number;
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  description: string;
  type: string;
  icon?: string;
}

// ─── Persona Types ────────────────────────────────────────────────────────────

export interface Persona {
  id: string;
  role: string;
  icon: string;
  primaryColor: string;
  responsibilities: string[];
  agentCapabilities: string[];
}

// ─── Business Value Types ─────────────────────────────────────────────────────

export interface ValuePillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
}

export interface MetricCard {
  value: string;
  label: string;
  description: string;
}

// ─── Roadmap Types ────────────────────────────────────────────────────────────

export interface RoadmapPhase {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  capabilities: string[];
  color: string;
}

// ─── Presentation Types ───────────────────────────────────────────────────────

export interface PresentationScene {
  id: string;
  index: number;
  heading: string;
  subheading?: string;
  sectionId: string;
  speakerNotes: string;
}

// ─── Differentiator Types ─────────────────────────────────────────────────────

export interface Differentiator {
  id: string;
  not: string;
  but: string;
  icon: string;
}

// ─── Audit Event Types ────────────────────────────────────────────────────────

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  system: SystemEnv;
  resource: string;
  result: 'allowed' | 'denied' | 'pending_approval';
  reason?: string;
}
