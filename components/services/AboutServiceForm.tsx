import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Service } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { useContext, useEffect, useState } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'
import { orderServices } from '@/functions/services'
import EditValueInput from './EditValueInput'
import ActualValue from './ActualValue'
import ActualStock from './ActualStock'
import EditStockInput from './EditStockInput'
import ConfirmDelete from '../common/ConfirmDelete'
import Entypo from '@expo/vector-icons/Entypo'
import LoadingScreen from '../common/LoadingScreen'

interface DeleteServiceFormProps {
    service: Service
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteServiceForm({ service, deleteFunction, setFormOff }: DeleteServiceFormProps) {

    const [services, setServices] = useContext(DocsContext).services

    const [, setHideTabBar] = useContext(HideTabBarContext)

    const [editValueInput, setEditValueInput] = useState(false)
    const [value, setValue] = useState(0)

    const [editStockInput, setEditStockInput] = useState(false)
    const [stock, setStock] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const editValue = () => {

        if (value) {

            setLoadingScreen(true)

            const remainingServices = services.filter(current => {
                return current._id !== service._id
            })

            const editedService: Service = {
                category: service.category,
                _id: service._id,
                value: value,
                amount: service.amount
            }

            if (remainingServices[0]) {

                setTimeout(() => {
                    setServices(orderServices([...remainingServices, editedService]))
                    setFormOff(false)
                }, 500)

            } else {

                setTimeout(() => {
                    setServices([editedService])
                    setFormOff(false)
                }, 500)

            }

            setTimeout(() => setHideTabBar(false), 500)

        } else {

            setEditValueInput(false)

        }

    }

    const editStock = () => {

        if (stock) {

            setLoadingScreen(true)

            const remainingServices = services.filter(current => {
                return current._id !== service._id
            })

            const editedService: Service = {
                category: service.category,
                _id: service._id,
                value: service.value,
                amount: stock
            }

            if (remainingServices[0]) {

                setTimeout(() => {
                    setServices(orderServices([...remainingServices, editedService]))
                    setFormOff(false)
                }, 500)

            } else {

                setTimeout(() => {
                    setServices([editedService])
                    setFormOff(false)
                }, 500)

            }

            setTimeout(() => setHideTabBar(false), 500)

        } else {

            setEditStockInput(false)

        }

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer setFormOff={setFormOff}>
                <FormBody>
                    <FormTitle text={service._id}>
                        <Entypo name='info' size={18} color='darkgray' />
                    </FormTitle>

                    <View>
                        {service.category !== 'budget' && (
                            <View style={styles.inputContainer}>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>Valor:</Text>
                                    {
                                        editValueInput
                                            ? <EditValueInput setValue={setValue} editValue={editValue} />
                                            : <ActualValue value={value || service.value} setEditValueInput={setEditValueInput} />
                                    }
                                </View>
                            </View>
                        )}
                        {
                            service.category === 'product' && (
                                <View style={styles.inputContainer}>
                                    <View style={styles.infoContainer}>
                                        {
                                            editStockInput
                                                ? <EditStockInput setStock={setStock} editStock={editStock} />
                                                : <ActualStock stock={stock || service.amount} setEditStockInput={setEditStockInput} />
                                        }
                                    </View>
                                </View>
                            )
                        }
                    </View>
                    {
                        !confirmDelete
                            ? <SubmitFormButtons
                                submit={() => setConfirmDelete(true)}
                                submitButtonText='Excluir'
                                submitButtonColor='darkred'
                            />
                            : <ConfirmDelete
                                deleteFunction={() => {
                                    deleteFunction(service._id)
                                }}
                                setConfirmDelete={setConfirmDelete}
                            />
                    }
                </FormBody>
            </FormContainer>
        </>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold'
    },
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})