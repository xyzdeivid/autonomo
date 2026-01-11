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
                        <View style={styles.container}>
                            <Text style={{ color: '#330066', fontWeight: 'bold', fontSize: 14 }}>Revenda</Text>
                            <Pressable
                                style={{
                                    ...styles.box,
                                    backgroundColor: resale ? '#330066' : 'transparent'
                                }}
                                onPress={() => {
                                    setResale(resale => !resale)
                                    if (whichButtonPressed === 'resale') {
                                        setWhichButtonPressed('')
                                    } else {
                                        setWhichButtonPressed('resale')
                                    }
                                }}
                            />
                        </View>
                        {
                            !(whichButtonPressed === 'resale') && (
                                <Text style={styles.text}>
                                    Preencha caso você compre o produto de um fornecedor para revendê-lo posteriormente.
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
        color: '#330066',
        marginTop: 2
    }
})