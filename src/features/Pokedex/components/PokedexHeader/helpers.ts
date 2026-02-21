import { PokedexHeaderActionId } from '../../types';

type GetActionBadgeTestIdsParams = {
	hasActiveGeneration: boolean;
	hasActiveSort: boolean;
	id: PokedexHeaderActionId;
};

type ActionBadgeTestIds = {
	containerTestID: string;
	labelTestID: string;
};

export const getActionBadgeTestIds = ({
	id,
	hasActiveGeneration,
	hasActiveSort,
}: GetActionBadgeTestIdsParams): ActionBadgeTestIds | null => {
	if (id === PokedexHeaderActionId.Sort && hasActiveSort) {
		return {
			containerTestID: 'pokedex-sort-badge',
			labelTestID: 'pokedex-sort-badge-label',
		};
	}

	if (id === PokedexHeaderActionId.Generation && hasActiveGeneration) {
		return {
			containerTestID: 'pokedex-generation-badge',
			labelTestID: 'pokedex-generation-badge-label',
		};
	}

	return null;
};
