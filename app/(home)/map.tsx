import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

import { ScreenHeader } from '@/components/ScreenHeader';
import { MapView } from '@/components/MapView';

import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getNearby } from '@/src/api/services/nearbyApi';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { Content } from '@/src/types/api';

const INITIAL_REGION = {
  latitude: -6.2,
  longitude: 106.816666,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Define the type for points of interest
interface PointOfInterest {
  id: string;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export default function MapScreen() {
  const { latitude, longitude } = useLocalSearchParams();
  const router = useRouter();

  // Ensure latitude and longitude are numbers (not strings)
  const lat = latitude ? Number(latitude) : INITIAL_REGION.latitude;
  const lng = longitude ? Number(longitude) : INITIAL_REGION.longitude;

  const [region, setRegion] = useState({
    ...INITIAL_REGION,
    latitude: lat,
    longitude: lng,
  });
  const [points, setPoints] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }
      setRegion((prev) => ({ ...prev, latitude: lat, longitude: lng }));
      try {
        const data = await getNearby({
          latitude: lat,
          longitude: lng,
          per_page: 15,
          max_distance: 5,
        });

        setPoints(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [lat, lng]);

  console.log({ points });

  const handleMarkerPress = (poi: Content) => {
    router.push({
      pathname: '/detail',
      params: {
        id: poi.id,
        title: poi.title,
        description: poi.description,
        image: poi.image,
        category: poi.category,
        province_id: poi.province_id,
        regency_id: poi.regency_id,
        district_id: poi.district_id,
        since_century: poi.since_century,
        established_year: poi.established_year,
        latitude: poi.latitude,
        longitude: poi.longitude,
        order: poi.order,
        created_at: poi.created_at,
        updated_at: poi.updated_at,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Explore Nearby"
        subtitle="Discover interesting places around you"
      />
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={region}
          pointsOfInterest={points}
          onMarkerPress={handleMarkerPress}
          // loading={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  mapContainer: {
    flex: 1,
    padding: 16,
  },
});
