import { useGetTheme } from '@/hooks/common/useGetTheme'
import { FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

interface CloseFormButtonProps {
    onPress: () => void
    color: string
}

export function CloseFormButton({ onPress, color }: CloseFormButtonProps) {

    const theme = useGetTheme()

    return (
        <TouchableOpacity
            onPress={onPress}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
            <FontAwesome6 name='xmark' size={24} color={theme === 'dark' ? '#FFF' : color} />
        </TouchableOpacity>
    )

}