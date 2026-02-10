import { DataTable } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface DataTableItemProps {
    text: string
    header: boolean
    onPress?: () => void
}

export function DataTableItem({ text, header, onPress }: DataTableItemProps) {

    const theme = useGetTheme()

    return (
        <>
            {
                header && (
                    <DataTable.Title
                        style={styles.text}
                        textStyle={{
                            color: theme === 'dark' ? '#FFF' : '#000'
                        }}
                    >
                        {text}
                    </DataTable.Title>
                )
            }
            {
                !header && (
                    <DataTable.Cell
                        style={styles.text}
                        textStyle={{
                            color: theme === 'dark' ? '#FFF' : '#000'
                        }}
                        onPress={onPress}
                    >
                        {text}
                    </DataTable.Cell>
                )
            }
        </>
    )

}

const styles = StyleSheet.create({

    text: {
        justifyContent: 'center'
    }

})