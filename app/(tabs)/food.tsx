import { View, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme/colors';

import { ScreenHeader } from '../../components/ScreenHeader';
import { DishCard } from '../../components/DishCard';
import { SearchBar } from '../../components/SearchBar';

const featuredDishes = [
  {
    id: '1',
    name: 'Sushi Roll',
    restaurant: 'Sushi Master',
    rating: 4.8,
    price: '$12.99',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: 'Japanese',
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Place',
    rating: 4.6,
    price: '$14.99',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143',
    category: 'Italian',
  },
  {
    id: '3',
    name: 'Chicken Burger',
    restaurant: 'Burger Joint',
    rating: 4.7,
    price: '$9.99',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'American',
  },
];

export default function FoodScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDishPress = (id: string) => {
    // Handle dish press
    console.log('Dish pressed:', id);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Food"
        subtitle="Discover delicious meals"
      />
      <ScrollView style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for food..."
        />
        {featuredDishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onPress={handleDishPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});