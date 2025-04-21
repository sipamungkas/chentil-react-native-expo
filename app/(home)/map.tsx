import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

import { ScreenHeader } from '@/components/ScreenHeader';
import { MapView } from '@/components/MapView';

import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getNearby } from '@/src/api/services/nearbyApi';

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
  const [region, setRegion] = useState(INITIAL_REGION);
  const [points, setPoints] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      // setRegion({ ...region, latitude: lat, longitude: lng });
      setRegion({ ...region, latitude: -6.1753889, longitude: 106.8271389 });
      try {
        const data = await getNearby({
          latitude: lat,
          longitude: lng,
          per_page: 15,
          max_distance: 0.9,
        });
        setPoints(
          data.map((item) => ({
            id: item.id.toString(),
            title: item.title,
            coordinate: {
              latitude: item.latitude ?? lat,
              longitude: item.longitude ?? lng,
            },
          }))
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
          // loading={loading} // Remove this prop if not supported
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
