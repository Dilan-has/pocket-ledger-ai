export type Language = 'es' | 'en';

export const translations = {
  es: {
    appTitle: 'PocketLedger',
    appSubtitle: 'Finanzas Personales 100% Offline',
    zeroCloud: 'Cero Fuga de Datos',
    offlineReady: 'Listo Offline',
    localAiActive: 'Motor IA:',
    clientSideActive: 'Modo Rápido 0ms Activo',
    qwenActive: 'Qwen 2.5 0.5B Neural SLM',
    processingExpense: 'Razonando y analizando gastos...',
    
    // Header controls
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    language: 'Idioma',
    currency: 'Moneda',
    fastMode: '⚡ Rápido (0ms)',
    qwenMode: '🧠 Qwen 0.5B Neural',

    // Natural Language Input
    naturalInputTitle: 'Entrada de Gastos en Lenguaje Natural',
    slmPowered: 'Impulsado por IA Local Aislada',
    naturalInputDesc: 'Escribe uno o varios gastos en lenguaje natural. Soporta 25k, 2m y múltiples gastos en una sola frase.',
    inputPlaceholder: 'Ej: Gasté 45k en gasolina, 18k en almuerzo y me consignaron 2m de sueldo...',
    analyzing: 'Razonando...',
    logExpense: 'Registrar Gasto(s)',
    tryExample: 'Prueba un ejemplo',
    samplePrompts: [
      'Gasté 25k en el almuerzo',
      'Me consignaron 2m de salario',
      'Gasté 45k en gasolina, 18k en almuerzo y 120k en supermercado',
      'Alquiler del apartamento 1.5m'
    ],
    
    // Summary Metrics
    totalExpenses: 'Gastos Totales',
    totalIncome: 'Ingresos Totales',
    netSavings: 'Ahorro Neto',
    topSpending: 'Categoría Principal',
    transactionsLogged: 'transacciones registradas',
    depositsLogged: 'depósitos registrados',
    positiveBalance: 'Balance positivo',
    deficit: 'Déficit',
    total: 'total',
    none: 'Ninguna',

    // Transaction Ledger
    ledgerTitle: 'Libro Contable',
    ledgerSubtitle: 'Histórico guardado de forma segura en IndexedDB local',
    searchPlaceholder: 'Buscar transacciones...',
    allCategories: 'Todas',
    noTransactions: 'No se encontraron transacciones con este filtro.',
    tryLogging: '¡Intenta registrar un nuevo gasto en lenguaje natural arriba!',
    aiParsedTooltip: 'Categorizado por IA Local en Web Worker',

    // Category Breakdown
    categoryBreakdown: 'Desglose por Categoría',
    expenseShare: 'Cuota de Gastos',
    noExpensesYet: 'No hay gastos registrados aún.',

    // Categories
    categories: {
      'Food & Dining': 'Comida y Restaurantes',
      'Transportation': 'Transporte',
      'Shopping': 'Compras',
      'Housing & Bills': 'Vivienda y Servicios',
      'Entertainment': 'Entretenimiento',
      'Health & Wellness': 'Salud y Bienestar',
      'Income': 'Ingresos',
      'Other': 'Otros'
    },

    // Footer
    footerTitle: 'PocketLedger AI — PWA de Finanzas Privada',
    footerSubtitle: 'Simplicidad Cálida e Inteligencia Local'
  },
  en: {
    appTitle: 'PocketLedger',
    appSubtitle: '100% Offline Personal Finance',
    zeroCloud: 'Zero Cloud Data Leak',
    offlineReady: 'Offline Ready',
    localAiActive: 'AI Engine:',
    clientSideActive: 'Fast 0ms Mode Active',
    qwenActive: 'Qwen 2.5 0.5B Neural SLM',
    processingExpense: 'Reasoning & analyzing expenses...',
    
    // Header controls
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    currency: 'Currency',
    fastMode: '⚡ Fast (0ms)',
    qwenMode: '🧠 Qwen 0.5B Neural',

    // Natural Language Input
    naturalInputTitle: 'Natural Language Expense Entry',
    slmPowered: 'Local Isolated AI Engine',
    naturalInputDesc: 'Type single or multiple expenses in natural language. Supports 25k, 2m, and multi-expense prompts.',
    inputPlaceholder: 'e.g. Spent 45k on gas, 18k on lunch, and received 2m salary deposit...',
    analyzing: 'Reasoning...',
    logExpense: 'Log Expense(s)',
    tryExample: 'Try an example',
    samplePrompts: [
      'Spent 25k on lunch',
      'They deposited 2m salary',
      'Spent 45k on gas, 18k on lunch, and 120k on groceries',
      'Apartment rent 1.5m'
    ],

    // Summary Metrics
    totalExpenses: 'Total Expenses',
    totalIncome: 'Total Income',
    netSavings: 'Net Savings',
    topSpending: 'Top Spending',
    transactionsLogged: 'transactions logged',
    depositsLogged: 'deposits logged',
    positiveBalance: 'Positive balance',
    deficit: 'Deficit',
    total: 'total',
    none: 'None',

    // Transaction Ledger
    ledgerTitle: 'Transaction Ledger',
    ledgerSubtitle: 'Local IndexedDB ledger stored securely in browser',
    searchPlaceholder: 'Search transactions...',
    allCategories: 'All',
    noTransactions: 'No transactions found for this filter.',
    tryLogging: 'Try logging a new expense using natural language above!',
    aiParsedTooltip: 'Categorized by Local AI Worker',

    // Category Breakdown
    categoryBreakdown: 'Category Breakdown',
    expenseShare: 'Expense Share',
    noExpensesYet: 'No expenses recorded yet.',

    // Categories
    categories: {
      'Food & Dining': 'Food & Dining',
      'Transportation': 'Transportation',
      'Shopping': 'Shopping',
      'Housing & Bills': 'Housing & Bills',
      'Entertainment': 'Entertainment',
      'Health & Wellness': 'Health & Wellness',
      'Income': 'Income',
      'Other': 'Other'
    },

    // Footer
    footerTitle: 'PocketLedger AI — Privacy-First Browser PWA',
    footerSubtitle: 'Sun-Baked Simplicity & Local Intelligence'
  }
};
