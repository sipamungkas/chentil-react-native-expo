import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Heart, User, HomeIcon } from 'lucide-react-native';

const tabBarStyle = Platform.select({
  ios: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#FFE4E8',
  },
  android: {
    backgroundColor: '#fff',
    elevation: 8,
  },
  default: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#FFE4E8',
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle,
        tabBarActiveTintColor: '#FF4D8D',
        tabBarInactiveTintColor: '#FFA6C1',
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans-Medium',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
