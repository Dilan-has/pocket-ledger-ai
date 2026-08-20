import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

interface ExpenseChatInputProps {
  onParseAndAdd: (rawText: string) => Promise<void>;
  isProcessing: boolean;
}

export const ExpenseChatInput: React.FC<ExpenseChatInputProps> = ({
  onParseAndAdd,
  isProcessing
}) => {
  const { t } = useStore();
  const [text, setText] = useState('');

  const samplePrompts: string[] = t('samplePrompts') || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isProcessing) return;
    await onParseAndAdd(text);
    setText('');
  };

  return (
    <div className="bg-white dark:bg-linen-darkCard rounded-sahara border border-warm-border/80 dark:border-warm-darkBorder shadow-sahara dark:shadow-sahara-dark p-6 sm:p-8 space-y-4 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sienna" />
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-warm-dark dark:text-warm-darkText">
            {t('naturalInputTitle')}
          </h2>
        </div>
        <span className="text-xs text-warm-muted dark:text-warm-darkMuted uppercase tracking-wider font-sans hidden sm:inline">
          {t('slmPowered')}
        </span>
      </div>

      <p className="text-sm text-warm-muted dark:text-warm-darkMuted font-sans leading-relaxed">
        {t('naturalInputDesc')}
      </p>

      <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3 pt-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('inputPlaceholder')}
            className="w-full bg-linen/50 dark:bg-linen-darkBg border border-warm-border dark:border-warm-darkBorder rounded-sahara px-4 py-3.5 text-warm-dark dark:text-warm-darkText placeholder:text-warm-muted/50 dark:placeholder:text-warm-darkMuted/50 text-sm font-sans focus:outline-none focus:border-sienna focus:bg-white dark:focus:bg-linen-darkCard focus:ring-1 focus:ring-sienna transition-all"
            disabled={isProcessing}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!text.trim() || isProcessing}
          className="whitespace-nowrap flex items-center justify-center gap-2 shadow-sm"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t('analyzing')}</span>
            </>
          ) : (
            <>
              <span>{t('logExpense')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Quick Prompts */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-warm-muted dark:text-warm-darkMuted font-sans">
            {t('tryExample')}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setText(prompt)}
              className="text-xs font-sans bg-linen dark:bg-linen-darkDim text-warm-dark/80 dark:text-warm-darkText/80 hover:text-sienna dark:hover:text-sienna-light hover:bg-sienna-light/50 dark:hover:bg-sienna-darkLight border border-warm-border/60 dark:border-warm-darkBorder px-3 py-1.5 rounded-full transition-all text-left"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
