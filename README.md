# SAP Agentic Command Center (SACC)

**INNOVA SPARK · MSG Global Solutions · TECH INTERRUPT Hackathon**

> One Conversation. Every SAP System. Intelligent Action.

---

## Project Overview

SAP Agentic Command Center is a premium interactive hackathon presentation website that demonstrates how a Microsoft Teams-based enterprise agent can interact with multiple SAP systems through natural language. The website is designed to serve as both a Round 1 presentation and an interactive product demonstration.

---

## Hackathon Information

| Field | Value |
|-------|-------|
| Hackathon | TECH INTERRUPT |
| Category | TI Idea |
| Organization | MSG Global Solutions |
| Team | INNOVA SPARK |
| Product | SAP Agentic Command Center (SACC / INNOVA SAPARK) |

---

## Product Vision

Enable employees, consultants, support teams, developers, functional experts, business users, and system administrators to securely interact with SAP systems through natural-language conversations in Microsoft Teams — making SAP more accessible, responsive, intelligent, and actionable.

---

## Features

- **Immersive 3D hero scene** — animated intelligence core with orbiting SAP system nodes (Three.js via React Three Fiber)
- **Interactive Teams-inspired demo** — realistic chat interface with typing animation, streaming responses, and rich adaptive cards
- **Guided auto-demo** — 8-step automated walkthrough (failed jobs → analysis → incident → approval → created)
- **Rich message cards** — job lists, job analysis with confidence scores, incident drafts, scenario comparisons
- **Human-in-the-loop approval** — incident creation requires explicit user approval
- **Security governance demo** — unauthorized action refusal demonstration
- **Architecture visualization** — interactive layered architecture with expandable component details
- **System landscape 3D scene** — clickable SAP system nodes with status information
- **Presentation Mode** — full-screen cinematic presentation with keyboard navigation, progress bar, speaker notes
- **Business value section** — animated metric cards and value pillars
- **Evolution roadmap** — 5-phase progression from Assist to Autonomous
- **Persona explorer** — 7 user profiles with role-specific agent capabilities
- **Differentiators panel** — Why This Wins section for judges
- **Full responsiveness** — desktop, tablet, and mobile support
- **Accessibility** — keyboard navigation, ARIA labels, prefers-reduced-motion, focus states

---

## Technical Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 5 | Build tool and dev server |
| Tailwind CSS 3 | Utility-first styling |
| Three.js + @react-three/fiber | 3D scenes |
| @react-three/drei | Three.js helpers |
| Framer Motion | Animations and transitions |
| Lucide React | Icon system |
| Zustand | Global state management |

---

## Architecture Summary

```
Experience Layer      Microsoft Teams · Adaptive Cards · Approval Interactions
Agent Layer           NLU · Intent Classification · Conversation Memory · Tool Selection
Orchestration Layer   Dispatcher · Operations · Incident · Scenario · Knowledge · Governance · Action Agents
Integration Layer     SAP BTP · Integration Suite · API Management · Cloud Connector · OData · RFC/BAPI
SAP Landscape         S4D · S4Q · S4P · BWQ · BWP · BTP · ECC · SOL
Security Layer        Entra ID · RBAC · Audit Trail · Approval Workflows · Data Masking
```

---

## Folder Structure

```
src/
  components/
    common/           ErrorBoundary, SectionTitle, Badge
    navigation/       Navbar
    presentation/     PresentationMode
    sections/         Hero, Challenge, Idea, Demo, UseCases, AgenticWorkflow,
                      Architecture, Security, BusinessValue, Personas, WhyMsg, FinalMessage
    teams-demo/       TeamsDemo, ChatMessage, JobCard, IncidentCard, ScenarioCard
    three/            HeroScene, AgenticCore, ParticleField, SystemLandscape
  data/
    architecture.ts   Architecture layer definitions
    batchJobs.ts      SAP batch job mock data
    businessValue.ts  Value pillars, metrics, roadmap, differentiators
    conversations.ts  Demo scenarios and guided demo steps
    incidents.ts      Incident mock data
    personas.ts       User persona definitions
    presentation.ts   Presentation scene definitions
    scenarios.ts      Business scenario mock data
    systems.ts        SAP system mock data
  hooks/
    useReducedMotion.ts
    useIntersectionObserver.ts
    useTypewriter.ts
  store/
    appStore.ts       Zustand global state
  types/
    index.ts          All TypeScript type definitions
  App.tsx
  main.tsx
  index.css
```

