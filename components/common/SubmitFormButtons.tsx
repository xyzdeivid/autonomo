import { Pressable, View, StyleSheet, Button } from 'react-native'
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
        <>
            <View style={styles.buttonsContainer}>
                <Button color='darkgreen' title={submitButtonText} onPress={() => {
                    submit()
                    setHideTabBar(false)
                }} />
                <Pressable onPress={() => {
                    setFormOff(false)
                    setHideTabBar(false)
                }} style={styles.button}>
                    <AntDesign name='close' size={24} color='darkred' />
                </Pressable>
            </View></>
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