import { HideTabBarContext } from '@/context/HideTabBar'
import { useContext } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

interface FormContainerProps {
    children: React.ReactNode
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormContainer({ children, setFormOff }: FormContainerProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    const closeForm = (key: string) => {
        if (key !== 'body') {
            setFormOff(false)
            setHideTabBar(false)
        }
    }

    return (
        <Pressable onPress={() => closeForm('container')} style={style.container}>
            <Pressable onPress={() => closeForm('body')}>
                {children}
            </Pressable>
            <Text style={style.closeFormWarning}>Clique em qualquer lugar da tela para sair</Text>
        </Pressable>
    )

}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        opacity: 0.9,
    },
    closeFormWarning: {
        fontSize: 10,
        position: 'absolute',
        bottom: 0,
        marginBottom: 8
    }
})