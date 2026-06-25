export enum CardCategory {
  SALES = "Sales",
  LEADS = "Leads & Outreach",
  MARKETING = "Marketing & Copy",
  PRODUCTIVITY = "Productivity & Strategy",
  AUTOMATION = "Automation & Ops",
}

export interface CardPlaceholder {
  key: string;
  label: string;
  description: string;
  defaultValue: string;
}

export interface CardCommand {
  id: string; // e.g., "SALE-01"
  code: string; // e.g., "01"
  category: CardCategory;
  title: string;
  description: string;
  promptTemplate: string;
  placeholders: CardPlaceholder[];
  scanMessage?: string;
}

export interface WaitlistItem {
  email: string;
  joinedAt: string;
  code: string;
}

export interface ExecutionRequest {
  id: string;
  placeholders: Record<string, string>;
}

export interface ExecutionResponse {
  result: string;
  success: boolean;
  error?: string;
}
