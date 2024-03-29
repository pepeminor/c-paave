// Generated by ts-to-zod
import { z } from 'zod';

export const ExampleResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number().optional(),
});

export const MapFieldExampleResponse = {
  id: 'id',
};
