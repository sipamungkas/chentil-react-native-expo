import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

import { ScreenHeader } from '../../components/ScreenHeader';
import { MapView } from '../../components/MapView';

const INITIAL_REGION = {
  latitude: -6.200000,
  longitude: 106.816666,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const POINTS_OF_INTEREST = [
  {
    id: '1',
    title: 'National Monument',
    coordinate: {
      latitude: -6.175392,
      longitude: 106.827153,
    },
  },
  {
    id: '2',
    title: 'Istiqlal Mosque',
    coordinate: {
      latitude: -6.170306,
      longitude: 106.830892,
    },
  },
];

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Explore Nearby"
        subtitle="Discover interesting places around you"
      />
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={INITIAL_REGION}
          pointsOfInterest={POINTS_OF_INTEREST}
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