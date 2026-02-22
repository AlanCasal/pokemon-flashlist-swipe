import { Fragment } from 'react';
import { View } from 'react-native';

import { CustomEvolutionChain } from '@/src/types/evolutionChain';

import EvolveCondition from './components/EvolveCondition';
import PokemonImage from './components/PokemonImage';
import styles from './styles';
import type { EvolutionChainProps } from './types';

const ANIMATION_DELAY_STEP = 220;
const BASE_POKEMON_DELAY = 100;
const BASE_EVOLUTION_DELAY = 180;

const chunkEvolutions = (evolutions: CustomEvolutionChain[]) => {
	const chunks: CustomEvolutionChain[][] = [];

	for (let i = 0; i < evolutions.length; i += 3) {
		chunks.push(evolutions.slice(i, i + 3));
	}

	return chunks;
};

const EvolutionChain = ({
	evolution,
	type,
	depth = 0,
	direction = 'right',
}: EvolutionChainProps) => {
	const pokemonDelay = BASE_POKEMON_DELAY + depth * ANIMATION_DELAY_STEP;
	const evolveConditionDelay = BASE_EVOLUTION_DELAY + depth * ANIMATION_DELAY_STEP;

	const renderEvolutionRow = (evolutions: CustomEvolutionChain[]) => (
		<View style={styles.row}>
			{evolutions.map((nextEvolution, index) => (
				<PokemonImage
					key={`${nextEvolution.pokemon}-${index}`}
					imgUrl={nextEvolution.imgUrl!}
					pokemon={nextEvolution.pokemon}
					delay={pokemonDelay}
					trigger={nextEvolution.useItem}
					size={84}
					fontSize={18}
				/>
			))}
		</View>
	);

	return (
		<View style={styles.chainStep}>
			<PokemonImage
				imgUrl={evolution.imgUrl!}
				pokemon={evolution.pokemon}
				delay={pokemonDelay}
			/>

			{evolution.evolvesTo.length > 1 ? (
				<View style={styles.multiEvolutionContainer}>
					<EvolveCondition
						type={type}
						minLevel={evolution.minLevel}
						direction={direction}
						delay={evolveConditionDelay}
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
							delay={evolveConditionDelay}
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
		</View>
	);
};

export default EvolutionChain;
