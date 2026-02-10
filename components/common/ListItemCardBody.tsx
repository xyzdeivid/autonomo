import { useGetTheme } from '@/hooks/common/useGetTheme'
import { StyleSheet, View } from 'react-native'

interface ListItemCardBodyProps {
    children: React.ReactNode
}

export function ListItemCardBody({ children }: ListItemCardBodyProps) {

    const theme = useGetTheme()

    return (
        <View style={{
            ...styles.body,
            backgroundColor: theme === 'dark' ? '#202020' : '#FFF'
            }}>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({

    body: {
        paddingTop: 24,
        paddingHorizontal: 16
    }

})