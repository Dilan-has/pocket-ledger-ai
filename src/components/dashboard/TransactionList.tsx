import React, { useState } from 'react';
import { type Transaction, DEFAULT_CATEGORIES } from '../../db/database';
import { Badge } from '../ui/Badge';
import { Search, Trash2, Sparkles, Filter, Calendar, Info, GraduationCap, Edit2, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete
}) => {
  const { filterCategory, setFilterCategory, searchQuery, setSearchQuery, t, formatCurrency, updateTransactionCategoryAndType } = useStore();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState<string>('');
  const [editType, setEditType] = useState<'expense' | 'income'>('expense');

  const categories = ['All', ...DEFAULT_CATEGORIES.map(c => c.name)];

  const filteredTransactions = transactions.filter(tItem => {
    const matchesCategory = filterCategory === 'All' || tItem.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      tItem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tItem.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tItem.rawInput && tItem.rawInput.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeVariant = (categoryName: string) => {
    switch (categoryName) {
      case 'Food & Dining': return 'sienna';
      case 'Income': return 'success';
      case 'Shopping': return 'rose';
      default: return 'linen';
    }
  };

  const handleStartEdit = (item: Transaction) => {
    if (!item.id) return;
    setEditingId(item.id);
    setEditCategory(item.category);
    setEditType(item.type);
  };

  const handleSaveEdit = async (id: number) => {
    await updateTransactionCategoryAndType(id, editCategory, editType);
    setEditingId(null);
  };

  return (
    <div className="bg-white dark:bg-linen-darkCard rounded-sahara border border-warm-border/80 dark:border-warm-darkBorder shadow-sahara dark:shadow-sahara-dark p-6 sm:p-8 space-y-6 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-warm-dark dark:text-warm-darkText">
            {t('ledgerTitle')}
          </h2>
          <p className="text-xs text-warm-muted dark:text-warm-darkMuted font-sans mt-0.5">
            {t('ledgerSubtitle')}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-warm-muted dark:text-warm-darkMuted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-linen/50 dark:bg-linen-darkBg border border-warm-border dark:border-warm-darkBorder rounded-sahara pl-9 pr-3 py-1.5 text-xs text-warm-dark dark:text-warm-darkText font-sans focus:outline-none focus:border-sienna focus:bg-white dark:focus:bg-linen-darkCard"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <Filter className="w-3.5 h-3.5 text-warm-muted dark:text-warm-darkMuted flex-shrink-0" />
        {categories.map((catKey) => {
          const displayLabel = catKey === 'All'
            ? t('allCategories')
            : (t(`categories.${catKey}`) || catKey);

          return (
            <button
              key={catKey}
              onClick={() => setFilterCategory(catKey)}
              className={`px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all ${
                filterCategory === catKey
                  ? 'bg-sienna text-white shadow-xs font-medium'
                  : 'bg-linen dark:bg-linen-darkDim hover:bg-linen-dim dark:hover:bg-linen-darkHover text-warm-dark dark:text-warm-darkText border border-warm-border/50 dark:border-warm-darkBorder'
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Transactions Table / List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-warm-border dark:border-warm-darkBorder rounded-sahara bg-linen/30 dark:bg-linen-darkBg/30">
          <p className="text-sm font-serif text-warm-muted dark:text-warm-darkMuted italic">
            {t('noTransactions')}
          </p>
          <p className="text-xs text-warm-muted/70 dark:text-warm-darkMuted/70 font-sans mt-1">
            {t('tryLogging')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((item) => (
            <div
              key={item.id}
              className="flex flex-col p-4 rounded-sahara bg-linen/30 dark:bg-linen-darkDim/40 hover:bg-linen-dim/60 dark:hover:bg-linen-darkHover border border-warm-border/40 dark:border-warm-darkBorder/40 transition-all group gap-2"
            >
              <div className="flex items-center justify-between min-w-0">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-semibold text-warm-dark dark:text-warm-darkText truncate">
                        {item.description}
                      </span>
                      
                      {item.isUserLearned && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-1.5 py-0.5 rounded font-sans border border-purple-200 dark:border-purple-800" title="Aprendido por corrección previa del usuario">
                          <GraduationCap className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          Aprendido por tu IA
                        </span>
                      )}

                      {item.isAiParsed && !item.isUserLearned && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-sienna dark:text-sienna-darkAccent bg-sienna-light/80 dark:bg-sienna-darkLight px-1.5 py-0.5 rounded font-sans" title={t('aiParsedTooltip')}>
                          <Sparkles className="w-2.5 h-2.5" />
                          AI SLM
                        </span>
                      )}
                    </div>

                    {/* Category & Date / Inline Editor */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-sans">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 bg-white dark:bg-linen-darkCard p-1.5 rounded border border-sienna shadow-xs">
                          {/* Category Selector */}
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="bg-linen dark:bg-linen-darkBg text-warm-dark dark:text-warm-darkText text-xs rounded px-2 py-1 border border-warm-border dark:border-warm-darkBorder"
                          >
                            {DEFAULT_CATEGORIES.map(c => (
                              <option key={c.name} value={c.name}>
                                {t(`categories.${c.name}`) || c.name}
                              </option>
                            ))}
                          </select>

                          {/* Type Selector */}
                          <select
                            value={editType}
                            onChange={(e) => setEditType(e.target.value as 'expense' | 'income')}
                            className="bg-linen dark:bg-linen-darkBg text-warm-dark dark:text-warm-darkText text-xs rounded px-2 py-1 border border-warm-border dark:border-warm-darkBorder"
                          >
                            <option value="expense">Gasto (-)</option>
                            <option value="income">Ingreso (+)</option>
                          </select>

                          <button
                            onClick={() => handleSaveEdit(item.id!)}
                            className="p-1 rounded bg-sienna text-white hover:bg-sienna-hover"
                            title="Guardar y enseñar a la IA"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Badge variant={getCategoryBadgeVariant(item.category)}>
                            {t(`categories.${item.category}`) || item.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-warm-muted dark:text-warm-darkMuted">
                            <Calendar className="w-3 h-3 text-warm-muted/70 dark:text-warm-darkMuted/70" />
                            {item.date}
                          </span>
                          
                          {/* Edit button to trigger learning correction */}
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-sienna hover:underline flex items-center gap-1 ml-1"
                            title="Corregir categoría/tipo y enseñar a la IA"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Enseñar a la IA</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`font-serif text-lg font-bold ${
                    item.type === 'income' ? 'text-emerald-700 dark:text-emerald-400' : 'text-warm-dark dark:text-warm-darkText'
                  }`}>
                    {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                  </span>
                  {item.id && (
                    <button
                      onClick={() => onDelete(item.id!)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-warm-muted hover:text-rose hover:bg-rose-light/50 dark:hover:bg-rose-darkLight rounded-sahara"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* AI Reasoning Explanation */}
              {item.reasoning && (
                <div className="flex items-start gap-1.5 pt-1 text-[11px] font-sans text-warm-muted dark:text-warm-darkMuted border-t border-warm-border/20 dark:border-warm-darkBorder/20">
                  <Info className="w-3 h-3 text-sienna dark:text-sienna-darkAccent flex-shrink-0 mt-0.5" />
                  <span className="italic">{item.reasoning}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
