import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { MapView } from './MapView';

interface MapSectionProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  pointsOfInterest: Array<{
    id: string;
    title: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  }>;
}

export function MapSection({ initialRegion, pointsOfInterest }: MapSectionProps) {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={initialRegion}
        pointsOfInterest={pointsOfInterest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
}); 