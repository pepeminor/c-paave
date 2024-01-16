export type ForeignTradingState = {
  selectedMarket: ForeignTradingMarket;
  foreignBuy: {
    [key in ForeignTradingMarket]?: ForeignTradingResponse[];
  } & {
    lastUpdated?: string | null;
  };
  foreignSell: {
    [key in ForeignTradingMarket]?: ForeignTradingResponse[];
  } & {
    lastUpdated?: string | null;
  };
};

export const ForeignTradingMarket = {
  ALL: 'ALL',
  HOSE: 'HOSE',
  HNX: 'HNX',
  UPCOM: 'UPCOM',
} as const;
export type ForeignTradingMarket = keyof typeof ForeignTradingMarket;

export type GetForeignTradingPayload = {
  marketType: ForeignTradingMarket;
  refresh?: boolean;
};

// Start ------------------------- API type -------------------------
export type ForeignTradingParams = {
  marketType: ForeignTradingMarket;
  upDownType: 'UP' | 'DOWN';
};

export type ForeignTradingResponse = {
  s: string; // Stock Code
  // o:number;
  // h:number;
  // l:number;
  // c:number;
  // ch:number;
  // ra:number;
  // vo:number;
  // mt: string;
  fbv: number; // Foreign Buy Volume
  fsv: number; // Foreign Sell Volume
  fnv: number; // Foreign Net Buy Volume
};
// End ------------------------- API type -------------------------
