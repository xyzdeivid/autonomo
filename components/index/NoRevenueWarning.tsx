import { useGetTheme } from '@/hooks/common/useGetTheme'
import { Text } from 'react-native'

export function NoRevenueWarning({ text }: { text: string }) {

    const theme = useGetTheme()

    return (
        <Text style={{ color: theme === 'dark' ? '#FFF' : '#000' }}>{text}</Text>
    )

}