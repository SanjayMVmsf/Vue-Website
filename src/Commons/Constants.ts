export const DASHBOARD_MENU: [string, string][] = [
  ['mdi mdi-home', 'Home'],
  ['mdi mdi-view-dashboard', 'DashBoard'],
  ['mdi mdi-face-profile', 'Portfolio'],
  ['mdi mdi-axis-x-rotate-clockwise', 'Stocks'],
  ['mdi mdi-chart-areaspline', 'Charts'],
];

export const DASHBOARD_MENU_TEXT = {
  HOME: 'Home',
  DASHBOARD: 'DashBoard',
  PORTFOLIO: 'Portfolio',
  STOCKS: 'Stocks',
  CHARTS: 'Charts',
};

export const USERNAME = {
  NAME: 'sanjaymv7@gmail.com',
};

export const DASBOARD_TABLE_HEADINGS = {
  SYMBOL: 'Symbol',
  OPEN: 'open',
  HIGH: 'high',
  LOW: 'low',
  PRICE: 'Price',
  VOLUME: 'Volume',
  LATEST: 'Latest Trading Day',
  PREVIOUS: 'Previous Close',
  CHANGE: 'change',
  CHANGE_PER: 'Change Percent',
  ACTIONS: 'Actions',
};

export const DASHBOARD_TABLE_TH: string[] = ['Symbol', 'open', 'high', 'low', 'Price', 'Volume', 'Latest Trading Day', 'Previous Close', 'change', 'Change Percent', 'Actions'];

export const LOCALSTORAGE = {
  SELECTED_ITEMS: 'selectedItems',
  BOUGHT_ITEMS: 'boughtItems',
};

export const BUTTONS = {
  BUY: 'Buy',
  SELL: 'Sell',
  PROCEED: 'Proceed',
  OK: 'Ok',
  BACK: 'Back',
};

export const DASHBOARD_CONTENT = {
  NODES: [
    {
      id: 'node1',
      x: 150,
      y: 100,
      label: 'View Dashboard for current market prices',
    },
    {
      id: 'node2',
      x: 600,
      y: 100,
      label: 'Check the stocks which you want to buy',
    },
    {
      id: 'node3',
      x: 600,
      y: 320,
      label: 'Checked out stocks are visible in portfolio',
    },
    {
      id: 'node4',
      x: 150,
      y: 320,
      label: 'Bought stocks are visible in stocks',
    },
  ],
  LINKS: [
    { id: 'link1', source: 'node1', target: 'node2' },
    { id: 'link2', source: 'node2', target: 'node3' },
    { id: 'link3', source: 'node3', target: 'node4' },
    { id: 'link4', source: 'node4', target: 'node1' },
  ],
};

export const SYMBOLS: string[] = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA', 'NFLX'];

export const MESSAGES = {
  NO_RESPONSE: 'There is no response yet ....',
  NO_CHECKLISTS: 'No checklisted Values...',
  NO_STOCKS: 'No Stock Values...',
};

export const URL = {
  FETCH_URL:'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=',
  APIKEY:'&apikey=SRKKABS9IFFCA6WG'
}
