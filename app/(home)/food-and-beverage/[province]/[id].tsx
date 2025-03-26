import { StyleSheet, View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, Flame, Utensils, CircleAlert as AlertCircle } from 'lucide-react-native';

const PROVINCE_FOODS = {
  'aceh': {
    foods: {
      '1': {
        name: 'Mie Aceh',
        description: 'Spicy noodle dish with a rich blend of spices, typically served with seafood or meat.',
        fullDescription: 'Mie Aceh is a spicy noodle dish originating from Aceh province. The dish is made with thick yellow noodles served in a rich, spicy curry-like sauce. It can be prepared either "dry" (stir-fried) or "wet" (soup-like) and is typically garnished with seafood, such as shrimp or crab, or meat like beef or goat.',
        image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80&w=800',
        cookingTime: '30-45 minutes',
        spiceLevel: 'Hot',
        servingSize: '2-3 people',
        mainIngredients: [
          'Thick yellow noodles',
          'Shrimp or beef',
          'Curry spices',
          'Bean sprouts',
          'Green onions'
        ],
        preparation: [
          'Prepare the spice paste by grinding all spices together',
          'Stir-fry the spice paste until fragrant',
          'Add meat or seafood and cook until done',
          'Add noodles and vegetables',
          'Serve hot with lime and crackers'
        ],
        nutritionalInfo: {
          calories: '450-550 per serving',
          protein: 'High',
          spiciness: 'Very spicy',
          vegetarianOption: 'Available'
        }
      },
      '2': {
        name: 'Kuah Pliek U',
        description: 'Traditional Acehnese curry made with fermented coconut pulp and various vegetables.',
        fullDescription: 'Kuah Pliek U is a unique Acehnese dish made from pliek u (fermented coconut pulp), a traditional preservation method native to Aceh. This curry-like dish features a complex blend of spices and typically includes various vegetables. The fermented coconut gives it a distinctive, rich umami flavor that\'s unique to Acehnese cuisine.',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
        cookingTime: '60-90 minutes',
        spiceLevel: 'Medium',
        servingSize: '4-6 people',
        mainIngredients: [
          'Fermented coconut (pliek u)',
          'Local vegetables',
          'Spices',
          'Coconut milk',
          'Lemongrass'
        ],
        preparation: [
          'Prepare the pliek u paste',
          'Cook spices and herbs until fragrant',
          'Add vegetables and coconut milk',
          'Simmer until vegetables are tender',
          'Serve with rice'
        ],
        nutritionalInfo: {
          calories: '300-400 per serving',
          protein: 'Medium',
          spiciness: 'Moderate',
          vegetarianOption: 'Yes'
        }
      }
    }
  },
  // Add more provinces and their foods...
};

export default function FoodDetailScreen() {
  const { province, id } = useLocalSearchParams();
  const router = useRouter();
  
  const food = PROVINCE_FOODS[province as keyof typeof PROVINCE_FOODS]?.foods[id as string];

  if (!food) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Food item not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to Foods</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={{ uri: food.image }} style={styles.headerImage} />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{food.name}</Text>
          <Text style={styles.description}>{food.fullDescription}</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Clock size={20} color="#ED8936" />
              <Text style={styles.infoLabel}>Cooking Time</Text>
              <Text style={styles.infoValue}>{food.cookingTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <Flame size={20} color="#ED8936" />
              <Text style={styles.infoLabel}>Spice Level</Text>
              <Text style={styles.infoValue}>{food.spiceLevel}</Text>
            </View>
            <View style={styles.infoItem}>
              <Utensils size={20} color="#ED8936" />
              <Text style={styles.infoLabel}>Serves</Text>
              <Text style={styles.infoValue}>{food.servingSize}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Main Ingredients</Text>
            {food.mainIngredients.map((ingredient, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preparation Steps</Text>
            {food.preparation.map((step, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.listText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutritionCard}>
              <View style={styles.nutritionItem}>
                <AlertCircle size={16} color="#4A5568" />
                <Text style={styles.nutritionLabel}>Calories:</Text>
                <Text style={styles.nutritionValue}>{food.nutritionalInfo.calories}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <AlertCircle size={16} color="#4A5568" />
                <Text style={styles.nutritionLabel}>Protein:</Text>
                <Text style={styles.nutritionValue}>{food.nutritionalInfo.protein}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <AlertCircle size={16} color="#4A5568" />
                <Text style={styles.nutritionLabel}>Spiciness:</Text>
                <Text style={styles.nutritionValue}>{food.nutritionalInfo.spiciness}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <AlertCircle size={16} color="#4A5568" />
                <Text style={styles.nutritionLabel}>Vegetarian Option:</Text>
                <Text style={styles.nutritionValue}>{food.nutritionalInfo.vegetarianOption}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    color: '#1A202C',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  infoLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#4A5568',
    marginTop: 8,
  },
  infoValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#1A202C',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#1A202C',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ED8936',
    marginRight: 12,
    marginTop: 8,
  },
  stepNumber: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#ED8936',
    marginRight: 8,
    width: 24,
  },
  listText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    flex: 1,
    lineHeight: 24,
  },
  nutritionCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nutritionLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
    width: 120,
  },
  nutritionValue: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#1A202C',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#ED8936',
  },
});