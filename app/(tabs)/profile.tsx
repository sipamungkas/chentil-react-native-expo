import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  MapPin,
  Calendar,
  Star,
  ChevronRight,
  CreditCard as Edit3,
  Bell,
  Shield,
  CreditCard,
  CircleHelp as HelpCircle,
  LogOut,
  Trophy,
  Plane,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { colors } from '@/theme/colors';

const PROFILE_DATA = {
  name: 'Ragil Pamungkas',
  location: 'Jakarta, Indonesia',
  joinDate: 'Member since 2023',
  avatar:
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  stats: [
    { label: 'Trips', value: '12' },
    { label: 'Reviews', value: '28' },
    { label: 'Photos', value: '154' },
  ],
};

const MENU_SECTIONS = [
  {
    title: 'Account Settings',
    items: [
      { icon: Edit3, label: 'Edit Profile', color: '#FF4D8D' },
      { icon: Shield, label: 'Privacy & Security', color: '#FF4D8D' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        icon: Trophy,
        label: 'Challenges',
        color: '#4299E1',
        route: '/challenges',
      },
      { icon: Plane, label: 'Trips', color: '#4299E1', route: 'trips' },
      { icon: HelpCircle, label: 'Help & Support', color: '#4299E1' },
      { icon: LogOut, label: 'Log Out', color: '#E53E3E' },
    ],
  },
];

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Profile</Text>
            <Pressable style={styles.settingsButton}>
              <Settings size={24} color="#1A202C" />
            </Pressable>
          </View>
        </View>

        {/* Profile Card */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={styles.profileCard}
        >
          <Image source={{ uri: PROFILE_DATA.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{PROFILE_DATA.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#4A5568" />
              <Text style={styles.location}>{PROFILE_DATA.location}</Text>
            </View>
            <View style={styles.joinDateRow}>
              <Calendar size={14} color="#4A5568" />
              <Text style={styles.joinDate}>{PROFILE_DATA.joinDate}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {PROFILE_DATA.stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={FadeInDown.delay(300 + index * 100)}
              style={styles.statItem}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section, sectionIndex) => (
          <Animated.View
            key={section.title}
            entering={FadeInDown.delay(600 + sectionIndex * 100)}
            style={styles.menuSection}
          >
            <Text style={styles.menuTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <Pressable
                key={item.label}
                style={styles.menuItem}
                onPress={() => {
                  if (item.route) {
                    router.push(item.route as '/challenges' | '/trips');
                  }
                  // Handle menu item press
                }}
              >
                <View style={styles.menuItemLeft}>
                  <item.icon size={20} color={item.color} />
                  <Text
                    style={[
                      styles.menuItemText,
                      item.label === 'Log Out' && styles.logoutText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                <ChevronRight size={20} color="#A0AEC0" />
              </Pressable>
            ))}
          </Animated.View>
        ))}

        {/* Version Info */}
        <Text style={styles.version}>Version 1.0.0</Text>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: '#1A202C',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#1A202C',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 4,
  },
  joinDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinDate: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#1A202C',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  menuSection: {
    padding: 20,
    paddingBottom: 0,
  },
  menuTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: '#1A202C',
    marginLeft: 12,
  },
  logoutText: {
    color: '#E53E3E',
  },
  version: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#A0AEC0',
    textAlign: 'center',
    marginVertical: 20,
  },
});
