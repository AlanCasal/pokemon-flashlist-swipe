import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import PokemonTypeIcon from '@/src/components/PokemonTypeIcon';
import { PokemonType } from '@/src/types/pokemonTypes';
import { typeColors } from '@/src/constants/colors';
import { PokemonDetails } from '@/src/types/pokemon';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface InfoProps {
	name: string;
	types: PokemonDetails['types'];
	id: number;
}

const Info = ({ name, types, id }: InfoProps) => {
	return (
		<View style={styles.infoContainer}>
			<View style={styles.nameContainer}>
				<Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
					{name}
				</Text>
				<TouchableOpacity>
					<MaterialCommunityIcons
						name="star-outline"
						size={20}
						color={'white'}
						style={styles.starIcon}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.typesContainer}>
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

			<Text style={styles.pokemonId}>#{id.toString().padStart(3, '0')}</Text>
		</View>
	);
};

export default Info;
