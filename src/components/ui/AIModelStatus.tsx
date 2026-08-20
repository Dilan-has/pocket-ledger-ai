import React from 'react';
import { useStore } from '../../store/useStore';
import { Cpu, CheckCircle2, Loader2, WifiOff, Brain } from 'lucide-react';

export const AIModelStatus: React.FC = () => {
  const { aiState, aiEngineMode, t } = useStore();

  return (
    <div className="flex items-center gap-3 px-3.5 py-1.5 bg-linen-dim/80 dark:bg-linen-darkDim/90 border border-warm-border/80 dark:border-warm-darkBorder rounded-sahara text-xs text-warm-muted dark:text-warm-darkMuted font-sans">
      <div className="flex items-center gap-1.5">
        {aiEngineMode === 'qwen' ? (
          <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
        ) : (
          <Cpu className="w-3.5 h-3.5 text-sienna dark:text-sienna-darkAccent" />
        )}
        <span className="font-medium text-warm-dark dark:text-warm-darkText hidden sm:inline">
          {t('localAiActive')}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {aiState.status === 'loading' && (
          <>
            <Loader2 className="w-3.5 h-3.5 text-sienna animate-spin" />
            <span className="truncate max-w-[140px] sm:max-w-none">{aiState.message}</span>
          </>
        )}
        {aiState.status === 'processing' && (
          <>
            <Loader2 className="w-3.5 h-3.5 text-sienna animate-spin" />
            <span className="text-sienna dark:text-sienna-darkAccent font-medium">{t('processingExpense')}</span>
          </>
        )}
        {(aiState.status === 'ready' || aiState.status === 'idle') && (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate max-w-[140px] sm:max-w-none font-medium text-warm-dark dark:text-warm-darkText">
              {aiEngineMode === 'qwen' ? t('qwenActive') : t('clientSideActive')}
            </span>
          </>
        )}
      </div>

      <div className="ml-auto hidden lg:flex items-center gap-1 text-[11px] text-warm-muted/80 dark:text-warm-darkMuted/80 border-l border-warm-border dark:border-warm-darkBorder pl-3">
        <WifiOff className="w-3 h-3 text-sienna/80" />
        <span>{t('offlineReady')}</span>
      </div>
    </div>
  );
};
