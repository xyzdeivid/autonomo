import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ResaleButtonProps {
    resale: boolean
    setResale: React.Dispatch<React.SetStateAction<boolean>>
    whichButtonPressed: string
    setWhichButtonPressed: React.Dispatch<React.SetStateAction<string>>
}

export default function ResaleButton({ resale, setResale, whichButtonPressed, setWhichButtonPressed }: ResaleButtonProps) {

    const showButton = () => {

        if (whichButtonPressed === 'resale' || whichButtonPressed === '') {

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
                            style={styles.container}
                            onPress={() => {
                                if (!resale) {
                                    setResale(true)
                                    setWhichButtonPressed('resale')
                                }
                            }}
                        >
                            <Text style={{ color: '#330066', fontWeight: 'bold', fontSize: 20 }}>Revenda</Text>
                            {
                                whichButtonPressed !== 'resale' && (
                                    <Text style={styles.text}>
                                        Selecione caso você compre o produto de um fornecedor para revendê-lo posteriormente.
                                    </Text>
                                )
                            }
                            {
                                resale && (
                                    <Pressable 
                                        style={styles.comeBackButtonContainer}
                                        onPress={() => {
                                            setResale(false)
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

    container: {
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