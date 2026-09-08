import type { BusinessScenario, ScenarioComparison } from '@/types';

export const BUSINESS_SCENARIOS: BusinessScenario[] = [
  {
    id: 'SCEN001',
    name: 'Automated Payment Processing',
    module: 'Finance (FI)',
    description: 'End-to-end automated payment processing including proposal creation, approval workflow, payment document posting, and bank file generation.',
    systems: {
      DEV: 'fully_configured',
      QAS: 'partially_configured',
      PRD: 'fully_configured',
      BW: 'unknown',
      BTP: 'not_configured',
      ECC: 'fully_configured',
      SOL: 'unknown',
    },
    components: [
      { name: 'Payment Proposal Job (F110)', type: 'job', status: 'fully_configured', description: 'Scheduled daily job for payment proposal creation' },
      { name: 'Payment Posting Job', type: 'job', status: 'fully_configured', description: 'Automated posting of approved payment documents' },
      { name: 'Approval Workflow', type: 'workflow', status: 'partially_configured', description: 'Active for CC1000, missing for CC2000 in QAS' },
      { name: 'Bank File Generation Interface', type: 'interface', status: 'fully_configured', description: 'DMEE-based bank file generation' },
      { name: 'Finance Support Runbook', type: 'document', status: 'fully_configured', description: 'Step-by-step resolution guide' },
      { name: 'Payment Configuration Objects', type: 'config', status: 'partially_configured', description: 'Company code 2000 setup incomplete in QAS' },
    ],
    gaps: [
      {
        system: 'QAS',
        description: 'Approval workflow not configured for Company Code 2000',
        severity: 'critical',
        recommendation: 'Copy approval workflow configuration from Company Code 1000 and adapt for CC2000 in QAS',
      },
    ],
    relatedDocumentation: ['FI-Payment-Runbook-v3.pdf', 'Payment-Config-Guide.pdf'],
  },
  {
    id: 'SCEN002',
    name: 'Sales Order Processing',
    module: 'Sales & Distribution (SD)',
    description: 'Complete sales order lifecycle from creation through delivery, goods issue, and billing.',
    systems: {
      DEV: 'fully_configured',
      QAS: 'fully_configured',
      PRD: 'fully_configured',
      BW: 'fully_configured',
      BTP: 'not_configured',
      ECC: 'not_configured',
      SOL: 'unknown',
    },
    components: [
      { name: 'Order Entry (VA01)', type: 'service', status: 'fully_configured' },
      { name: 'Credit Check Workflow', type: 'workflow', status: 'fully_configured' },
      { name: 'Delivery Processing (VL01N)', type: 'service', status: 'fully_configured' },
      { name: 'Billing Run Job', type: 'job', status: 'fully_configured' },
      { name: 'OData Service for Order Status', type: 'service', status: 'fully_configured', description: 'API_SALESORDER_SRV active in all systems' },
    ],
    gaps: [],
    relatedDocumentation: ['SD-Process-Guide.pdf'],
  },
  {
    id: 'SCEN003',
    name: 'Material Requirements Planning',
    module: 'Materials Management (MM/PP)',
    description: 'Automated MRP runs, purchase order creation, and goods receipt processing.',
    systems: {
      DEV: 'fully_configured',
      QAS: 'partially_configured',
      PRD: 'fully_configured',
      BW: 'not_configured',
      BTP: 'not_configured',
      ECC: 'fully_configured',
      SOL: 'unknown',
    },
    components: [
      { name: 'MRP Planning Run Job', type: 'job', status: 'fully_configured' },
      { name: 'Purchase Order Auto-Creation', type: 'workflow', status: 'partially_configured' },
      { name: 'Goods Receipt Automation', type: 'job', status: 'partially_configured' },
      { name: 'Vendor Confirmation Interface', type: 'interface', status: 'fully_configured' },
    ],
    gaps: [
      {
        system: 'QAS',
        description: 'Plant DE01 not extended for automatic purchase order creation',
        severity: 'medium',
        recommendation: 'Extend material master data for plant DE01 in QAS',
      },
    ],
  },
];

export const SCENARIO_COMPARISONS: ScenarioComparison[] = [
  {
    scenarioId: 'SCEN001',
    systemA: 'PRD',
    systemB: 'QAS',
    statusA: 'fully_configured',
    statusB: 'partially_configured',
    differences: [
      'PRD: Approval workflow active for Company Codes 1000 and 2000',
      'QAS: Approval workflow active only for Company Code 1000',
      'QAS: Missing FI_APPROVAL_WF configuration for Company Code 2000',
      'PRD: Bank file generation tested and validated',
      'QAS: Bank file generation configured but not fully validated for CC2000',
    ],
    recommendation: 'Create a configuration-validation task and assign to the Finance functional team to replicate CC2000 workflow configuration from PRD to QAS.',
  },
];
