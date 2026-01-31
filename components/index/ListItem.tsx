import { moneyFormat } from '@/utils/common'
import { Text, StyleSheet } from 'react-native'

interface ListItemProps {
    name: string
    value: number
    money: boolean
}

export function ListItem({ name, value, money }: ListItemProps) {

    return (
        <Text style={styles.item}>
            <Text style={{ fontWeight: '500' }}>{name}: </Text>
            {money ? moneyFormat(value) : value}
        </Text>
    )

}


const styles = StyleSheet.create({

    item: {
        fontSize: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#0000001A'
    }

})