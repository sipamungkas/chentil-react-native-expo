import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';

const SAMPLE_TRIPS = [
  {
    id: '1',
    name: 'Bali Adventure',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    destinations: ['Ubud', 'Seminyak', 'Nusa Penida'],
    collaborators: 3,
    coverImage:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Java Cultural Tour',
    startDate: '2024-04-10',
    endDate: '2024-04-15',
    destinations: ['Yogyakarta', 'Borobudur', 'Prambanan'],
    collaborators: 2,
    coverImage:
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
    status: 'draft',
  },
];

export default function TripsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'draft'>(
    'upcoming'
  );

  const filteredTrips = SAMPLE_TRIPS.filter(
    (trip) => trip.status === activeTab
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>My Trips</Text>
          <Pressable
            style={styles.createButton}
            onPress={() => router.push('/trips/create')}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.createButtonText}>Create Trip</Text>
          </Pressable>
        </View>

        <View style={styles.tabBar}>
          {(['upcoming', 'past', 'draft'] as const).map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.tripsList}>
          {filteredTrips.map((trip) => (
            <Pressable
              key={trip.id}
              style={styles.tripCard}
              onPress={() => router.push(`/trips/${trip.id}`)}
            >
              <Image
                source={{ uri: trip.coverImage }}
                style={styles.tripImage}
              />
              <View style={styles.tripContent}>
                <Text style={styles.tripName}>{trip.name}</Text>

                <View style={styles.tripDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#4A5568" />
                    <Text style={styles.detailText}>
                      {new Date(trip.startDate).toLocaleDateString()} -{' '}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <MapPin size={16} color="#4A5568" />
                    <Text style={styles.detailText}>
                      {trip.destinations.join(' • ')}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Users size={16} color="#4A5568" />
                    <Text style={styles.detailText}>
                      {trip.collaborators} people
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View
                    style={[styles.statusBadge, styles[`${trip.status}Badge`]]}
                  >
                    <Text
                      style={[styles.statusText, styles[`${trip.status}Text`]]}
                    >
                      {trip.status.charAt(0).toUpperCase() +
                        trip.status.slice(1)}
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#4A5568" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: '#1A202C',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  activeTabText: {
    color: '#fff',
  },
  tripsList: {
    paddingHorizontal: 20,
  },
  tripCard: {
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
  tripImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tripContent: {
    padding: 16,
  },
  tripName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 12,
  },
  tripDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingBadge: {
    backgroundColor: '#C6F6D5',
  },
  pastBadge: {
    backgroundColor: '#E2E8F0',
  },
  draftBadge: {
    backgroundColor: '#FED7D7',
  },
  statusText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
  },
  upcomingText: {
    color: '#2F855A',
  },
  pastText: {
    color: '#4A5568',
  },
  draftText: {
    color: '#C53030',
  },
});
