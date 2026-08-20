import { create } from 'zustand';
import { db, seedInitialDataIfEmpty, type Transaction, type UserCorrection } from '../db/database';
import { translations, type Language } from '../i18n/translations';

export type Currency = 'USD' | 'COP';
export type AIEngineMode = 'fast' | 'qwen';

export interface AIState {
  status: 'idle' | 'loading' | 'ready' | 'processing' | 'error';
  progress: number;
  message: string;
}

interface StoreState {
  transactions: Transaction[];
  userCorrections: UserCorrection[];
  isLoadingTransactions: boolean;
  filterCategory: string;
  searchQuery: string;
  aiState: AIState;
  
  // Settings
  language: Language;
  darkMode: boolean;
  currency: Currency;
  aiEngineMode: AIEngineMode;
  
  // Actions
  fetchTransactions: () => Promise<void>;
  fetchUserCorrections: () => Promise<UserCorrection[]>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => Promise<Transaction>;
  addTransactionsBulk: (transactions: Omit<Transaction, 'id' | 'createdAt'>[]) => Promise<Transaction[]>;
  updateTransactionCategoryAndType: (id: number, category: string, type: 'expense' | 'income') => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  setFilterCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setAIState: (state: Partial<AIState>) => void;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  setAIEngineMode: (mode: AIEngineMode) => void;
  toggleDarkMode: () => void;
  t: (key: string) => any;
  formatCurrency: (amount: number) => string;
}

// Initial settings load from localStorage
const savedLang = (localStorage.getItem('pocket_lang') as Language) || 'es';
const savedDarkMode = localStorage.getItem('pocket_dark') === 'true';
const savedCurrency = (localStorage.getItem('pocket_currency') as Currency) || 'COP';
const savedAIEngine = (localStorage.getItem('pocket_ai_engine') as AIEngineMode) || 'fast';

if (savedDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Extract meaningful keywords excluding stop words
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'un', 'una', 'el', 'la', 'los', 'las', 'de', 'del', 'en', 'por', 'para', 'con',
    'y', 'o', 'a', 'gaste', 'pague', 'compre', 'tengo', 'me', 'mi', 'mis', 'es',
    'spent', 'paid', 'bought', 'for', 'on', 'at', 'in', 'the', 'my'
  ]);
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(k => k.length >= 2 && !stopWords.has(k));
}

export const useStore = create<StoreState>((set, get) => ({
  transactions: [],
  userCorrections: [],
  isLoadingTransactions: true,
  filterCategory: 'All',
  searchQuery: '',
  aiState: {
    status: 'idle',
    progress: 0,
    message: 'AI Engine Ready'
  },
  
  language: savedLang,
  darkMode: savedDarkMode,
  currency: savedCurrency,
  aiEngineMode: savedAIEngine,

  fetchTransactions: async () => {
    set({ isLoadingTransactions: true });
    try {
      await seedInitialDataIfEmpty();
      const allTx = await db.transactions.orderBy('createdAt').reverse().toArray();
      const allCorrections = await db.userCorrections.toArray();
      set({ transactions: allTx, userCorrections: allCorrections, isLoadingTransactions: false });
    } catch (error) {
      console.error('Error loading transactions:', error);
      set({ isLoadingTransactions: false });
    }
  },

  fetchUserCorrections: async () => {
    const corrections = await db.userCorrections.toArray();
    set({ userCorrections: corrections });
    return corrections;
  },

  addTransaction: async (txData) => {
    const newTx: Transaction = {
      ...txData,
      createdAt: Date.now()
    };
    const id = await db.transactions.add(newTx);
    const addedTx = { ...newTx, id: id as number };
    set(state => ({
      transactions: [addedTx, ...state.transactions]
    }));
    return addedTx;
  },

  addTransactionsBulk: async (txList) => {
    const preparedList: Transaction[] = txList.map((tx, idx) => ({
      ...tx,
      createdAt: Date.now() + idx
    }));

    const ids = await db.transactions.bulkAdd(preparedList, { allKeys: true });
    const addedList = preparedList.map((tx, idx) => ({
      ...tx,
      id: ids[idx] as number
    }));

    set(state => ({
      transactions: [...addedList.reverse(), ...state.transactions]
    }));

    return addedList;
  },

  updateTransactionCategoryAndType: async (id, newCategory, newType) => {
    const targetTx = get().transactions.find(t => t.id === id);
    if (!targetTx) return;

    // 1. Update transaction in Dexie
    await db.transactions.update(id, {
      category: newCategory,
      type: newType,
      isUserLearned: true,
      reasoning: `🎓 Aprendido por la IA: Corregido manualmente a ${newCategory} (${newType === 'income' ? 'Ingreso' : 'Gasto'}).`
    });

    // 2. Save User Correction Pattern for Self-Refining AI
    const rawInput = targetTx.rawInput || targetTx.description;
    const keywords = extractKeywords(rawInput);

    if (keywords.length > 0) {
      await db.userCorrections.add({
        rawInput,
        keywords,
        correctedCategory: newCategory,
        correctedType: newType,
        createdAt: Date.now()
      });
    }

    // Refresh local store & corrections
    const updatedTx = await db.transactions.orderBy('createdAt').reverse().toArray();
    const updatedCorrections = await db.userCorrections.toArray();
    set({ transactions: updatedTx, userCorrections: updatedCorrections });
  },

  deleteTransaction: async (id) => {
    await db.transactions.delete(id);
    set(state => ({
      transactions: state.transactions.filter(t => t.id !== id)
    }));
  },

  setFilterCategory: (category) => set({ filterCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAIState: (newState) => set(state => ({
    aiState: { ...state.aiState, ...newState }
  })),

  setLanguage: (lang: Language) => {
    localStorage.setItem('pocket_lang', lang);
    set({ language: lang });
  },

  setCurrency: (curr: Currency) => {
    localStorage.setItem('pocket_currency', curr);
    set({ currency: curr });
  },

  setAIEngineMode: (mode: AIEngineMode) => {
    localStorage.setItem('pocket_ai_engine', mode);
    set({ aiEngineMode: mode });
  },

  toggleDarkMode: () => {
    const nextDark = !get().darkMode;
    localStorage.setItem('pocket_dark', String(nextDark));
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ darkMode: nextDark });
  },

  t: (key: string) => {
    const lang = get().language;
    const dict = translations[lang] || translations.es;
    const parts = key.split('.');
    let res: any = dict;
    for (const part of parts) {
      if (res && typeof res === 'object' && part in res) {
        res = res[part];
      } else {
        return key;
      }
    }
    return res;
  },

  formatCurrency: (amount: number) => {
    const curr = get().currency;
    const lang = get().language;

    if (curr === 'COP') {
      return new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(amount);
    } else {
      return new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }
  }
}));
