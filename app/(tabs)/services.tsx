import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)

    return (
        <View style={styles.container}>
            <AnyItemWarning />
            {
                addServiceForm
                    ? <AddServiceForm setAddServiceForm={setAddServiceForm} />
                    : <AddItemButton setForm={setAddServiceForm} />
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})