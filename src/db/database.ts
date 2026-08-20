import Dexie, { type Table } from 'dexie';

export interface Transaction {
  id?: number;
  amount: number;
  category: string;
  description: string;
  date: string; // YYYY-MM-DD
  rawInput?: string;
  isAiParsed?: boolean;
  isUserLearned?: boolean;
  type: 'expense' | 'income';
  createdAt: number;
  reasoning?: string;
}

export interface CategoryBudget {
  id?: number;
  category: string;
  monthlyLimit: number;
}

export interface UserCorrection {
  id?: number;
  rawInput: string;
  keywords: string[];
  correctedCategory: string;
  correctedType: 'expense' | 'income';
  createdAt: number;
}

export class PocketLedgerDB extends Dexie {
  transactions!: Table<Transaction>;
  budgets!: Table<CategoryBudget>;
  userCorrections!: Table<UserCorrection>;

  constructor() {
    super('PocketLedgerDB');
    this.version(1).stores({
      transactions: '++id, date, category, amount, type, createdAt',
      budgets: '++id, &category'
    });
    this.version(2).stores({
      transactions: '++id, date, category, amount, type, createdAt',
      budgets: '++id, &category',
      userCorrections: '++id, rawInput, correctedCategory, correctedType, createdAt'
    });
  }
}

export const db = new PocketLedgerDB();

// Predefined default categories with associated Sahara-inspired color badges and icons
export const DEFAULT_CATEGORIES = [
  { name: 'Food & Dining', icon: 'Utensils', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { name: 'Transportation', icon: 'Car', color: 'bg-stone-100 text-stone-800 border-stone-200' },
  { name: 'Shopping', icon: 'ShoppingBag', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { name: 'Housing & Bills', icon: 'Home', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'Entertainment', icon: 'Tv', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { name: 'Health & Wellness', icon: 'HeartPulse', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { name: 'Income', icon: 'TrendingUp', color: 'bg-green-100 text-green-800 border-green-200' },
  { name: 'Other', icon: 'Tag', color: 'bg-gray-100 text-gray-800 border-gray-200' },
] as const;

export type CategoryName = typeof DEFAULT_CATEGORIES[number]['name'];

// Seed initial transactions if DB is empty for beautiful initial render
export async function seedInitialDataIfEmpty() {
  const count = await db.transactions.count();
  if (count === 0) {
    const today = new Date();
    const formatDate = (offsetDays: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() - offsetDays);
      return d.toISOString().split('T')[0];
    };

    await db.transactions.bulkAdd([
      {
        amount: 25000,
        category: 'Food & Dining',
        description: 'Almuerzo ejecutivo',
        date: formatDate(0),
        rawInput: 'Gasté 25k en el almuerzo',
        isAiParsed: true,
        type: 'expense',
        createdAt: Date.now() - 3600000 * 2,
        reasoning: 'Interpretado "25k" como $25.000 COP y clasificado en Comida y Restaurantes.'
      },
      {
        amount: 8000000,
        category: 'Income',
        description: 'Saldo en banco / Depósito',
        date: formatDate(1),
        rawInput: 'Tengo 8m en el banco',
        isAiParsed: true,
        type: 'income',
        createdAt: Date.now() - 3600000 * 12,
        reasoning: 'Interpretado "8m" como $8.000.000 COP e identificado como Saldo en Banco (Ingreso).'
      },
      {
        amount: 45000,
        category: 'Transportation',
        description: 'Gasolina Texaco',
        date: formatDate(2),
        rawInput: 'Pagué 45k por gasolina',
        isAiParsed: true,
        type: 'expense',
        createdAt: Date.now() - 3600000 * 24,
        reasoning: 'Interpretado "45k" como $45.000 COP y clasificado en Transporte.'
      },
      {
        amount: 1500000,
        category: 'Housing & Bills',
        description: 'Alquiler del apartamento',
        date: formatDate(3),
        rawInput: 'Alquiler 1.5m',
        isAiParsed: true,
        type: 'expense',
        createdAt: Date.now() - 3600000 * 48,
        reasoning: 'Interpretado "1.5m" como $1.500.000 COP y clasificado en Vivienda y Servicios.'
      },
      {
        amount: 4000000,
        category: 'Income',
        description: 'Ventas de negocio',
        date: formatDate(4),
        rawInput: 'me ingresaron 4m de ventas',
        isAiParsed: true,
        type: 'income',
        createdAt: Date.now() - 3600000 * 96,
        reasoning: 'Interpretado "4m" como $4.000.000 COP e identificado como Ingreso de Ventas.'
      }
    ]);
  }
}
