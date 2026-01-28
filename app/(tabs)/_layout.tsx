import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/common/CustomBar'
import { Image, Text, View } from 'react-native'

export default function Layout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={() => ({
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('@/assets/images/header-icon.png')}
                            style={{ width: 40, height: 40 }}
                            resizeMode='contain'
                        />
                        <Text style={{ marginStart: 4, marginTop: 4, fontSize: 20, fontWeight: '600', color: '#06596B' }}>Autônomo</Text>
                    </View>
                )
            })}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="entries" />
            <Tabs.Screen name="outflows" />
            <Tabs.Screen name="items" />
        </Tabs>

    )
}