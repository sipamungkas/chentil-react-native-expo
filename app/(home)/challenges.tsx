import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Medal, Target, TrendingUp } from 'lucide-react-native';
import { colors } from '@/theme/colors';

const ACTIVE_CHALLENGES = [
  {
    id: '1',
    name: 'Temple Explorer',
    description: 'Visit 5 ancient temples across Java',
    progress: 3,
    total: 5,
    reward: '500 points',
    image:
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=600',
    deadline: '15 days left',
  },
  {
    id: '2',
    name: 'Food Connoisseur',
    description: 'Try 10 different local dishes',
    progress: 7,
    total: 10,
    reward: '300 points',
    image:
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=600',
    deadline: '5 days left',
  },
  {
    id: '3',
    name: 'Island Hopper',
    description: 'Visit 3 different Indonesian islands',
    progress: 1,
    total: 3,
    reward: '1000 points',
    image:
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=600',
    deadline: '30 days left',
  },
];

export default function ChallengesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Ready for adventure?</Text>
          <Text style={styles.title}>Travel Challenges</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Trophy size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>1,250</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statCard}>
            <Medal size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            <TrendingUp size={20} color="#4A5568" />
          </View>

          {ACTIVE_CHALLENGES.map((challenge) => (
            <Pressable key={challenge.id} style={styles.challengeCard}>
              <Image
                source={{ uri: challenge.image }}
                style={styles.challengeImage}
              />
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeName}>{challenge.name}</Text>
                <Text style={styles.challengeDescription}>
                  {challenge.description}
                </Text>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${
                            (challenge.progress / challenge.total) * 100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {challenge.progress}/{challenge.total} completed
                  </Text>
                </View>

                <View style={styles.challengeFooter}>
                  <View style={styles.rewardTag}>
                    <Trophy size={16} color="#FF6B6B" />
                    <Text style={styles.rewardText}>{challenge.reward}</Text>
                  </View>
                  <Text style={styles.deadline}>{challenge.deadline}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: '#1A202C',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#1A202C',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#4A5568',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
  },
  challengeCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  challengeImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  challengeInfo: {
    padding: 16,
  },
  challengeName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 4,
  },
  challengeDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#4A5568',
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rewardText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#FF6B6B',
    marginLeft: 4,
  },
  deadline: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#4A5568',
  },
});
