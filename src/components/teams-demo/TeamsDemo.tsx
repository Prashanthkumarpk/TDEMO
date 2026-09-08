import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, RotateCcw, Play, ChevronDown, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ConversationMessage, SystemEnv } from '@/types';
import { useAppStore } from '@/store/appStore';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { DEMO_SCENARIOS, SUGGESTED_PROMPTS, GUIDED_DEMO_SCENARIO, DEMO_TIMING } from '@/data/conversations';
import { SystemEnvBadge } from '@/components/common/Badge';

const SYSTEMS: Array<SystemEnv | 'ALL'> = ['ALL', 'PRD', 'QAS', 'DEV', 'BW', 'BTP'];

function nowTime(): string {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function genId(): string {
  return Math.random().toString(36).slice(2);
}

export function TeamsDemo() {
  const { selectedSystem, setSelectedSystem, messages, addMessage, clearMessages, isRunningDemo, setIsRunningDemo, setPendingIncidentApproval, incidentApproved, setIncidentApproved } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('batch-jobs');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const demoTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  const clearTimeouts = () => {
    demoTimeouts.current.forEach(clearTimeout);
    demoTimeouts.current = [];
  };

  const handleApproveIncident = useCallback(() => {
    setIncidentApproved(true);
    setPendingIncidentApproval(false);
  }, [setIncidentApproved, setPendingIncidentApproval]);

  const handleCancelIncident = useCallback(() => {
    setPendingIncidentApproval(false);
  }, [setPendingIncidentApproval]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    setShowSuggestions(false);
    const userMsg: ConversationMessage = {
      id: genId(),
      role: 'user',
      content: text.trim(),
      timestamp: nowTime(),
    };
    addMessage(userMsg);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: ConversationMessage = {
        id: genId(),
        role: 'agent',
        content: `I received your request: "${text.trim()}"\n\nTo see the full demonstration, click **Run Guided Demo** or select a scenario from the tabs.`,
        timestamp: nowTime(),
        cardType: 'plain',
      };
      addMessage(agentMsg);
    }, DEMO_TIMING.agentThinkingDelay);
  }, [addMessage]);

  const runGuidedDemo = useCallback(() => {
    clearMessages();
    setIsRunningDemo(true);
    setShowSuggestions(false);
    clearTimeouts();

    const scenario = GUIDED_DEMO_SCENARIO;
    let cumDelay = 0;

    scenario.steps.forEach((step, i) => {
      cumDelay += step.delay + (i > 0 ? DEMO_TIMING.agentThinkingDelay : 0);

      if (step.role === 'user') {
        const t = setTimeout(() => {
          addMessage({
            id: genId(),
            role: 'user',
            content: step.content,
            timestamp: nowTime(),
          });
          if (i < scenario.steps.length - 1) {
            setTimeout(() => setIsTyping(true), 300);
          }
        }, cumDelay);
        demoTimeouts.current.push(t);
      } else {
        const t = setTimeout(() => {
          setIsTyping(false);

          if (step.requiresApproval) {
            setPendingIncidentApproval(true);
          }

          const agentMsgId = genId();
          addMessage({
            id: agentMsgId,
            role: 'agent',
            content: step.content,
            timestamp: nowTime(),
            cardType: step.cardType,
            cardData: step.cardData,
            confidence: step.confidence,
            requiresApproval: step.requiresApproval,
            auditRequired: step.auditRequired,
            isStreaming: false,
          });

          // If this is the approval step, wait for approval before continuing
          if (step.requiresApproval) {
            const approvalCheckInterval = setInterval(() => {
              const approvedNow = useAppStore.getState().incidentApproved;
              if (approvedNow) {
                clearInterval(approvalCheckInterval);
                // Find and run the next step
                const nextStep = scenario.steps[i + 1];
                if (nextStep) {
                  setTimeout(() => {
                    addMessage({
                      id: genId(),
                      role: 'agent',
                      content: nextStep.content,
                      timestamp: nowTime(),
                      cardType: nextStep.cardType,
                      cardData: nextStep.cardData,
                    });
                    setIsRunningDemo(false);
                  }, 1000);
                }
              }
            }, 500);
            demoTimeouts.current.push(approvalCheckInterval as unknown as ReturnType<typeof setTimeout>);
          }
        }, cumDelay);
        demoTimeouts.current.push(t);
      }
    });

    const finalT = setTimeout(() => setIsRunningDemo(false), cumDelay + 2000);
    demoTimeouts.current.push(finalT);
  }, [addMessage, clearMessages, setIsRunningDemo, setPendingIncidentApproval]);

  const runScenario = useCallback((scenarioId: string) => {
    clearMessages();
    setIsRunningDemo(true);
    setShowSuggestions(false);
    clearTimeouts();

    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    let cumDelay = 0;
    scenario.steps.forEach((step, i) => {
      cumDelay += step.delay + (i > 0 ? DEMO_TIMING.agentThinkingDelay : 0);
      if (step.role === 'user') {
        const t = setTimeout(() => {
          addMessage({ id: genId(), role: 'user', content: step.content, timestamp: nowTime() });
          setTimeout(() => setIsTyping(true), 300);
        }, cumDelay);
        demoTimeouts.current.push(t);
      } else {
        const t = setTimeout(() => {
          setIsTyping(false);
          addMessage({
            id: genId(), role: 'agent', content: step.content, timestamp: nowTime(),
            cardType: step.cardType, cardData: step.cardData,
          });
        }, cumDelay);
        demoTimeouts.current.push(t);
      }
    });
    const ft = setTimeout(() => setIsRunningDemo(false), cumDelay + 1000);
    demoTimeouts.current.push(ft);
  }, [addMessage, clearMessages, setIsRunningDemo]);

  const handleReset = () => {
    clearTimeouts();
    clearMessages();
    setIsRunningDemo(false);
    setIsTyping(false);
    setShowSuggestions(true);
    setIncidentApproved(false);
    setPendingIncidentApproval(false);
  };

  useEffect(() => () => clearTimeouts(), []);

  const TABS = [
    { id: 'batch-jobs', label: 'Batch Jobs' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'scenarios', label: 'Business Scenarios' },
    { id: 'security', label: 'Security Demo' },
  ];

  const tabScenarios: Record<string, string> = {
    'batch-jobs': 'guided-demo-main',
    'incidents': 'guided-demo-main',
    'scenarios': 'scenario-discovery',
    'security': 'security-demo',
  };

  return (
    <div className="flex flex-col h-full bg-bg-surface rounded-2xl overflow-hidden border border-border shadow-2xl">
      {/* Header */}
      <div className="bg-bg-surface-light border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <span className="text-xs font-bold text-white">SC</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary flex items-center gap-2">
              SAP Command Center
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
            <div className="text-xs text-text-secondary">Enterprise Agent · All systems connected</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* System selector */}
          <div className="relative">
            <div className="flex items-center gap-1.5 glass px-2 py-1 rounded-lg border border-border cursor-pointer text-xs text-text-secondary">
              <SystemEnvBadge env={selectedSystem === 'ALL' ? 'SOL' : selectedSystem} />
              <span>{selectedSystem}</span>
              <ChevronDown size={11} />
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 glass rounded-lg border border-border text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Reset demo"
            title="Reset demo"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Scenario tabs */}
      <div className="border-b border-border bg-bg-surface">
        <div className="flex overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0" role="log" aria-live="polite" aria-label="Agent conversation">
        {messages.length === 0 && showSuggestions && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary-dark/20 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <p className="text-sm text-text-secondary mb-1">Ask anything about your SAP landscape</p>
              <p className="text-xs text-text-secondary opacity-60">Or run the guided demo to experience the full flow</p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              <button
                onClick={runGuidedDemo}
                disabled={isRunningDemo}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 glow-primary"
              >
                <Play size={14} />
                Run Guided Demo
              </button>
              <button
                onClick={() => runScenario(tabScenarios[activeTab] ?? 'guided-demo-main')}
                disabled={isRunningDemo}
                className="flex items-center gap-2 px-4 py-2 glass border border-border text-text-secondary hover:text-text-primary text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                <MonitorPlay size={14} />
                Run {TABS.find(t => t.id === activeTab)?.label}
              </button>
            </div>

            <div className="space-y-3">
              {SUGGESTED_PROMPTS.slice(0, 2).map(group => (
                <div key={group.category}>
                  <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2 px-1">{group.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.prompts.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(p)}
                        className="text-xs px-3 py-1.5 glass border border-border hover:border-primary/40 text-text-secondary hover:text-text-primary rounded-xl transition-all"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage
                message={msg}
                onApprove={handleApproveIncident}
                onCancel={handleCancelIncident}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 bg-bg-surface-light">
        {messages.length > 0 && !isRunningDemo && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {SUGGESTED_PROMPTS[0].prompts.slice(0, 2).map((p, i) => (
              <button
                key={i}
                onClick={() => sendMessage(p)}
                className="text-xs px-2.5 py-1 glass border border-border hover:border-primary/40 text-text-secondary hover:text-text-primary rounded-full transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your SAP landscape…"
            className="flex-1 bg-bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors"
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={!input.trim() || isRunningDemo}
            className="p-2.5 bg-primary hover:bg-primary-light text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-xs text-text-secondary opacity-60">All actions are governed and audited</span>
          {isRunningDemo && (
            <span className="text-xs text-primary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Demo running…
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
