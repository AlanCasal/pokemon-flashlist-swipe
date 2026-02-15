/* eslint-disable indent */
import { Fragment } from 'react';
import { View } from 'react-native';

import { CustomEvolutionChain } from '@/src/types/evolutionChain';

import EvolveCondition from './components/EvolveCondition';
import PokemonImage from './components/PokemonImage';
import type { EvolutionChainProps } from './types';

const DELAY = {
	depth0: {
		pokemon: 500,
		evolveCondition: 1500,
	},
	depth1: {
		pokemon: 2000,
		evolveCondition: 2500,
	},
	depth2: {
		pokemon: 3000,
		evolveCondition: 3500,
	},
};

const EvolutionChain = ({
	evolution,
	type,
	depth = 0,
	direction = 'right',
}: EvolutionChainProps) => {
	const renderEvolutionRow = (evolutions: CustomEvolutionChain[]) => (
		<View className='flex-row items-center justify-center gap-[30px] px-10'>
			{evolutions.map((nextEvolution, index) => (
				<PokemonImage
					key={`${nextEvolution.pokemon}-${index}`}
					imgUrl={nextEvolution.imgUrl!}
					pokemon={nextEvolution.pokemon}
					delay={DELAY.depth1.pokemon}
					trigger={nextEvolution.useItem}
					size={70}
					fontSize={16}
				/>
			))}
		</View>
	);

	const chunkEvolutions = (evolutions: CustomEvolutionChain[]) => {
		const chunks: CustomEvolutionChain[][] = [];

		for (let i = 0; i < evolutions.length; i += 3) chunks.push(evolutions.slice(i, i + 3));

		return chunks;
	};

	return (
		<>
			<PokemonImage
				imgUrl={evolution.imgUrl!}
				pokemon={evolution.pokemon}
				delay={DELAY[`depth${depth}` as keyof typeof DELAY].pokemon}
			/>

			{evolution.evolvesTo.length > 1 ? (
				<View className='w-full gap-5'>
					<EvolveCondition
						type={type}
						minLevel={evolution.minLevel}
						direction={direction}
						delay={DELAY.depth0.evolveCondition}
					/>

					{chunkEvolutions(evolution.evolvesTo).map((chunk, rowIndex) => (
						<View key={`row-${rowIndex}`}>{renderEvolutionRow(chunk)}</View>
					))}
				</View>
			) : (
				evolution.evolvesTo.map((nextEvolution, index) => (
					<Fragment key={`${nextEvolution.pokemon}-${index}`}>
						<EvolveCondition
							type={type}
							minLevel={nextEvolution.minLevel}
							direction={direction}
							delay={DELAY[`depth${depth}` as keyof typeof DELAY].evolveCondition}
						/>

						<EvolutionChain
							evolution={nextEvolution}
							type={type}
							depth={depth + 1}
							direction={direction === 'right' ? 'left' : 'right'}
						/>
					</Fragment>
				))
			)}
		</>
	);
};

export default EvolutionChain;
