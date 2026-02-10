import { useGetTheme } from '@/hooks/common/useGetTheme'
import { View } from 'react-native'

export default function Container({ children }: { children: React.ReactNode }) {

    const theme = useGetTheme()

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme === 'dark' ? '#151515' : '#FFF'
        }}>
            {children}
        </View>
    )

}