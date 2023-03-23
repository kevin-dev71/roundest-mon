import { procedure, router } from '@/server/trpc';
import { PokemonClient } from 'pokenode-ts';
import { z } from 'zod';

export const appRouter = router({
  // hello: procedure
  //   .input(
  //     z.object({
  //       text: z.string(),
  //     })
  //   )
  //   .query(({ input }) => {
  //     return {
  //       greeting: `hello ${input.text}`,
  //     };
  //   }),
  getPokemonById: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      if (input.id === 0) return null;
      const api = new PokemonClient();
      const { name, sprites } = await api.getPokemonById(input.id);
      return { name, sprites };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
