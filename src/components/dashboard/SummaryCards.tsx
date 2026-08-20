import React from 'react';
import { Card } from '../ui/Card';
import { type Transaction } from '../../db/database';
import { TrendingDown, TrendingUp, Wallet, PieChart } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions }) => {
  const { t, formatCurrency } = useStore();

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Find top category
  const categoryTotals: Record<string, number> = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  let topCategoryKey = 'none';
  let maxCatAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > maxCatAmount) {
      maxCatAmount = amt;
      topCategoryKey = cat;
    }
  });

  const translatedTopCategory = topCategoryKey === 'none' 
    ? t('none') 
    : (t(`categories.${topCategoryKey}`) || topCategoryKey);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {/* Total Expenses */}
      <Card padding="normal" className="border-l-4 border-l-rose">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-warm-muted dark:text-warm-darkMuted font-sans">
            {t('totalExpenses')}
          </span>
          <div className="w-8 h-8 rounded-full bg-rose-light dark:bg-rose-darkLight flex items-center justify-center text-rose">
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-warm-dark dark:text-warm-darkText">
            {formatCurrency(totalExpense)}
          </h3>
          <p className="text-xs text-warm-muted dark:text-warm-darkMuted mt-1 font-sans">
            {transactions.filter(t => t.type === 'expense').length} {t('transactionsLogged')}
          </p>
        </div>
      </Card>

      {/* Total Income */}
      <Card padding="normal" className="border-l-4 border-l-emerald-600">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-warm-muted dark:text-warm-darkMuted font-sans">
            {t('totalIncome')}
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-warm-dark dark:text-warm-darkText">
            {formatCurrency(totalIncome)}
          </h3>
          <p className="text-xs text-warm-muted dark:text-warm-darkMuted mt-1 font-sans">
            {transactions.filter(t => t.type === 'income').length} {t('depositsLogged')}
          </p>
        </div>
      </Card>

      {/* Net Balance */}
      <Card padding="normal" className="border-l-4 border-l-sienna">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-warm-muted dark:text-warm-darkMuted font-sans">
            {t('netSavings')}
          </span>
          <div className="w-8 h-8 rounded-full bg-sienna-light dark:bg-sienna-darkLight flex items-center justify-center text-sienna dark:text-sienna-darkAccent">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className={`text-2xl sm:text-3xl font-serif font-bold ${netBalance >= 0 ? 'text-warm-dark dark:text-warm-darkText' : 'text-rose'}`}>
            {formatCurrency(netBalance)}
          </h3>
          <p className="text-xs text-warm-muted dark:text-warm-darkMuted mt-1 font-sans">
            {netBalance >= 0 ? t('positiveBalance') : t('deficit')}
          </p>
        </div>
      </Card>

      {/* Top Spending Category */}
      <Card padding="normal" className="border-l-4 border-l-amber-600">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-warm-muted dark:text-warm-darkMuted font-sans">
            {t('topSpending')}
          </span>
          <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400">
            <PieChart className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-warm-dark dark:text-warm-darkText truncate">
            {translatedTopCategory}
          </h3>
          <p className="text-xs text-warm-muted dark:text-warm-darkMuted mt-1 font-sans">
            {formatCurrency(maxCatAmount)} {t('total')}
          </p>
        </div>
      </Card>
    </div>
  );
};
