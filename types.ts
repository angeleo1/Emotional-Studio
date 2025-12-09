export enum View {
  HOME = 'HOME',
  PORTFOLIO = 'PORTFOLIO',
  PRICE = 'PRICE',
  PACKAGES = 'PACKAGES',
  EVENT = 'EVENT',
  FAQ = 'FAQ',
  CONCIERGE = 'CONCIERGE'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PortfolioItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

