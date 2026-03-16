import { useClerk } from '@clerk/clerk-expo';
import BottomSheetGradientHandle from '@components/common/BottomSheetGradientHandle';
import { textColor } from '@constants/colors';
import { sharedStyles } from '@constants/sharedStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import { type SupportedLanguage } from '@/src/i18n/language';
import { useSetLanguagePreference } from '@/src/store/languageStore';

import LanguageMenu from './components/LanguageMenu';
import RootMenu from './components/RootMenu';
import { useStyles } from './useStyles';

const MENU_ICON_SIZE = 24;
const SHEET_SNAP_POINT = '45%';

type MenuView = 'root' | 'languages';

interface MenuProps {
	showSignOut?: boolean;
}

const Menu = ({ showSignOut = true }: MenuProps) => {
	const styles = useStyles();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { signOut } = useClerk();
	const router = useRouter();
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [activeView, setActiveView] = useState<MenuView>('root');
	const snapPoints = useMemo(() => [SHEET_SNAP_POINT], []);
	const { t } = useTranslation();
	const setLanguagePreference = useSetLanguagePreference();

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior='close'
			>
				<View style={styles.backdropFill} />
			</BottomSheetBackdrop>
		),
		[styles.backdropFill],
	);

	const toggleSheet = useCallback(() => {
		if (isSheetOpen) {
			bottomSheetRef.current?.dismiss();
			return;
		}

		bottomSheetRef.current?.present();
	}, [isSheetOpen]);

	const handleGoBackToRootMenu = useCallback(() => {
		setActiveView('root');
	}, []);

	const handleOpenLanguagesMenu = useCallback(() => {
		setActiveView('languages');
	}, []);

	const handleOpenProfile = useCallback(() => {
		bottomSheetRef.current?.dismiss();
		router.push('/profile');
	}, [router]);

	const handleDismissSheet = useCallback(() => {
		bottomSheetRef.current?.dismiss();
	}, []);

	const handleLanguagePress = useCallback(
		(nextLanguage: SupportedLanguage) => {
			setLanguagePreference(nextLanguage);
			bottomSheetRef.current?.dismiss();
		},
		[setLanguagePreference],
	);

	const handleSignOut = useCallback(async () => {
		if (isSigningOut) return;

		setIsSigningOut(true);
		bottomSheetRef.current?.dismiss();

		try {
			await signOut();
			router.replace('/');
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Sign out error:', error);
		} finally {
			setIsSigningOut(false);
		}
	}, [isSigningOut, router, signOut]);

	const isLanguagesView = activeView === 'languages';

	return (
		<>
			<View
				pointerEvents='box-none'
				style={styles.fabContainer}
			>
				<TouchableOpacity
					testID='language-switcher-fab'
					accessibilityRole='button'
					accessibilityLabel={t('menu.fabA11y')}
					activeOpacity={sharedStyles.opacity.active}
					onPress={toggleSheet}
					style={styles.fabButton}
				>
					<MaterialCommunityIcons
						name='menu'
						size={MENU_ICON_SIZE}
						color={textColor.light}
					/>
				</TouchableOpacity>
			</View>

			<BottomSheetModal
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				enablePanDownToClose
				handleComponent={BottomSheetGradientHandle}
				backgroundStyle={styles.background}
				backdropComponent={renderBackdrop}
				onChange={index => setIsSheetOpen(index >= 0)}
				onDismiss={() => {
					setIsSheetOpen(false);
					setActiveView('root');
				}}
			>
				<BottomSheetView style={styles.contentContainer}>
					{isLanguagesView ? (
						<LanguageMenu
							onBack={handleGoBackToRootMenu}
							onClose={handleDismissSheet}
							onLanguagePress={handleLanguagePress}
						/>
					) : (
						<RootMenu
							isSigningOut={isSigningOut}
							onClose={handleDismissSheet}
							onOpenProfile={handleOpenProfile}
							onOpenLanguagesMenu={handleOpenLanguagesMenu}
							onSignOut={handleSignOut}
							showSignOut={showSignOut}
						/>
					)}
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
};

export default Menu;
