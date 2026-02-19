import PokeBall from '@components/PokeBall';
import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { typeColors } from '@constants/colors';
import { Text, View } from 'react-native';

import { PokemonType } from '@/src/types/pokemonTypes';

import styles from './styles';
import type { InfoProps } from './types';

const Info = ({ name, types, id, handleToggleSaved, isSaved }: InfoProps) => {
	const formattedId = `#${id.toString().padStart(3, '0')}`;

	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<Text style={styles.id}>{formattedId}</Text>

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

			<View style={styles.typesRow}>
				{types.map((type, index) => {
					const backgroundColor = typeColors[type.type.name as keyof typeof typeColors];

					return (
						<View
							style={[styles.typeChip, { backgroundColor }]}
							key={index}
						>
							<PokemonTypeIcon type={type.type.name as PokemonType} />
							<Text style={styles.typeLabel}>{type.type.name}</Text>
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default Info;
