import { Item } from '@/context/DocsContext'
import { getServices } from '@/functions/schedulings'
import { FontAwesome6 } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import { StyleSheet, Pressable, Text, Animated, Alert } from 'react-native'

interface AddItemFormProps {
    setGeneralButton: React.Dispatch<React.SetStateAction<boolean>>
    setAddItemsForm: React.Dispatch<React.SetStateAction<boolean>>
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    services: Item[]
}

export default function AddItemForm({ setGeneralButton, setAddItemsForm,
    setAddExpenseForm, setAddSchedulingForm, services }: AddItemFormProps) {

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
                setGeneralButton(true)
            })
    }

    const showAlert = () => {
        Alert.alert('Sem item disponível', 'Verifique se você tem algum item ou estoque disponível.')
        setGeneralButton(true)
    }

    const checkServices = () => {
        getServices(services)[0]
            ? setAddSchedulingForm(true)
            : showAlert()
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
                    <Pressable
                        style={{
                            ...styles.button,
                            borderColor: '#006600',
                            backgroundColor: 'rgba(0, 102, 0, 0.1)'
                        }}
                        onPress={() => {
                            setAddItemsForm(false)
                            checkServices()
                        }}
                    >
                        <Text style={{
                            ...styles.text,
                            color: '#006600'
                        }}>
                            Nova Entrada
                        </Text>
                        <FontAwesome6 name='arrow-trend-up' size={16} color='#006600' />
                    </Pressable>
                    <Pressable
                        style={{
                            ...styles.button,
                            marginVertical: 8,
                            borderColor: '#660000',
                            backgroundColor: 'rgba(102, 0, 0, 0.1)'
                        }}
                        onPress={() => {
                            setAddItemsForm(false)
                            setAddExpenseForm(true)
                        }}
                    >
                        <Text style={{
                            ...styles.text,
                            color: '#660000'
                        }}>
                            Nova Saída
                        </Text>
                        <FontAwesome6 name='arrow-trend-down' size={16} color='#660000' />
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
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1
    },
    text: {
        marginEnd: 8
    }
})