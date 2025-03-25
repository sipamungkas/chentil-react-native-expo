import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

interface NewsItem {
  id: string;
  title: string;
  image: string;
  date: string;
}

interface NewsSliderProps {
  items: NewsItem[];
}

export function NewsSlider({ items }: NewsSliderProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  card: {
    width: 300,
    marginRight: 16,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    overflow: 'hidden',
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
    height: 180,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
}); 