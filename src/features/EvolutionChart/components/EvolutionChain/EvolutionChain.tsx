import DotsBig from '@assets/images/dots-big-intense.svg';
import { typeBgColors, typeColors } from '@constants/colors';
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

const EDGE_DOTS_SIZE = 140;

const EvolutionChain = ({
	evolution,
	savedPokemons,
	selectedPokemonName,
	type,
	onPokemonPress,
	depth = 0,
	direction = 'right',
}: EvolutionChainProps) => {
	const savedPokemonSet = useMemo(() => new Set(savedPokemons), [savedPokemons]);
	const isNodeSaved = (pokemonName: string) => savedPokemonSet.has(pokemonName);
	const isNodeSelected = (pokemonName: string) =>
		selectedPokemonName === pokemonName.trim().toLowerCase();
	const pokemonDelay = BASE_POKEMON_DELAY + depth * ANIMATION_DELAY_STEP;
	const evolveConditionDelay = BASE_EVOLUTION_DELAY + depth * ANIMATION_DELAY_STEP;
	const selectedTextColor = typeColors[type];

	const renderEdgeDots = () => (
		<View
			pointerEvents='none'
			style={styles.edgeDotsContainer}
		>
			<View style={[styles.edgeDot, styles.edgeDotLeft]}>
				<DotsBig
					width={EDGE_DOTS_SIZE}
					fill={typeBgColors[type]}
				/>
			</View>

			<View style={[styles.edgeDot, styles.edgeDotRight]}>
				<DotsBig
					width={EDGE_DOTS_SIZE}
					fill={typeBgColors[type]}
				/>
			</View>
		</View>
	);

	const renderEvolutionRow = (evolutions: CustomEvolutionChain[]) => {
		const hasSelectedNode = evolutions.some(nextEvolution => isNodeSelected(nextEvolution.pokemon));

		return (
			<View style={styles.rowSlot}>
				{hasSelectedNode ? renderEdgeDots() : null}

				<View style={styles.row}>
					{evolutions.map((nextEvolution, index) => (
						<EvolutionNode
							key={`${nextEvolution.pokemon}-${index}`}
							imgUrl={nextEvolution.imgUrl}
							isNodeSaved={isNodeSaved(nextEvolution.pokemon)}
							isSelected={isNodeSelected(nextEvolution.pokemon)}
							pokemon={nextEvolution.pokemon}
							onPress={() => onPokemonPress(nextEvolution.pokemon)}
							delay={pokemonDelay}
							trigger={nextEvolution.useItem}
							size={EVOLUTION_ROW_NODE_SIZE}
							fontSize={EVOLUTION_ROW_NODE_FONT_SIZE}
							selectedTextColor={selectedTextColor}
						/>
					))}
				</View>
			</View>
		);
	};

	const isCurrentNodeSelected = isNodeSelected(evolution.pokemon);

	return (
		<View style={styles.chainStep}>
			<View style={styles.rootNodeSlot}>
				{isCurrentNodeSelected ? renderEdgeDots() : null}

				<EvolutionNode
					imgUrl={evolution.imgUrl}
					isNodeSaved={isNodeSaved(evolution.pokemon)}
					isSelected={isCurrentNodeSelected}
					pokemon={evolution.pokemon}
					onPress={() => onPokemonPress(evolution.pokemon)}
					delay={pokemonDelay}
					selectedTextColor={selectedTextColor}
				/>
			</View>

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
							selectedPokemonName={selectedPokemonName}
							type={type}
							onPokemonPress={onPokemonPress}
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
