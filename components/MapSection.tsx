import { View, Text, Image, StyleSheet } from 'react-native';

interface MapSectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export function MapSection({ imageUrl, title, subtitle }: MapSectionProps) {
  return (
    <View style={styles.mapSection}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.mapImage}
      />
      <View style={styles.mapOverlay}>
        <Text style={styles.mapTitle}>{title}</Text>
        <Text style={styles.mapSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapSection: {
    position: 'relative',
    height: 160,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mapTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mapSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
}); 