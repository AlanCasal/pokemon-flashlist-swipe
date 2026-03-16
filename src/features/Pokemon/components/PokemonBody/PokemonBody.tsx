import DetailSheet from '@components/DetailSheet';

import type { PokemonBodyProps } from './types';

const PokemonBody = ({
	activeTab,
	animatedSheetIndex,
	animatedSheetPosition,
	children,
	onTabPress,
	tabConfig,
}: PokemonBodyProps) => (
	<DetailSheet
		activeTab={activeTab}
		animatedSheetIndex={animatedSheetIndex}
		animatedSheetPosition={animatedSheetPosition}
		onTabPress={onTabPress}
		tabConfig={tabConfig}
	>
		{children}
	</DetailSheet>
);

export default PokemonBody;
