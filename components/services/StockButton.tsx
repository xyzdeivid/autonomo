import { Pressable, StyleSheet, Text, View } from 'react-native'

interface StockButtonProps {
    stock: boolean
    setStock: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StockButton({ stock, setStock }: StockButtonProps) {

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.buttonContainer}>
                <Text style={{ color: '#330066', fontWeight: 'bold', fontSize: 14 }}>Estoque</Text>
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
            <Text style={styles.text}>Preencha caso o seu produto possua estoque.</Text>
            <Text style={styles.text}>Caso ele seja vendido por encomenda, basta avançar para a próxima etapa.</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    buttonContainer: {
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
        color: '#330066',
        marginTop: 2
    }

})