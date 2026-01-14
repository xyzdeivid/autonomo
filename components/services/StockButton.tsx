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
                        <Pressable
                            style={styles.buttonContainer}
                            onPress={() => {
                                if (!stock) {
                                    setStock(true)
                                    setWhichButtonPressed('stock')
                                }
                            }}
                        >
                            <Text style={{ color: '#330066', fontWeight: 'bold', fontSize: 20 }}>Estoque</Text>
                            {
                                whichButtonPressed !== 'stock' && (
                                    <Text style={styles.text}>
                                        Selecione caso você mesmo fabrique seu produto e ele possua estoque.
                                    </Text>
                                )
                            }
                            {
                                stock && (
                                    <Pressable
                                        style={styles.comeBackButtonContainer}
                                        onPress={() => {
                                            setStock(false)
                                            setWhichButtonPressed('')
                                        }}
                                    >
                                        <Text style={styles.comeBackButtonText}>Voltar</Text>
                                    </Pressable>
                                )
                            }
                        </Pressable>

                    </View>
                )
            }
        </>
    )

}

const styles = StyleSheet.create({

    buttonContainer: {
        display: 'flex',
        backgroundColor: '#6600CC1A',
        padding: 12,
        borderRadius: 6
    },

    text: {
        color: '#330066',
        marginTop: 2
    },

    comeBackButtonContainer: {
        display: 'flex', 
        justifyContent: 'center', 
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        right: 12
    },

    comeBackButtonText: {
        backgroundColor: '#330066', 
        padding: 4, 
        borderRadius: 4, 
        fontWeight: 'bold', 
        color: 'white'
    }

})