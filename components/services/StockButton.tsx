import { Pressable, StyleSheet, Text, View } from 'react-native'

interface StockButtonProps {
    stock: boolean
    setStock: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StockButton({ stock, setStock }: StockButtonProps) {

    return (
        <View style={styles.container}>
            <Text style={{ color: '#330066', fontWeight: 'bold' }}>
                Estoque
            </Text>
            <Pressable
                style={{
                    ...styles.box,
                    backgroundColor: stock ? '#330066' : 'transparent'
                }}
                onPress={() => {
                    setStock(stock => !stock)
                }}
            />
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    },

    box: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#330066',
        marginStart: 4,
        borderRadius: 5
    }

})