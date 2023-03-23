import { getOptionsForVote } from '@/services/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import { useEffect, useState } from 'react';

export default function Home() {
  const [[first, second], setIds] = useState<number[]>([0, 0]);

  const { data: firstPokemon, isLoading } = trpc.getPokemonById.useQuery({
    id: first,
  });
  const { data: secondPokemon, isLoading: isLoadingSecond } =
    trpc.getPokemonById.useQuery({ id: second });

  useEffect(() => {
    setIds(getOptionsForVote());
  }, []);

  if (isLoading || isLoadingSecond) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex items-center justify-between max-w-2xl">
        <div className="w-64 h-64 flex flex-col">
          <img
            src={firstPokemon?.sprites.front_default as string}
            alt={firstPokemon?.name}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon?.name}
          </div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <img
            src={secondPokemon?.sprites.front_default as string}
            alt={secondPokemon?.name}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon?.name}
          </div>
        </div>
      </div>
    </div>
  );
}
