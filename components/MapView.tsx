import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { Content } from '@/src/types/api';

// Only import MapView and Marker when not on web
const { default: RNMapView, Marker } = Platform.select({
  default: () => require('react-native-maps'),
  web: () => ({
    default: () => null,
    Marker: () => null,
  }),
})();

interface PointOfInterest {
  id: string;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface MapViewProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  pointsOfInterest: Content[];
  onMarkerPress?: (poi: Content) => void;
}

export function MapView({
  initialRegion,
  pointsOfInterest,
  onMarkerPress,
}: MapViewProps) {
  // Show alternative content on web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webPlaceholder}>
        <Text style={styles.webPlaceholderText}>
          For the best experience, please use our mobile app to access the
          interactive map features.
        </Text>
      </View>
    );
  }

  // Add zoom controls for Android/iOS
  return (
    <View style={styles.mapContainer}>
      <RNMapView
        style={styles.map}
        initialRegion={initialRegion}
        zoomEnabled={true}
        zoomControlEnabled={true} // Only works on Android
        showsUserLocation={true}
      >
        {pointsOfInterest.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{
              latitude: Number(poi.latitude),
              longitude: Number(poi.longitude),
            }}
            title={poi.title}
            onCalloutPress={() => onMarkerPress?.(poi)}
          />
        ))}
      </RNMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  webPlaceholderText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
