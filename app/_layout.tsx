import 'react-native-reanimated'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import DocsProvider from '@/context/DocsContext'
import HideTabBarProvider from '@/context/MainDisplays'
import ContentProvider from '@/context/InfoContent'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      setStatusBarStyle('dark')
      setStatusBarBackgroundColor('#FFFFFF')
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <HideTabBarProvider>
      <DocsProvider>
        <ContentProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ContentProvider>
      </DocsProvider>
    </HideTabBarProvider>
  )
}
