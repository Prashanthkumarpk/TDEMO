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
  // FSRI scenario appended below after its declaration
];

const FSRI_DEMO_SCENARIO: DemoScenario = {
  id: 'fsri-reinsurance',
  title: 'FS-RI Reinsurance Intelligence',
  description: 'Treaty structures, job monitoring, posting analysis, and domain explanations for Pacific Life',
  system: 'PRD',
  steps: [
    {
      id: 'fsri-1-user',
      role: 'user',
      content: 'Give me the structural characteristics for the treaty 1634103',
      delay: 0,
    },
    {
      id: 'fsri-2-agent',
      role: 'agent',
      content: `📄 **Treaty 1634103: Structural Characteristics**\n\n🏛️ System / Client    T30 / 800\n📑 Type               Non-life proportional assumed treaty\n🧩 Sections           1 (Surplus)\n🔥 Class of business   113 – Fire\n🌍 Area               DE – Germany\n🤝 Business type       10 – Direct\n💶 Currency           EUR\n📅 Accounting mode    OYTTY – Treaty based on Occurrence Year`,
      delay: 1200,
    },
    {
      id: 'fsri-3-user',
      role: 'user',
      content: 'Provide me with the list of background jobs run yesterday with their statuses',
      delay: 1800,
    },
    {
      id: 'fsri-4-agent',
      role: 'agent',
      content: `⚙️ **Background Job Overview**\n🖥️ System: MGSS81A  |  👤 Executed by: MSGBASIS  |  🔁 Job: /BDL/TASK_PROCESSOR\n\nJob Count    Start       Duration   Status\n─────────────────────────────────────────\n00533804     01:53:38    0 s        ✅ Finished\n01533804     02:53:38    0 s        ✅ Finished\n02533807     03:53:38    0 s        ✅ Finished\n03533806     04:53:38    0 s        ✅ Finished\n04533804     05:53:38    0 s        ✅ Finished\n05533805     06:53:38    0 s        ✅ Finished\n06533803     07:53:38    0 s        ✅ Finished\n0753380N     08:53:38    0 s        ✅ Finished\n08533805     09:53:38    0 s        ✅ Finished\n09533807     10:53:38    0 s        ✅ Finished\n\n📌 10 runs, all completed successfully. The job runs hourly and nothing needs attention.`,
      delay: 1400,
    },
    {
      id: 'fsri-5-user',
      role: 'user',
      content: 'Give job logs for the failed batch jobs',
      delay: 1800,
    },
    {
      id: 'fsri-6-agent',
      role: 'agent',
      content: `🚨 **Job: /1DH/CDC_SYSTEM_START**  |  👤 DDIC  |  🖥️ T30\n\nJob Count    Date      Start       Duration   Status\n──────────────────────────────────────────────────\n07340700     15 May    08:03:14    0 s        ✅ Finished\n07340800     15 May    08:03:14    0 s        ✅ Finished\n08031400     09 Jun    10:33:35    1 s        ✅ Finished\n08031401     09 Jun    10:33:35    1 s        ✅ Finished\n10333500     10 Jun    18:19:37    1 s        ✅ Finished\n10333501     10 Jun    18:19:37    1 s        ✅ Finished\n18193700     11 Jun    19:27:43    1 s        ✅ Finished\n18193701     11 Jun    19:27:43    1 s        ✅ Finished\n19274300     16 Jun    21:21:38    0 s        ✅ Finished\n19274301     16 Jun    21:21:39    0 s        ✅ Finished`,
      delay: 1400,
    },
    {
      id: 'fsri-7-user',
      role: 'user',
      content: 'Analyse the job log, why did this happen? (job ZSRT_KAR, count 22321700)',
      delay: 1800,
    },
    {
      id: 'fsri-8-agent',
      role: 'agent',
      content: `🔍 **Job Log Review**\n\n🏷️ Job / System: ZSRT_KAR, count 22321700, MGSS81A\n📊 Status: ✅ Finished\n\n📝 **Key log findings:**\n🟢 22:32:20  Job started\n🟢 22:32:20  Step 001 started (program ZSRT_KAR, variant &0000000000103, user MADAVANK)\n🟢 22:34:03  Job finished\n\n🧠 **Likely cause:** No error was logged. The job ran as a normal execution and took about 1 min 43 s.\n\n💼 Business impact: None identified.\n🛠️ Next steps: No action needed. If you expected a failure, check the spool output of step 001.\n👥 Escalation owner: None required.`,
      delay: 1600,
      auditRequired: true,
    },
    {
      id: 'fsri-9-user',
      role: 'user',
      content: 'How many accounts with OS posting (entry code 5030) have been released by the user Prasanth today?',
      delay: 1800,
    },
    {
      id: 'fsri-10-agent',
      role: 'agent',
      content: `📬 **OS Posting Release Summary**\n\n👤 Released by:        Prasanth\n🔖 Entry code:         5030 (OS posting)\n✅ Total released:     34 accounts\n⏳ In batch_release:   6 accounts`,
      delay: 1200,
    },
    {
      id: 'fsri-11-user',
      role: 'user',
      content: 'List the flexible criteria allotted in the PTF treaty with name MR test PTF Treaty*',
      delay: 1800,
    },
    {
      id: 'fsri-12-agent',
      role: 'agent',
      content: `🌪️ **Flexible Criteria Overview**\n\n📑 Treaty:          MR test PTF Treaty\n🔢 Treaty number:   2618699\n🧭 Flexible criteria: **FLOODSTORM** (the only one set up)\n\n💬 Let me know if you'd like to add or modify flexible criteria for this treaty.`,
      delay: 1200,
    },
    {
      id: 'fsri-13-user',
      role: 'user',
      content: 'Can you please explain how profit commission with carry forward works?',
      delay: 1800,
    },
    {
      id: 'fsri-14-agent',
      role: 'agent',
      content: `💰 **Profit Commission with Carry Forward**\n\nThe reinsurer pays profit commission to the cedent only after previous years' losses have been recovered.\n\n📊 Example at a 20% commission rate:\n\nYear    Result               Effect\n──────────────────────────────────────────────────\n2024    Loss of ₹65,000      Carried forward\n2025    Loss of ₹65,000      Total deficit: ₹1,30,000\n2026    Profit of ₹1,80,000  ₹1,80,000 − ₹1,30,000 = ₹50,000 commissionable\n\n🔑 **Key point:** Previous losses must be recovered before any profit commission is paid. With "Until Extinction", the deficit carries forward until fully recovered.\n\n20% × ₹50,000 = **₹10,000 profit commission payable in 2026**.`,
      delay: 1600,
    },
    {
      id: 'fsri-15-user',
      role: 'user',
      content: 'Explain like I am 5',
      delay: 1800,
    },
    {
      id: 'fsri-16-agent',
      role: 'agent',
      content: `🍋 **The Lemonade Shop Version**\n\nImagine you run a lemonade shop and share profits with a helper (the reinsurer).\n\n😕 **Year 1:** You lose ₹100 — no profit to share yet, loss carried forward.\n😟 **Year 2:** You lose another ₹50 — total old losses are now ₹150.\n🎉 **Year 3:** You earn ₹200 profit!\n\nFirst you pay back the old losses:\n₹200 − ₹150 = **₹50 left over**\nYour helper's share: 20% × ₹50 = **₹10 commission**\n\n💡 **Simple rule:** Earn money → pay back old losses first → share what's left.\n\n"Carry forward" just means remembering the old losses and bringing them into next year until they're fully paid off.`,
      delay: 1400,
    },
  ] as DemoStep[],
};

DEMO_SCENARIOS.push(FSRI_DEMO_SCENARIO);

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
