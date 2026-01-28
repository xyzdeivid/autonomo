import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/common/CustomBar'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Layout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={() => ({
                headerShadowVisible: false,
                headerTitleContainerStyle: {
                    width: '100%'
                },
                headerTitle: () => (
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/images/header-icon.png')}
                            style={{ width: 40, height: 40 }}
                            resizeMode='contain'
                        />
                        <Text style={styles.logoText}>utônomo</Text>
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

const BACKGROUND_COLOR = '#F3F3F3'

const styles = StyleSheet.create({

    logoContainer: {
        backgroundColor: BACKGROUND_COLOR,
        padding: 8,
        paddingTop: 6,
        borderRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%'
    },

    logoText: {
        fontSize: 20,
        marginStart: -4,
        color: '#06687E'
    }

})