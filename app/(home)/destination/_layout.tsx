import { Stack } from 'expo-router';

export default function DestinationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[island]" />
      <Stack.Screen name="[island]/[id]" />
    </Stack>
  );
}