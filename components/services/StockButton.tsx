import { Pressable, StyleSheet, Text, View } from 'react-native'

interface StockButtonProps {
    stock: boolean
    setStock: React.Dispatch<React.SetStateAction<boolean>>
    whichButtonPressed: string
    setWhichButtonPressed: React.Dispatch<React.SetStateAction<string>>
}

export default function StockButton({ stock, setStock, whichButtonPressed, setWhichButtonPressed }: StockButtonProps) {

    const showButton = () => {

        if (whichButtonPressed === 'stock' || whichButtonPressed === '') {

            return true

        }

        return false

    }

    return (
        <>
            {
                showButton() && (
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
                                    if (whichButtonPressed === 'stock') {
                                        setWhichButtonPressed('')
                                    } else {
                                        setWhichButtonPressed('stock')
                                    }
                                }}
                            />
                        </View>
                        {
                            whichButtonPressed !== 'stock' && (
                                <Text style={styles.text}>
                                    Preencha caso você mesmo fabrique seu produto e ele possua estoque. Caso seja vendido por encomenda, basta avançar para a próxima etapa.
                                </Text>
                            )
                        }
                    </View>
                )
            }
        </>
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