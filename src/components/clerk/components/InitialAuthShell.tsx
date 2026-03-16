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
								adjustsFontSizeToFit
								minimumFontScale={0.72}
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
