import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  color: string;
  route: string | null;
}

interface MenuGridProps {
  items: MenuItem[];
  onItemPress: (route: string | null) => void;
}

export function MenuGrid({ items, onItemPress }: MenuGridProps) {
  return (
    <View style={styles.menuGrid}>
      {items.map((item, index) => (
        <Animated.View
          key={item.label}
          entering={FadeInDown.delay(index * 100)}
          style={styles.menuItem}
        >
          <Pressable
            style={[styles.menuButton, { backgroundColor: `${item.color}10` }]}
            onPress={() => onItemPress(item.route)}
          >
            <item.icon size={24} color={item.color} />
          </Pressable>
          <Text style={styles.menuLabel}>{item.label}</Text>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  menuItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 12,
    color: colors.chentil.punch,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
