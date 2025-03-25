import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface MenuGridProps {
  items: MenuItem[];
  onItemPress: (id: string) => void;
}

export function MenuGrid({ items, onItemPress }: MenuGridProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Pressable
          key={item.id}
          style={styles.item}
          onPress={() => onItemPress(item.id)}
        >
          <View style={styles.iconContainer}>{item.icon}</View>
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  item: {
    width: '25%',
    padding: 8,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 