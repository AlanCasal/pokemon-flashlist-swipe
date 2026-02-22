import { PokedexHeaderActionId } from '../../types';

type GetActionBadgeTestIdsParams = {
	hasActiveFilter: boolean;
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
	hasActiveFilter,
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

	if (id === PokedexHeaderActionId.Filter && hasActiveFilter) {
		return {
			containerTestID: 'pokedex-filter-badge',
			labelTestID: 'pokedex-filter-badge-label',
		};
	}

	return null;
};
