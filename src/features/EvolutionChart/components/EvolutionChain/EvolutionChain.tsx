/* eslint-disable indent */
import React, { Fragment } from 'react';
import PokemonImage from './components/PokemonImage';
import { CustomEvolutionChain } from '@/src/types/evolutionChain';
import EvolveCondition from './components/EvolveCondition';
import { typeColors } from '@/src/constants/colors';
import { View } from 'react-native';

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

interface EvolutionChainProps {
	evolution: CustomEvolutionChain;
	type: keyof typeof typeColors;
	depth?: number;
	direction?: 'left' | 'right';
}

const EvolutionChain = ({
	evolution,
	type,
	depth = 0,
	direction = 'right',
}: EvolutionChainProps) => {
	return (
		<View>
			<PokemonImage
				imgUrl={evolution.imgUrl!}
				pokemon={evolution.pokemon}
				delay={DELAY[`depth${depth}` as keyof typeof DELAY].pokemon}
			/>

			{evolution.evolvesTo.map((nextEvolution, index) => (
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
			))}
		</View>
	);
};

export default EvolutionChain;
