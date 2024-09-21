import { Pressable, View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useContext } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'

interface SubmitFormButtonsProps {
    submit: () => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    submitButtonText: string
}

export default function SubmitFormButtons({ submit, setFormOff, submitButtonText }: SubmitFormButtonsProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    return (
        <View style={styles.buttonsContainer}>
            <Pressable onPress={() => {
                submit()
                setHideTabBar(false)
            }} style={{ ...styles.button, backgroundColor: 'darkgreen' }}>
                <Text style={{ color: 'white' }}>{submitButtonText}</Text>
            </Pressable>
            <Pressable onPress={() => {
                setFormOff(false)
                setHideTabBar(false)
                }} style={{ ...styles.button, backgroundColor: 'darkred' }}>
                <AntDesign name='close' size={24} color='white' />
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        padding: 8,
        borderRadius: 3
    }
})