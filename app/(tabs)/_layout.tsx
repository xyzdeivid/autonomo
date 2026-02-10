import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/common/CustomBar'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useGetTheme } from '@/hooks/common/useGetTheme'

export default function Layout() {

    const theme = useGetTheme()

    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={() => ({
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#000' : '#FFF',
                    borderBottomColor: theme === 'dark' ? '#303030' : 'transparent',
                    borderBottomWidth: StyleSheet.hairlineWidth
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

const styles = StyleSheet.create({

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'flex-start'
    },

    logoText: {
        fontSize: 20,
        marginStart: -4,
        color: '#06687E',
        marginBottom: 0.5
    }

})