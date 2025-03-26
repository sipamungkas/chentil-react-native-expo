import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface Dish {
  id: string;
  name: string;
  restaurant: string;
  rating: number;
  price: string;
  image: string;
  category: string;
}

interface DishCardProps {
  dish: Dish;
  onPress: (id: string) => void;
}

export function DishCard({ dish, onPress }: DishCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(dish.id)}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.category}>{dish.category}</Text>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.restaurant}>{dish.restaurant}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{dish.price}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={16} color={colors.brand.accent} fill={colors.brand.accent} />
          <Text style={styles.rating}>{dish.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  category: {
    fontSize: 12,
    color: colors.brand.primary,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  restaurant: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  priceContainer: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 4,
  },
}); 