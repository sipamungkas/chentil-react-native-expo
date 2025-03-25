import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  greeting?: string;
}

export function ScreenHeader({ title, subtitle, greeting }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {greeting && <Text style={styles.greeting}>{greeting}</Text>}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
}); 