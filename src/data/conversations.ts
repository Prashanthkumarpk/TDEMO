import type { DemoScenario, DemoStep } from '@/types';
import { BATCH_JOBS, JOB_ANALYSES } from './batchJobs';
import { INCIDENT_DRAFT, INCIDENTS } from './incidents';
import { BUSINESS_SCENARIOS, SCENARIO_COMPARISONS } from './scenarios';

// Timing constants (ms) — adjust here to change demo pacing
export const DEMO_TIMING = {
  userTypingDelay: 800,
  agentThinkingDelay: 1200,
  agentStreamingDelay: 60,   // ms per character
  stepInterval: 500,
  autoAdvanceDelay: 2000,
};

const FAILED_PRD_JOBS = BATCH_JOBS.filter(j => j.system === 'PRD' && j.status === 'cancelled');

export const GUIDED_DEMO_SCENARIO: DemoScenario = {
  id: 'guided-demo-main',
  title: 'End-to-End Guided Demo',
  description: 'Failed jobs → Root-cause analysis → Incident creation → Approval → Resolution',
  system: 'PRD',
  steps: [
    {
      id: 'step-1-user',
      role: 'user',
      content: 'Show me failed batch jobs in PRD during the last 24 hours.',
      delay: 0,
    },
    {
      id: 'step-2-agent',
      role: 'agent',
      content: `I found **${FAILED_PRD_JOBS.length} failed jobs** in PRD during the last 24 hours.\n\nHere is the summary:`,
      delay: 1400,
      cardType: 'job_list',
      cardData: FAILED_PRD_JOBS,
    },
    {
      id: 'step-3-user',
      role: 'user',
      content: 'Analyze ZFI_PAYMENT_POSTING.',
      delay: 2000,
    },
    {
      id: 'step-4-agent',
      role: 'agent',
      content: `The job failed during payment-document posting.\n\n**Probable root cause:**\n${JOB_ANALYSES['JOB001'].rootCause}\n\n**Recommended action:**\n${JOB_ANALYSES['JOB001'].recommendedAction}\n\nI can prepare an incident with the job log, probable cause, business impact, and recommended support group.`,
      delay: 1800,
      cardType: 'job_analysis',
      cardData: JOB_ANALYSES['JOB001'],
      confidence: 94,
      auditRequired: true,
    },
    {
      id: 'step-5-user',
      role: 'user',
      content: 'Create a high-priority incident for the failed payment job.',
      delay: 2000,
    },
    {
      id: 'step-6-agent',
      role: 'agent',
      content: 'I have prepared the incident below. Please review all details before approving.',
      delay: 1600,
      cardType: 'incident_draft',
      cardData: INCIDENT_DRAFT,
      requiresApproval: true,
      auditRequired: true,
    },
    {
      id: 'step-7-approved',
      role: 'agent',
      content: `Incident **${INCIDENTS[0].id}** created successfully.\n\n✓ The SAP Finance Application Support channel has been notified.\n✓ A follow-up reminder has been scheduled for 30 minutes.\n✓ Audit event logged.\n\nIs there anything else you need for this incident?`,
      delay: 1200,
      cardType: 'incident_created',
      cardData: INCIDENTS[0],
    },
  ] as DemoStep[],
};

export const DEMO_SCENARIOS: DemoScenario[] = [
  GUIDED_DEMO_SCENARIO,
  {
    id: 'scenario-discovery',
    title: 'Business Scenario Discovery',
    description: 'Discover and compare payment processing across systems',
    system: 'QAS',
    steps: [
      {
        id: 'sd-1',
        role: 'user',
        content: 'Does automated payment processing exist in the QAS system?',
        delay: 0,
      },
      {
        id: 'sd-2',
        role: 'agent',
        content: `Yes. Automated payment processing is **available in QAS** — but it is only partially configured.\n\nI found a configuration gap that may affect testing.`,
        delay: 1400,
        cardType: 'scenario_discovery',
        cardData: BUSINESS_SCENARIOS[0],
      },
      {
        id: 'sd-3',
        role: 'user',
        content: 'Compare it with PRD.',
        delay: 1800,
      },
      {
        id: 'sd-4',
        role: 'agent',
        content: `Comparison completed between **QAS** and **PRD**.\n\nKey difference: The approval workflow is fully configured for both Company Codes in PRD, but only for Company Code 1000 in QAS.\n\nWould you like me to generate a configuration-validation task?`,
        delay: 1600,
        cardType: 'scenario_comparison',
        cardData: SCENARIO_COMPARISONS[0],
      },
    ] as DemoStep[],
  },
  {
    id: 'security-demo',
    title: 'Security & Governance',
    description: 'Demonstrate authorization refusal and data masking',
    system: 'PRD',
    steps: [
      {
        id: 'sec-1',
        role: 'user',
        content: 'Restart the failed production job immediately.',
        delay: 0,
      },
      {
        id: 'sec-2',
        role: 'agent',
        content: `I cannot restart this production job directly.\n\n**Reason:** Your current role does not include production job administration authority.\n\nI can:\n• Request approval from an authorized administrator\n• Prepare the restart request with the failure analysis\n• Attach the complete investigation summary\n• Notify the responsible support team\n\nAuthorization is evaluated before any write or administrative action is executed.`,
        delay: 1200,
        cardType: 'security_refusal',
      },
      {
        id: 'sec-3',
        role: 'user',
        content: 'Show payroll details for all employees.',
        delay: 1800,
      },
      {
        id: 'sec-4',
        role: 'agent',
        content: `I cannot provide this information.\n\n**Reason:** Employee payroll data contains restricted personal information. Your current access context does not permit this request.\n\nAuthorization is evaluated before data retrieval and before action execution. Sensitive data access requires explicit authorization and is fully audited.`,
        delay: 1200,
        cardType: 'security_refusal',
      },
    ] as DemoStep[],
  },
];

export const SUGGESTED_PROMPTS: Array<{ category: string; prompts: string[] }> = [
  {
    category: 'Batch Jobs',
    prompts: [
      'Show me failed batch jobs in PRD during the last 24 hours.',
      'Analyze ZFI_PAYMENT_POSTING.',
      'Which jobs exceeded their normal runtime today?',
    ],
  },
  {
    category: 'Incidents',
    prompts: [
      'Create a high-priority incident for the failed payment job.',
      'Find similar incidents and their resolutions.',
      'Summarize the top recurring incidents this month.',
    ],
  },
  {
    category: 'Business Scenarios',
    prompts: [
      'Does automated payment processing exist in QAS?',
      'Compare payment configuration between QAS and PRD.',
      'Is the sales-order approval workflow active in QAS?',
    ],
  },
  {
    category: 'Cross-System',
    prompts: [
      'Which interfaces failed today?',
      'Show transports waiting for import.',
      'Prepare a system-health report for the project manager.',
    ],
  },
];
