import { FontAwesome6 } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import { StyleSheet, Pressable, Text, Animated } from 'react-native'

interface AddItemFormProps {
    setAddItemsForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddItemForm({ setAddItemsForm }: AddItemFormProps) {

    const slideAnim = useRef(new Animated.Value(1000)).current

    useEffect(() => {

        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start()

    }, [])

    const closeForm = (element: string) => {
        if (element !== 'button-container')
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 1000,
                    duration: 250,
                    useNativeDriver: true
                }),
            ]).start(() => {
                setAddItemsForm(false)
            })
    }

    return (
        <Animated.View
            style={{
                ...styles.container,
                transform: [{ translateX: slideAnim }]
            }}>
            <Pressable
                style={styles.container}
                onPress={() => closeForm('container')}
            >
                <Pressable
                    style={styles.buttonsContainer}
                    onPress={() => closeForm('button-container')}
                >
                    <Pressable style={{
                        ...styles.button,
                        backgroundColor: '#006600'
                        }}>
                        <Text style={styles.text}>Nova Entrada</Text>
                        <FontAwesome6 name='arrow-trend-up' size={16} color='#FFFFFF' />
                    </Pressable>
                    <Pressable style={{ 
                        ...styles.button, 
                        marginVertical: 8 ,
                        backgroundColor: '#660000'
                        }}>
                        <Text style={styles.text}>Nova Saída</Text>
                        <FontAwesome6 name='arrow-trend-down' size={16} color='#FFFFFF' />
                    </Pressable>
                    <Pressable style={{
                        ...styles.button,
                        backgroundColor: '#112935'
                        }}>
                        <Text style={styles.text}>Novo Item</Text>
                        <FontAwesome6 name='bag-shopping' size={16} color='#FFFFFF' />
                    </Pressable>
                </Pressable>
            </Pressable>
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        display: 'flex',
        flexDirection: 'column',
        margin: 10
    },
    button: {
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        marginEnd: 8,
        color: '#FFFFFF'
    }
})