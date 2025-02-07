import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import PokemonTypeIcon from '@/src/components/PokemonTypeIcon';
import { PokemonType } from '@/src/types/pokemonTypes';
import { typeColors } from '@/src/constants/colors';
import { PokemonDetails } from '@/src/types/pokemon';
import PokeBall from '@/src/components/PokeBall';

interface InfoProps {
	name: string;
	types: PokemonDetails['types'];
	id: number;
	handleToggleSaved: () => void;
	isSaved: boolean;
}

const Info = ({ name, types, id, handleToggleSaved, isSaved }: InfoProps) => {
	return (
		<View style={styles.infoContainer}>
			<View style={styles.firstRowContainer}>
				<Text style={styles.pokemonId}>#{id.toString().padStart(3, '0')}</Text>

				<PokeBall
					isSaved={isSaved}
					handleOnPress={handleToggleSaved}
					size={24}
					enablePopAnimation
				/>
			</View>

			<Text
				style={styles.name}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{name}
			</Text>

			<View style={styles.thirdRowContainer}>
				{types.map((type, index) => (
					<View
						style={[
							styles.typeContainer,
							{
								backgroundColor:
									typeColors[type.type.name as keyof typeof typeColors],
							},
						]}
						key={index}
					>
						<PokemonTypeIcon type={type.type.name as PokemonType} />
						<Text style={styles.typeText}>{type.type.name}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default Info;
