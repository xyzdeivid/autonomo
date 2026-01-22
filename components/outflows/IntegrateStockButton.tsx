import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { colors } from '@/styles/appColors'

interface IntegrateStockButtonProps {
    setStockIntegrate: React.Dispatch<React.SetStateAction<boolean>>
}

export default function IntegrateStockButton({ setStockIntegrate }: IntegrateStockButtonProps) {

    const [active, setActive] = useState(false)

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
                <Text style={styles.buttonText}>Reposição de Estoque</Text>
                <Pressable
                    style={{
                        ...styles.box,
                        backgroundColor: active ? colors.outflows.max : 'transparent'
                    }}
                    onPress={() => {
                        setActive(!active)
                        setStockIntegrate(stockIntegrate => !stockIntegrate)
                    }}
                />
            </View>
            <Text style={styles.warningText}>Caso você esteja repondo o estoque de algum produto.</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    box: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.outflows.max,
        marginStart: 4,
        borderRadius: 5
    },
    buttonText: {
        fontWeight: 'bold',
        color: colors.outflows.max
    },
    warningText: {
        color: colors.outflows.mid,
        fontSize: 12,
        marginTop: 2
    }
})