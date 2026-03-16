import { StyleSheet, Text, View } from 'react-native'

interface Props {
    title?: string
    variant?: 'clerk' | 'app'
}

function FormDivider({ title = "or", variant = 'clerk' }: Props) {
  return (
    <View style={styles.dividerContainer}>
      <View style={[styles.dividerLine, variant === 'app' ? styles.dividerLineApp : null]} />
      <Text style={[styles.dividerText, variant === 'app' ? styles.dividerTextApp : null]}>{title}</Text>
      <View style={[styles.dividerLine, variant === 'app' ? styles.dividerLineApp : null]} />
    </View>
  )
}

export default FormDivider

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 4
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerLineApp: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  dividerText: {
    textAlign: "center",
    color: "#757575",
  },
  dividerTextApp: {
    color: '#F5F5F5',
  },
});
