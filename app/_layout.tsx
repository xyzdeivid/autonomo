import 'react-native-reanimated'
import { Stack } from 'expo-router'

import DocsProvider from '@/context/DocsContext'
import ThemeProvider from '@/context/ThemeContext'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

  return (
    <DocsProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </DocsProvider>
  )
}