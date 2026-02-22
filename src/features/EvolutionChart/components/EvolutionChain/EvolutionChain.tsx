import { Fragment, useMemo } from 'react';
import { View } from 'react-native';

import type { CustomEvolutionChain } from '@/src/types/evolutionChain';

import EvolutionNode from './components/EvolutionNode';
import EvolveCondition from './components/EvolveCondition';
import {
	ANIMATION_DELAY_STEP,
	BASE_EVOLUTION_DELAY,
	BASE_POKEMON_DELAY,
	EVOLUTION_ROW_NODE_FONT_SIZE,
	EVOLUTION_ROW_NODE_SIZE,
} from './constants';
import { chunkEvolutions } from './helpers';
import styles from './styles';
import type { EvolutionChainProps } from './types';

const EvolutionChain = ({
	evolution,
	savedPokemons,
	type,
	depth = 0,
	direction = 'right',
}: EvolutionChainProps) => {
	const savedPokemonSet = useMemo(() => new Set(savedPokemons), [savedPokemons]);
	const isNodeSaved = (pokemonName: string) => savedPokemonSet.has(pokemonName);
	const pokemonDelay = BASE_POKEMON_DELAY + depth * ANIMATION_DELAY_STEP;
	const evolveConditionDelay = BASE_EVOLUTION_DELAY + depth * ANIMATION_DELAY_STEP;

	const renderEvolutionRow = (evolutions: CustomEvolutionChain[]) => (
		<View style={styles.row}>
			{evolutions.map((nextEvolution, index) => (
				<EvolutionNode
					key={`${nextEvolution.pokemon}-${index}`}
					imgUrl={nextEvolution.imgUrl}
					isNodeSaved={isNodeSaved(nextEvolution.pokemon)}
					pokemon={nextEvolution.pokemon}
					delay={pokemonDelay}
					trigger={nextEvolution.useItem}
					size={EVOLUTION_ROW_NODE_SIZE}
					fontSize={EVOLUTION_ROW_NODE_FONT_SIZE}
				/>
			))}
		</View>
	);

	return (
		<View style={styles.chainStep}>
			<EvolutionNode
				imgUrl={evolution.imgUrl}
				isNodeSaved={isNodeSaved(evolution.pokemon)}
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
							savedPokemons={savedPokemons}
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
