import PokeBall from '@components/PokeBall';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
import texts from '@utils/texts.json';
import { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { getEmptySavedTextParts } from '../../helpers';
import { type PokedexEmptySavedStateProps } from './types';

const emptySavedTextStyle = {
	fontFamily: sharedStyles.typography.primaryFont,
	color: textColor.grey,
};

const PokedexEmptySavedState = ({
	isPokeBallSaved,
	onPokeBallPress,
}: PokedexEmptySavedStateProps) => {
	const emptySavedTextParts = useMemo(
		() => getEmptySavedTextParts(texts.pokedex.emptySavedText),
		[],
	);

	if (!emptySavedTextParts.shouldRenderIcon) {
		return (
			<Text
				className='text-center text-base'
				style={emptySavedTextStyle}
			>
				{texts.pokedex.emptySavedText}
			</Text>
		);
	}

	return (
		<>
			{emptySavedTextParts.topLines.map((line, index) =>
				line ? (
					<Text
						key={`empty-saved-top-${index}`}
						className='text-center text-base'
						style={emptySavedTextStyle}
					>
						{line}
					</Text>
				) : (
					<View
						key={`empty-saved-top-spacer-${index}`}
						className='h-4'
					/>
				),
			)}
			<View className='mt-1 flex-row items-center justify-center'>
				<Text
					className='text-center text-base'
					style={emptySavedTextStyle}
				>
					{emptySavedTextParts.iconPrefix.trimEnd()}
				</Text>
				<PokeBall
					handleOnPress={onPokeBallPress}
					isSaved={isPokeBallSaved}
					enablePopAnimation
					containerStyles={{ marginHorizontal: 6 }}
				/>
				<Text
					className='text-center text-base'
					style={emptySavedTextStyle}
				>
					{emptySavedTextParts.iconSuffix.trimStart()}
				</Text>
			</View>
			{emptySavedTextParts.bottomLines.map((line, index) =>
				line ? (
					<Text
						key={`empty-saved-bottom-${index}`}
						className='mt-1 text-center text-base'
						style={emptySavedTextStyle}
					>
						{line}
					</Text>
				) : (
					<View
						key={`empty-saved-bottom-spacer-${index}`}
						className='h-4'
					/>
				),
			)}
		</>
	);
};

export default memo(PokedexEmptySavedState);
