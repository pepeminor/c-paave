// Generated by ts-to-zod
import { z } from 'zod';

export const hotStockItemSchema = z.object({
  rank: z.number(),
  stockCode: z.string(),
  totalTradingValue: z.number(),
  totalTradingVolume: z.number(),
});
