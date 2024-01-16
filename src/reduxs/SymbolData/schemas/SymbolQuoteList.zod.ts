// Generated by ts-to-zod
import { z } from 'zod';

export const quoteListItemSchema = z.object({
  changePrice: z.number(),
  changeRate: z.number(),
  currentPrice: z.number(),
  openPrice: z.number().optional(),
  highPrice: z.number(),
  lowPrice: z.number(),
  matchingVolume: z.number(),
  matchedBy: z.string().optional(),
  time: z.string(),
  tradingVolume: z.number(),
  tradingValue: z.number(),
  sequence: z.number(),
});