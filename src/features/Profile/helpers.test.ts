import {
	buildProfileAboutData,
	formatProfileDate,
	getProfileDisplayName,
	getProfileSecondaryText,
} from './helpers';

const createUser = (overrides = {}) =>
	({
		createdAt: new Date('2024-01-15T10:00:00.000Z'),
		externalAccounts: [{ id: 'google' }],
		firstName: null,
		fullName: null,
		lastName: null,
		lastSignInAt: new Date('2024-02-02T18:30:00.000Z'),
		primaryEmailAddress: { emailAddress: 'ash@example.com' },
		username: null,
		...overrides,
	}) as any;

describe('Profile helpers', () => {
	it('prefers the best available display name', () => {
		expect(
			getProfileDisplayName({
				fallbackName: 'Trainer',
				user: createUser({ fullName: 'Ash Ketchum', username: 'ash' }),
			}),
		).toBe('Ash Ketchum');

		expect(
			getProfileDisplayName({
				fallbackName: 'Trainer',
				user: createUser({ firstName: 'Misty', lastName: 'Waterflower' }),
			}),
		).toBe('Misty Waterflower');

		expect(
			getProfileDisplayName({
				fallbackName: 'Trainer',
				user: createUser({ username: 'brock' }),
			}),
		).toBe('brock');

		expect(
			getProfileDisplayName({
				fallbackName: 'Trainer',
				user: createUser({ primaryEmailAddress: { emailAddress: 'tracey@example.com' } }),
			}),
		).toBe('tracey@example.com');

		expect(
			getProfileDisplayName({
				fallbackName: 'Trainer',
				user: createUser({ primaryEmailAddress: null }),
			}),
		).toBe('Trainer');
	});

	it('prefers @username for the secondary text and hides it otherwise', () => {
		expect(getProfileSecondaryText({ user: createUser({ username: 'ash' }) })).toBe('@ash');
		expect(getProfileSecondaryText({ user: createUser({ username: null }) })).toBe('');
		expect(
			getProfileSecondaryText({
				user: createUser({
					primaryEmailAddress: null,
					username: null,
				}),
			}),
		).toBe('');
	});

	it('formats dates using the resolved app locale and handles missing dates', () => {
		const date = new Date('2024-03-16T12:00:00.000Z');

		expect(formatProfileDate({ date, language: 'en' })).toBe(
			new Intl.DateTimeFormat('en-US', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
			}).format(date),
		);
		expect(formatProfileDate({ date, language: 'ja' })).toBe(
			new Intl.DateTimeFormat('ja-JP', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
			}).format(date),
		);
		expect(formatProfileDate({ date: null, language: 'en' })).toBe('--');
	});

	it('builds about data with saved count and placeholder fallbacks', () => {
		const data = buildProfileAboutData({
			language: 'en',
			savedPokemonCount: 6,
			translate: key => key,
			user: createUser({
				externalAccounts: [{ id: 'google' }, { id: 'github' }],
				primaryEmailAddress: null,
				username: null,
			}),
		});

		expect(data.sections).toHaveLength(2);
		expect(data.sections[0].rows[0]).toEqual({
			label: 'profile.about.labels.savedPokemon',
			value: '6',
		});
		expect(data.sections[0].rows[1].value).toBe('--');
		expect(data.sections[0].rows[2].value).toBe('--');
		expect(data.sections[1].rows[2].value).toBe('2');
	});
});
