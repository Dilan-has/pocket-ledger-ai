import React, { useEffect, useRef, useState } from 'react';
import { useStore } from './store/useStore';
import { AIModelStatus } from './components/ui/AIModelStatus';
import { ExpenseChatInput } from './components/chat/ExpenseChatInput';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { TransactionList } from './components/dashboard/TransactionList';
import { CategoryChart } from './components/dashboard/CategoryChart';
import { ShieldCheck, Sparkles, Sun, Moon, Globe, Coins, Brain, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const {
    transactions,
    userCorrections,
    fetchTransactions,
    addTransaction,
    addTransactionsBulk,
    deleteTransaction,
    setAIState,
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    currency,
    setCurrency,
    aiEngineMode,
    setAIEngineMode,
    t
  } = useStore();

  const workerRef = useRef<Worker | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize DB and Web Worker
  useEffect(() => {
    fetchTransactions();

    try {
      const aiWorker = new Worker(new URL('./workers/ai.worker.ts', import.meta.url), {
        type: 'module'
      });

      aiWorker.onmessage = (event: MessageEvent) => {
        const { type, status, progress, message, result, results } = event.data;

        if (type === 'STATUS') {
          setAIState({ status, progress: progress || 0, message: message || '' });
        }

        if (type === 'EXPENSE_PARSED_MULTI' && results && results.length > 0) {
          addTransactionsBulk(results.map((r: any) => ({
            amount: r.amount,
            category: r.category,
            description: r.description,
            date: r.date,
            type: r.type,
            rawInput: r.rawInput || '',
            isAiParsed: true,
            isUserLearned: r.isUserLearned,
            reasoning: r.reasoning
          })));
          setIsProcessing(false);
        } else if (type === 'EXPENSE_PARSED' && result) {
          addTransaction({
            amount: result.amount,
            category: result.category,
            description: result.description,
            date: result.date,
            type: result.type,
            rawInput: result.rawInput || '',
            isAiParsed: true,
            isUserLearned: result.isUserLearned,
            reasoning: result.reasoning
          });
          setIsProcessing(false);
        }
      };

      aiWorker.postMessage({ type: 'INIT_MODEL', mode: aiEngineMode, userCorrections });
      workerRef.current = aiWorker;
    } catch (err) {
      console.error('Failed to create Web Worker:', err);
      setAIState({ status: 'ready', message: 'Fast Rule-Based Engine Active' });
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, [aiEngineMode]);

  // Sync user corrections to Web Worker when userCorrections state changes
  useEffect(() => {
    if (workerRef.current && userCorrections) {
      workerRef.current.postMessage({
        type: 'SYNC_USER_CORRECTIONS',
        userCorrections
      });
    }
  }, [userCorrections]);

  const handleParseAndAdd = async (text: string) => {
    setIsProcessing(true);
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: 'PARSE_EXPENSE',
        text,
        mode: aiEngineMode,
        id: Date.now()
      });
    } else {
      await addTransaction({
        amount: 10,
        category: 'Shopping',
        description: text,
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        rawInput: text,
        isAiParsed: false
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-linen dark:bg-linen-darkBg text-warm-dark dark:text-warm-darkText flex flex-col font-sans selection:bg-sienna-light dark:selection:bg-sienna-darkLight selection:text-sienna dark:selection:text-sienna-darkAccent transition-colors duration-300">
      {/* Editorial Header */}
      <header className="border-b border-warm-border/60 dark:border-warm-darkBorder bg-white/80 dark:bg-linen-darkCard/90 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sahara bg-sienna dark:bg-sienna-darkAccent flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-dark dark:text-warm-darkText tracking-tight">
                PocketLedger <span className="italic text-sienna dark:text-sienna-darkAccent">AI</span>
              </h1>
              <p className="text-[11px] text-warm-muted dark:text-warm-darkMuted uppercase tracking-widest font-sans font-semibold">
                {t('appSubtitle')}
              </p>
            </div>
          </div>

          {/* Controls: AI Engine Selector, Currency, Language, Dark Mode, AI Status */}
          <div className="flex flex-wrap items-center gap-2">
            {/* AI Engine Mode Toggle Button */}
            <button
              onClick={() => setAIEngineMode(aiEngineMode === 'fast' ? 'qwen' : 'fast')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sahara text-xs font-medium font-sans border transition-all ${
                aiEngineMode === 'qwen'
                  ? 'bg-purple-900/10 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700/80 shadow-xs font-semibold'
                  : 'bg-linen dark:bg-linen-darkDim text-warm-dark dark:text-warm-darkText hover:bg-linen-dim dark:hover:bg-linen-darkHover border-warm-border/80 dark:border-warm-darkBorder'
              }`}
              title="Cambiar Motor de IA / Switch AI Engine"
            >
              {aiEngineMode === 'qwen' ? (
                <>
                  <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>{t('qwenMode')}</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('fastMode')}</span>
                </>
              )}
            </button>

            {/* Currency Switcher Button (COP / USD) */}
            <button
              onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sahara bg-linen dark:bg-linen-darkDim text-warm-dark dark:text-warm-darkText hover:bg-linen-dim dark:hover:bg-linen-darkHover border border-warm-border/80 dark:border-warm-darkBorder text-xs font-medium font-sans transition-all"
              title="Cambiar Moneda / Change Currency"
            >
              <Coins className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">{currency}</span>
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sahara bg-linen dark:bg-linen-darkDim text-warm-dark dark:text-warm-darkText hover:bg-linen-dim dark:hover:bg-linen-darkHover border border-warm-border/80 dark:border-warm-darkBorder text-xs font-medium font-sans transition-all"
              title="Cambiar idioma / Change language"
            >
              <Globe className="w-3.5 h-3.5 text-sienna dark:text-sienna-darkAccent" />
              <span className="font-semibold uppercase">{language}</span>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-sahara bg-linen dark:bg-linen-darkDim text-warm-dark dark:text-warm-darkText hover:bg-linen-dim dark:hover:bg-linen-darkHover border border-warm-border/80 dark:border-warm-darkBorder text-xs transition-all"
              title={darkMode ? t('lightMode') : t('darkMode')}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-warm-muted" />
              )}
            </button>

            {/* AI Model Status */}
            <AIModelStatus />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Natural Language AI Input */}
        <section>
          <ExpenseChatInput
            onParseAndAdd={handleParseAndAdd}
            isProcessing={isProcessing}
          />
        </section>

        {/* Financial Summary Cards */}
        <section>
          <SummaryCards transactions={transactions} />
        </section>

        {/* Dashboard Grid: Category Breakdown Chart + Ledger */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CategoryChart transactions={transactions} />
          </div>
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </div>
        </section>
      </main>

      {/* Warm Minimalist Footer */}
      <footer className="border-t border-warm-border/60 dark:border-warm-darkBorder bg-white/40 dark:bg-linen-darkCard/50 py-6 mt-12 text-center text-xs text-warm-muted dark:text-warm-darkMuted font-sans transition-colors">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t('footerTitle')}</span>
          <span className="font-serif italic text-warm-muted/80 dark:text-warm-darkMuted/80">
            {t('footerSubtitle')}
          </span>
        </div>
      </footer>
    </div>
  );
};
