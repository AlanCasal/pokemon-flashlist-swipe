import { ActivityIndicator } from 'react-native';
import React, { lazy, Suspense } from 'react';
import { PokemonType } from '@/src/types/pokemonTypes';

const Bug = lazy(() => import('@/assets/icons/types/bug.svg'));
const Dark = lazy(() => import('@/assets/icons/types/dark.svg'));
const Dragon = lazy(() => import('@/assets/icons/types/dragon.svg'));
const Electric = lazy(() => import('@/assets/icons/types/electric.svg'));
const Fairy = lazy(() => import('@/assets/icons/types/fairy.svg'));
const Fighting = lazy(() => import('@/assets/icons/types/fighting.svg'));
const Fire = lazy(() => import('@/assets/icons/types/fire.svg'));
const Flying = lazy(() => import('@/assets/icons/types/flying.svg'));
const Ghost = lazy(() => import('@/assets/icons/types/ghost.svg'));
const Grass = lazy(() => import('@/assets/icons/types/grass.svg'));
const Ground = lazy(() => import('@/assets/icons/types/ground.svg'));
const Ice = lazy(() => import('@/assets/icons/types/ice.svg'));
const Normal = lazy(() => import('@/assets/icons/types/normal.svg'));
const Poison = lazy(() => import('@/assets/icons/types/poison.svg'));
const Psychic = lazy(() => import('@/assets/icons/types/psychic.svg'));
const Rock = lazy(() => import('@/assets/icons/types/rock.svg'));
const Steel = lazy(() => import('@/assets/icons/types/steel.svg'));
const Water = lazy(() => import('@/assets/icons/types/water.svg'));

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
		<Suspense fallback={<ActivityIndicator size="small" />}>
			<Icon fill="white" width={12} height={12} />
		</Suspense>
	);
};

export default PokemonTypeIcon;
