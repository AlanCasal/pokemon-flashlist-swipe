import Dots from '@components/common/Dots';
import { textColor } from '@constants/colors';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { useStyles } from './useInitialAuthShellStyles';

interface InitialAuthShellProps {
	children: React.ReactNode;
	footer?: React.ReactNode;
	subtitle: string;
	title: string;
}

const InitialAuthShell = ({ children, footer, subtitle, title }: InitialAuthShellProps) => {
	const styles = useStyles();

	return (
		<View style={styles.root}>
			<StatusBar style='light' />
			<Dots
				color={textColor.light}
				opacity={0.16}
				position={styles.topDots}
				size={220}
			/>
			<Dots
				color={textColor.light}
				opacity={0.12}
				position={styles.bottomDots}
				size={200}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				style={styles.keyboardRoot}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					bounces={false}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.content}>
						<View style={styles.header}>
							<Text
								numberOfLines={1}
								style={styles.title}
							>
								{title}
							</Text>
							<Text style={styles.subtitle}>{subtitle}</Text>
						</View>

						<View style={styles.formContent}>{children}</View>
						{footer ? <View style={styles.footer}>{footer}</View> : null}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default InitialAuthShell;
