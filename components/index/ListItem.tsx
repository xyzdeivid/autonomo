import { moneyFormat } from '@/utils/common'
import { Text, StyleSheet } from 'react-native'

interface ListItemProps {
    name: string
    value: number
}

export function ListItem({ name, value }: ListItemProps) {

    return (
        <Text style={styles.item}>
            <Text style={{ fontWeight: '500' }}>{name}:</Text> {moneyFormat(value)}
        </Text>
    )

}


const styles = StyleSheet.create({

    item: {
        fontSize: 16,
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#0000001A'
    }

})