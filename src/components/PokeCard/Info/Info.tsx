import PokeBall from '@components/PokeBall';
import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { textColor, typeColors } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import { Text, View } from 'react-native';

import { PokemonType } from '@/src/types/pokemonTypes';

import type { InfoProps } from './types';

const Info = ({ name, types, id, handleToggleSaved, isSaved }: InfoProps) => {
	const formattedId = `#${id.toString().padStart(3, '0')}`;

	return (
		<View className='flex-1 items-end'>
			<View className='flex-row items-center gap-[5px]'>
				<Text
					className='text-[10px]'
					style={{ color: textColor.number }}
				>
					{formattedId}
				</Text>

				<PokeBall
					isSaved={isSaved}
					handleOnPress={handleToggleSaved}
					size={24}
					enablePopAnimation
				/>
			</View>

			<Text
				className='mb-[5px] text-[20px] capitalize tracking-[1px]'
				style={{ fontFamily: sharedStyles.typography.primaryFont, color: textColor.primary }}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{name}
			</Text>

			<View className='flex-row justify-end gap-[5px]'>
				{types.map((type, index) => (
					<View
						className='flex-row items-center gap-[5px] rounded-[3px] px-[6px] py-1'
						style={{
							backgroundColor: typeColors[type.type.name as keyof typeof typeColors],
						}}
						key={index}
					>
						<PokemonTypeIcon type={type.type.name as PokemonType} />
						<Text className='text-[8px] font-bold uppercase text-white'>{type.type.name}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default Info;
