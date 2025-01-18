import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import PokemonTypeIcon from '@/src/components/PokemonTypeIcon';
import { PokemonType } from '@/src/types/pokemonTypes';
import { colors } from '@/src/constants/colors';
import { PokemonDetails } from '@/src/types/pokemon';

interface InfoProps {
	name: string;
	types: PokemonDetails['types'];
	id: number;
}

const Info = ({ name, types, id }: InfoProps) => {
	return (
		<View style={styles.infoContainer}>
			<Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
				{name}
			</Text>

			<View style={styles.typesContainer}>
				{types.map((type, index) => (
					<View
						style={[
							styles.typeContainer,
							{
								backgroundColor: colors[type.type.name as keyof typeof colors],
							},
						]}
						key={index}
					>
						<PokemonTypeIcon type={type.type.name as PokemonType} />
						<Text style={styles.typeText}>{type.type.name}</Text>
					</View>
				))}
			</View>

			<Text style={styles.pokemonId}>#{id.toString().padStart(3, '0')}</Text>
		</View>
	);
};

export default Info;
