import PokemonAvatar from '@components/common/PokemonAvatar';
import { fadeInAnim } from '@utils/animations';
import { Fragment, useMemo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { CustomEvolutionChain } from '@/src/types/evolutionChain';

import EvolveCondition from './components/EvolveCondition';
import styles from './styles';
import type { EvolutionChainProps } from './types';

const ANIMATION_DELAY_STEP = 220;
const BASE_POKEMON_DELAY = 100;
const BASE_EVOLUTION_DELAY = 180;
const DEFAULT_NODE_SIZE = 100;
const DEFAULT_NODE_FONT_SIZE = 20;
const EVOLUTION_ROW_NODE_SIZE = 84;
const EVOLUTION_ROW_NODE_FONT_SIZE = 18;

type EvolutionNodeProps = {
	delay: number;
	fontSize?: number;
	imgUrl?: string;
	isNodeSaved: boolean;
	pokemon: string;
	size?: number;
	trigger?: string | null;
};

const EvolutionNode = ({
	delay,
	fontSize = DEFAULT_NODE_FONT_SIZE,
	imgUrl,
	isNodeSaved,
	pokemon,
	size = DEFAULT_NODE_SIZE,
	trigger,
}: EvolutionNodeProps) => {
	const triggerText = trigger ? `(${trigger.split('-').join(' ')})` : '';

	return (
		<View>
			<Animated.View
				entering={fadeInAnim(delay)}
				style={styles.nodeImageContainer}
			>
				<PokemonAvatar
					uri={imgUrl ?? ''}
					isSaved={isNodeSaved}
					centerImage
					contentFit='contain'
					pokeballSize={size}
					imageStyle={[styles.nodeImage, { height: size, width: size }]}
				/>
			</Animated.View>

			<View style={styles.nodeTextContainer}>
				{trigger && (
					<Animated.Text
						entering={fadeInAnim(delay)}
						style={[styles.nodeTrigger, { fontSize: fontSize * 0.65 }]}
					>
						{triggerText}
					</Animated.Text>
				)}
				<Animated.Text
					entering={fadeInAnim(delay)}
					style={[styles.nodeName, { fontSize, lineHeight: fontSize + 4 }]}
				>
					{pokemon}
				</Animated.Text>
			</View>
		</View>
	);
};

const chunkEvolutions = (evolutions: CustomEvolutionChain[]) => {
	const chunks: CustomEvolutionChain[][] = [];

	for (let i = 0; i < evolutions.length; i += 3) {
		chunks.push(evolutions.slice(i, i + 3));
	}

	return chunks;
};

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
