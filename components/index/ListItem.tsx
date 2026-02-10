import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'
import { moneyFormat } from '@/utils/common'
import { Text, StyleSheet } from 'react-native'

interface ListItemProps {
    name: string
    value: number
    money: boolean
}

export function ListItem({ name, value, money }: ListItemProps) {

    const theme = useGetTheme()

    return (
        <Text
            style={{
                ...styles.item,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light,
                borderBottomColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light
            }}
        >
            <Text style={{ fontWeight: '500' }}>{name}: </Text>
            {money ? moneyFormat(value) : value}
        </Text>
    )

}


const styles = StyleSheet.create({

    item: {
        fontSize: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth
    }

})