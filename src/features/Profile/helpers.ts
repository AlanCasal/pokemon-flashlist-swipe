import type { UserResource } from '@clerk/types';

import type { SupportedLanguage } from '@/src/i18n/language';

import type { ProfileAboutData } from './types';

const FALLBACK_VALUE = '--';

const DATE_LOCALES: Record<SupportedLanguage, string> = {
	en: 'en-US',
	es: 'es-ES',
	de: 'de-DE',
	ja: 'ja-JP',
};

type Translate = (key: string) => string;

const getTrimmedValue = (value: string | null | undefined) => {
	const trimmedValue = value?.trim();

	return trimmedValue ? trimmedValue : null;
};

const getPrimaryEmailAddress = (user?: Pick<UserResource, 'primaryEmailAddress'> | null) =>
	getTrimmedValue(user?.primaryEmailAddress?.emailAddress);

export const getProfileDisplayName = ({
	fallbackName,
	user,
}: {
	fallbackName: string;
	user?: Pick<
		UserResource,
		'firstName' | 'fullName' | 'lastName' | 'primaryEmailAddress' | 'username'
	> | null;
}) => {
	const fullName = getTrimmedValue(user?.fullName);
	if (fullName) return fullName;

	const firstName = getTrimmedValue(user?.firstName);
	const lastName = getTrimmedValue(user?.lastName);
	const combinedName = [firstName, lastName].filter(Boolean).join(' ');
	if (combinedName) return combinedName;

	const username = getTrimmedValue(user?.username);
	if (username) return username;

	const primaryEmailAddress = getPrimaryEmailAddress(user);
	if (primaryEmailAddress) return primaryEmailAddress;

	return fallbackName;
};

export const getProfileSecondaryText = ({
	user,
}: {
	user?: Pick<UserResource, 'username'> | null;
}) => {
	const username = getTrimmedValue(user?.username);
	if (username) return `@${username}`;

	return '';
};

export const formatProfileDate = ({
	date,
	language,
}: {
	date?: Date | null;
	language: SupportedLanguage;
}) => {
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
		return FALLBACK_VALUE;
	}

	return new Intl.DateTimeFormat(DATE_LOCALES[language], {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date);
};

const getProfileValue = (value?: string | null) => getTrimmedValue(value) ?? FALLBACK_VALUE;

const getCountValue = (value?: number) =>
	typeof value === 'number' ? value.toString() : FALLBACK_VALUE;

export const buildProfileAboutData = ({
	language,
	savedPokemonCount,
	translate,
	user,
}: {
	language: SupportedLanguage;
	savedPokemonCount: number;
	translate: Translate;
	user?: Pick<
		UserResource,
		'createdAt' | 'externalAccounts' | 'lastSignInAt' | 'primaryEmailAddress' | 'username'
	> | null;
}): ProfileAboutData => ({
	sections: [
		{
			title: translate('profile.about.sections.profile'),
			rows: [
				{
					label: translate('profile.about.labels.savedPokemon'),
					value: savedPokemonCount.toString(),
				},
				{
					label: translate('profile.about.labels.username'),
					value: getProfileValue(user?.username),
				},
				{
					label: translate('profile.about.labels.email'),
					value: getProfileValue(user?.primaryEmailAddress?.emailAddress),
				},
			],
		},
		{
			title: translate('profile.about.sections.account'),
			rows: [
				{
					label: translate('profile.about.labels.memberSince'),
					value: formatProfileDate({ date: user?.createdAt, language }),
				},
				{
					label: translate('profile.about.labels.lastSignIn'),
					value: formatProfileDate({ date: user?.lastSignInAt, language }),
				},
				{
					label: translate('profile.about.labels.connectedAccounts'),
					value: user ? getCountValue(user.externalAccounts.length) : FALLBACK_VALUE,
				},
			],
		},
	],
});
