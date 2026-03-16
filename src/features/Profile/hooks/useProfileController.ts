import { useUser } from '@clerk/clerk-expo';
import { useSavedPokemons } from '@store/savedStore';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { resolveSupportedLanguage } from '@/src/i18n/language';

import { buildProfileAboutData, getProfileDisplayName, getProfileSecondaryText } from '../helpers';
import type { ProfileController, ProfileTab } from '../types';

export const useProfileController = (): ProfileController => {
	const { i18n, t } = useTranslation();
	const { isLoaded, user } = useUser();
	const [activeTab, setActiveTab] = useState<ProfileTab>('about');
	const savedPokemons = useSavedPokemons();
	const language = resolveSupportedLanguage(i18n.language);

	const tabConfig = useMemo<ProfileController['tabConfig']>(
		() => [
			{ id: 'about', label: t('profile.tabs.about') },
			{ id: 'collection', label: t('profile.tabs.collection') },
			{ id: 'badges', label: t('profile.tabs.badges') },
		],
		[t],
	);

	const aboutData = useMemo(
		() =>
			buildProfileAboutData({
				language,
				savedPokemonCount: savedPokemons.length,
				translate: t,
				user,
			}),
		[language, savedPokemons.length, t, user],
	);

	const onTabPress = useCallback((tab: ProfileTab) => {
		setActiveTab(tab);
	}, []);

	return {
		activeTab,
		aboutData,
		displayName: getProfileDisplayName({
			fallbackName: t('profile.fallbackName'),
			user,
		}),
		heroImageUrl: user?.imageUrl ?? null,
		isProfileLoading: !isLoaded,
		onTabPress,
		secondaryText: getProfileSecondaryText({ user }),
		tabConfig,
	};
};
