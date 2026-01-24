import { View, Text } from 'react-native'

export function InitialLoading() {

    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 64 }}>. . .</Text>
        </View>
    )

}