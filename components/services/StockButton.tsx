import { Pressable, StyleSheet, Text, View } from 'react-native'

interface StockButtonProps {
    stock: boolean
    setStock: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StockButton({ stock, setStock }: StockButtonProps) {

    const getText = () => {
        return stock
        ? 'possua estoque'
        : 'seja vendido por encomenda'
    }

    return (
        <View style={{ marginBottom: 20 }}>
        <View style={styles.buttonsContainer}>
            <Pressable style={{
                ...styles.button,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                backgroundColor: stock ? '#330066' : '#6600CC'
            }}
                onPress={() => setStock(true)}
            >
                <Text style={styles.textButton}>Estoque</Text>
            </Pressable>
            <Pressable style={{
                ...styles.button,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                backgroundColor: stock ? '#6600CC' : '#330066'
            }}
                onPress={() => setStock(false)}
            >
                <Text style={styles.textButton}>Encomenda</Text>
            </Pressable>
        </View>
        <Text style={styles.text}>Caso seu produto {getText()}.</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },

    button: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },

    textButton: {
        color: 'white',
        fontSize: 12
    },

    text: {
        color: 'rgba(51, 0, 102, 0.5)',
        fontSize: 12,
        marginTop: 2
    }

})