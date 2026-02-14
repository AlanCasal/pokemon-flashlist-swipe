import { View, Text } from 'react-native';
import { PRIMARY_FONT } from '@constants/sharedStyles';
import PokemonTypeIcon from '@components/PokemonTypeIcon';
import { PokemonType } from '@/src/types/pokemonTypes';
import { textColor, typeColors } from '@constants/colors';
import { PokemonDetails } from '@/src/types/pokemon';
import PokeBall from '@components/PokeBall';

interface InfoProps {
	name: string;
	types: PokemonDetails['types'];
	id: number;
	handleToggleSaved: () => void;
	isSaved: boolean;
}

const Info = ({ name, types, id, handleToggleSaved, isSaved }: InfoProps) => {
	return (
		<View className='flex-1 items-end'>
			<View className='flex-row items-center gap-[5px]'>
				<Text
					className='text-[10px]'
					style={{ color: textColor.number }}
				>
					#{id.toString().padStart(3, '0')}
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
				style={{ fontFamily: PRIMARY_FONT, color: textColor.primary }}
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
							backgroundColor:
								typeColors[type.type.name as keyof typeof typeColors],
						}}
						key={index}
					>
						<PokemonTypeIcon type={type.type.name as PokemonType} />
						<Text className='text-[8px] font-bold uppercase text-white'>
							{type.type.name}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default Info;
