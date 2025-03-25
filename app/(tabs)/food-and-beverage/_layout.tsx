import { Stack } from 'expo-router';

export default function FoodAndBeverageLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[province]" />
      <Stack.Screen name="[province]/[id]" />
    </Stack>
  );
}