---

## Installation

```bash
# Clone or extract the project
cd TDEMO

# Install dependencies (requires Node.js 18+ and npm)
npm install
```

---

## Local Run Commands

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# TypeScript type check
npm run type-check

# Lint
npm run lint
```

The development server starts at **http://localhost:5173** by default.

---

## Presentation Controls

After clicking **Start Presentation** or pressing the button in the hero:

| Key | Action |
|-----|--------|
| `→` or `Space` | Next scene |
| `←` | Previous scene |
| `N` | Toggle speaker notes |
| `Esc` | Exit presentation mode |

The presentation has **12 scenes** covering all major product areas.

---

## Guided Demo Instructions

1. Navigate to the **Demo** section or click **Experience the Demo**
2. Click **Run Guided Demo** to start the automated walkthrough
3. Watch the 8-step flow: failed jobs → analysis → incident creation → approval → created
4. To reset: click the ↺ button in the chat header
5. To run individual scenarios: select a tab (Batch Jobs, Incidents, etc.) and click **Run [Tab Name]**

---

## How to Modify Mock Data

All demo content is controlled by files in `src/data/`:

| File | Controls |
|------|---------|
| `batchJobs.ts` | Failed jobs, job logs, analysis content |
| `incidents.ts` | Incident templates and draft content |
| `scenarios.ts` | Business scenario components and gaps |
| `conversations.ts` | Demo step timing via `DEMO_TIMING` constant |
| `systems.ts` | SAP system names, status, counts |
| `presentation.ts` | Scene headings and speaker notes |

To change demo timing, edit the `DEMO_TIMING` object in `conversations.ts`:

```typescript
export const DEMO_TIMING = {
  userTypingDelay: 800,       // ms before user message appears
  agentThinkingDelay: 1200,   // ms for agent "typing" indicator
  agentStreamingDelay: 60,    // ms per character (not currently used for streaming)
  stepInterval: 500,
  autoAdvanceDelay: 2000,
};
```

---

## How to Change Branding

| Element | Location |
|---------|---------|
| Primary color (#A01441) | `tailwind.config.js` + `src/index.css` CSS variables |
| Team/product names | `src/components/sections/Hero.tsx` |
| Presentation scenes | `src/data/presentation.ts` |
| Final message | `src/components/sections/FinalMessage.tsx` |
| Company strengths | `src/data/businessValue.ts` |

---

## Performance Notes

- Three.js device pixel ratio capped at 1.5× for performance
- Particle count reduced on devices with `prefers-reduced-motion`
- Three.js scenes use `Suspense` boundaries with null fallbacks
- React Three Fiber canvas uses `powerPreference: 'high-performance'`
- Code split: Three.js, Framer Motion, and React into separate chunks

---

## Accessibility Notes

- All interactive elements have `aria-label` attributes
- Color-coded statuses use text labels, not color alone
- `prefers-reduced-motion` reduces 3D animations
- Focus styles visible on all interactive elements
- Keyboard navigation supported throughout (including presentation mode)
- Screen reader friendly section structure with ARIA roles

---

## Future Real-Integration Approach

To connect to real SAP systems, the integration layer would use:

1. **SAP API Hub / BTP Integration Suite** — managed OData/REST APIs
2. **SAP Cloud Connector** — secure tunnel to on-premise systems
3. **Microsoft 365 Agents SDK** — replace simulated chat with real Teams bot
4. **Microsoft Graph** — identity and authorization via Entra ID
5. **SAP Authorization APIs** — validate user permissions before every data request
6. Replace `src/data/*.ts` mock data with real API calls in the agent orchestration layer

---

## Security Considerations

- No real credentials, API keys, or SAP system details are included
- All mock data uses fictional system names, job names, and IDs
- The security refusal demonstration shows the governance model
- In production: Entra ID SSO, SAP authorization propagation, and complete audit trail

---

## Known Limitations

- This is a local simulation — no real SAP or Teams connectivity
- The guided demo uses setTimeout-based timing, not a real streaming API
- The approval flow skips the real incident management system integration
- Three.js scenes may have reduced visual quality on integrated graphics

---

## Demo Disclaimer

All data, system names, job names, incident IDs, configurations, and company information shown in this presentation are entirely fictional and created for demonstration purposes only. No real SAP credentials, customer data, or production system information is included.

---

*INNOVA SPARK · MSG Global Solutions · TECH INTERRUPT Hackathon*
