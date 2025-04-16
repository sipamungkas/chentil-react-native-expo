import { Stack } from 'expo-router';
import { useAuth } from '../context/auth';

export default function AppLayout() {
  const { user } = useAuth();

  // If there's no user, we shouldn't render this layout
  if (!user) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Stack>
  );
} 