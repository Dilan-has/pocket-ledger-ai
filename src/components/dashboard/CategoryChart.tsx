import React from 'react';
import { type Transaction } from '../../db/database';
import { Card } from '../ui/Card';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface CategoryChartProps {
  transactions: Transaction[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ transactions }) => {
  const { t, formatCurrency } = useStore();

  const expenseTx = transactions.filter(tItem => tItem.type === 'expense');
  const totalExpense = expenseTx.reduce((sum, tItem) => sum + tItem.amount, 0);

  // Group by category
  const categoriesMap: Record<string, number> = {};
  expenseTx.forEach(tItem => {
    categoriesMap[tItem.category] = (categoriesMap[tItem.category] || 0) + tItem.amount;
  });

  const sortedCategories = Object.entries(categoriesMap)
    .sort(([, a], [, b]) => b - a);

  const colors = [
    'bg-sienna text-sienna',
    'bg-rose text-rose',
    'bg-amber-600 text-amber-600',
    'bg-stone-600 text-stone-600',
    'bg-orange-600 text-orange-600',
    'bg-purple-600 text-purple-600',
  ];

  return (
    <Card padding="generous" className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-sienna dark:text-sienna-darkAccent" />
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-warm-dark dark:text-warm-darkText">
            {t('categoryBreakdown')}
          </h2>
        </div>
        <span className="text-xs text-warm-muted dark:text-warm-darkMuted font-sans">
          {t('expenseShare')}
        </span>
      </div>

      {sortedCategories.length === 0 ? (
        <p className="text-xs text-warm-muted dark:text-warm-darkMuted font-serif italic text-center py-6">
          {t('noExpensesYet')}
        </p>
      ) : (
        <div className="space-y-4 pt-2">
          {sortedCategories.map(([categoryKey, amount], idx) => {
            const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
            const barColor = colors[idx % colors.length].split(' ')[0];
            const translatedCat = t(`categories.${categoryKey}`) || categoryKey;

            return (
              <div key={categoryKey} className="space-y-1.5 font-sans">
                <div className="flex justify-between text-xs font-medium text-warm-dark dark:text-warm-darkText">
                  <span>{translatedCat}</span>
                  <span className="font-serif font-bold text-sm">
                    {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-linen-dim dark:bg-linen-darkBg rounded-full h-2.5 overflow-hidden border border-warm-border/30 dark:border-warm-darkBorder/30">
                  <div
                    className={`h-full ${barColor} transition-all duration-500 rounded-full`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
