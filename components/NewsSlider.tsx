import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import { useState, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';

interface NewsSlide {
  id: string;
  title: string;
  image: string;
}

interface NewsSliderProps {
  slides: NewsSlide[];
}

const { width } = Dimensions.get('window');

export function NewsSlider({ slides }: NewsSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = width;
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / slideSize);
    setActiveSlide(currentIndex);
  };

  const onPress = (params: any) => {
    router.push({
      pathname: '/detail',
      params,
    });
  };

  return (
    <View style={styles.sliderContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide) => (
          <Pressable
            key={slide.id}
            onPress={() => onPress({ ...slide, name: slide.title })}
          >
            <View style={[styles.slideContainer, { width }]}>
              <Animated.Image
                sharedTransitionTag={slide.id}
                source={{ uri: slide.image }}
                style={styles.slideImage}
              />
              <View style={styles.slideOverlay}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'relative',
    height: 200,
  },
  slideContainer: {
    height: 200,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slideOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  slideTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
});
