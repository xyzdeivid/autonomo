import { StyleSheet, View } from 'react-native'
import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext } from '@/context/DocsContext'
import ServicesList from '@/components/services/ServicesList'
import EditServiceForm from '@/components/services/EditServiceForm'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [editServiceForm, setEditServiceForm] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState('')
    const [services] = useContext(DocsContext).services

    return (
        <View style={styles.container}>
            {
                services[0]
                    ? <ServicesList setEditServiceForm={setEditServiceForm} setServiceForDeletion={setServiceForDeletion}/>
                    : <AnyItemWarning />
            }
            {
                addServiceForm
                    ? <AddServiceForm setAddServiceForm={setAddServiceForm} />
                    : <AddItemButton setForm={setAddServiceForm} />
            }
            {
                editServiceForm
                    ? <EditServiceForm service={serviceForDeletion} />
                    : null
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