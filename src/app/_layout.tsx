import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          animation: 'fade',
          contentStyle: { backgroundColor: colors.navy950 },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
      </Stack>
    </SafeAreaProvider>
  );
}
