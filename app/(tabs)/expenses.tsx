import { View } from 'react-native'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'

export default function Expenses() {
    return (
        <View>
            <AnyItemWarning />
            <AddItemButton />
        </View>
    )
}