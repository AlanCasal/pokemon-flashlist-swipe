import { useMemo } from 'react';

import { getPrimaryFontFamily } from '@/src/i18n/typography';
import { useResolvedLanguage } from '@/src/store/languageStore';

export const usePrimaryFontFamily = () => {
	const language = useResolvedLanguage();

	return useMemo(() => getPrimaryFontFamily(language), [language]);
};
