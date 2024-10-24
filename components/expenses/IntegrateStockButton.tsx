import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

interface IntegrateStockButtonProps {
    setStockIntegrate: React.Dispatch<React.SetStateAction<boolean>>
}

export default function IntegrateStockButton({ setStockIntegrate }: IntegrateStockButtonProps) {

    const [active, setActive] = useState(false)

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
                <Text>Reposição de Estoque</Text>
                <Pressable
                    style={{
                        ...styles.box,
                        backgroundColor: active ? '#660000' : 'transparent'
                    }}
                    onPress={() => {
                        setActive(!active)
                        setStockIntegrate(stockIntegrate => !stockIntegrate)
                    }}
                />
            </View>
            <Text style={styles.text}>Preencha se a saída for a reposição do estoque de algum produto.</Text>
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
        borderColor: '#330066',
        marginStart: 4,
        borderRadius: 5
    },
    text: {
        color: 'gray',
        fontSize: 12,
        marginTop: 2
    }
})