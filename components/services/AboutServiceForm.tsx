import { View, Text, StyleSheet, Alert } from 'react-native'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActualStock from './ActualStock'
import EditStockInput from './EditStockInput'
import ConfirmDelete from '../common/ConfirmDelete'

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

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const editValue = async () => {

        if (value) {

            const remainingServices = services.filter(current => {
                return current !== service
            })

            const editedService: Service = {
                category: service.category,
                _id: service._id,
                value: value,
                amount: service.amount
            }

            try {

                if (remainingServices[0]) {

                    await AsyncStorage.setItem('services', JSON.stringify([...remainingServices, editedService]))

                    setServices(orderServices([...remainingServices, editedService]))

                    setEditValueInput(false)

                } else {

                    await AsyncStorage.setItem('services', JSON.stringify([editedService]))

                    setServices([editedService])

                    setEditValueInput(false)

                }


            } catch (error) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        } else {

            setEditValueInput(false)

        }

    }

    const editStock = async () => {

        if (stock) {

            const remainingServices = services.filter(current => {
                return current !== service
            })

            const editedService: Service = {
                category: service.category,
                _id: service._id,
                value: service.value,
                amount: stock
            }

            try {

                if (remainingServices[0]) {

                    await AsyncStorage.setItem('services', JSON.stringify([...remainingServices, editedService]))

                    setServices(orderServices([...remainingServices, editedService]))

                    setEditStockInput(false)

                } else {

                    await AsyncStorage.setItem('services', JSON.stringify([editedService]))

                    setServices([editedService])

                    setEditStockInput(false)

                }


            } catch (error) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        } else {

            setEditStockInput(false)

        }

    }

    return (
        <FormContainer setFormOff={setFormOff}>
            <FormBody>
                <FormTitle text={service._id} />
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
                                setHideTabBar(false)
                            }}
                            setConfirmDelete={setConfirmDelete}
                        />
                }
            </FormBody>
        </FormContainer>
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