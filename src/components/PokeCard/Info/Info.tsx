import PokemonTypeChip from '@components/common/PokemonTypeChip';
import PokeBall from '@components/PokeBall';
import type { PokemonType } from '@constants/index';
import { Text, View } from 'react-native';

import type { InfoProps } from './types';
import { useStyles } from './useStyles';

const Info = ({ name, types, id, handleToggleSaved, isSaved }: InfoProps) => {
	const styles = useStyles();
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
				{types.map(type => (
					<PokemonTypeChip
						key={type.type.name}
						type={type.type.name as PokemonType}
					/>
				))}
			</View>
		</View>
	);
};

export default Info;
