import { Text } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { PokemonType } from '@/src/types/pokemonTypes';

const Bug = lazy(() => import('@/assets/icons/bug.svg'));
const Dark = lazy(() => import('@/assets/icons/dark.svg'));
const Dragon = lazy(() => import('@/assets/icons/dragon.svg'));
const Electric = lazy(() => import('@/assets/icons/electric.svg'));
const Fairy = lazy(() => import('@/assets/icons/fairy.svg'));
const Fighting = lazy(() => import('@/assets/icons/fighting.svg'));
const Fire = lazy(() => import('@/assets/icons/fire.svg'));
const Flying = lazy(() => import('@/assets/icons/flying.svg'));
const Ghost = lazy(() => import('@/assets/icons/ghost.svg'));
const Grass = lazy(() => import('@/assets/icons/grass.svg'));
const Ground = lazy(() => import('@/assets/icons/ground.svg'));
const Ice = lazy(() => import('@/assets/icons/ice.svg'));
const Normal = lazy(() => import('@/assets/icons/normal.svg'));
const Poison = lazy(() => import('@/assets/icons/poison.svg'));
const Psychic = lazy(() => import('@/assets/icons/psychic.svg'));
const Rock = lazy(() => import('@/assets/icons/rock.svg'));
const Steel = lazy(() => import('@/assets/icons/steel.svg'));
const Water = lazy(() => import('@/assets/icons/water.svg'));

const typeIcons = {
	bug: Bug,
	dark: Dark,
	dragon: Dragon,
	electric: Electric,
	fairy: Fairy,
	fighting: Fighting,
	fire: Fire,
	flying: Flying,
	ghost: Ghost,
	grass: Grass,
	ground: Ground,
	ice: Ice,
	normal: Normal,
	poison: Poison,
	psychic: Psychic,
	rock: Rock,
	steel: Steel,
	water: Water,
} as const;

type PokemonIconType = keyof typeof typeIcons;

const PokemonTypeIcon = ({ type }: { type: PokemonType }) => {
	const Icon = typeIcons[type.toLowerCase() as PokemonIconType] ?? null;

	if (!Icon) return null;

	return (
		<Suspense fallback={<Text>Loading...</Text>}>
			<Icon fill="white" width={12} height={12} />
		</Suspense>
	);
};

export default PokemonTypeIcon;
