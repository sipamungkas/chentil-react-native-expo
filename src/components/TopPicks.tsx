import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface TopPicksProps {
  title: string;
  children: React.ReactNode;
}

export function TopPicks({ title, children }: TopPicksProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
}); 