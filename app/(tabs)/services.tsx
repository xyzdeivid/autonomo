import { StyleSheet, View } from 'react-native'
import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext } from '@/context/DocsContext'
import ServicesList from '@/components/services/ServicesList'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [services] = useContext(DocsContext).services

    return (
        <View style={styles.container}>
            {
                services[0]
                ? <ServicesList />
                : <AnyItemWarning />
            }
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