import { View, Text, StyleSheet, Pressable, Button, TextInput, Alert } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Service } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'
import { checkTitle, orderServices } from '@/functions/services'
import NumberInput from '../common/NumberInput'
import EditValueInput from './EditValueInput'
import ActualValue from './ActualValue'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text={`Sobre ${checkTitle(service)}`} />
                <View>
                    <View style={{ ...styles.inputContainer, ...styles.infoContainer }}>
                        <Text style={styles.label}>{checkTitle(service)}: </Text>
                        <Text>{service._id}</Text>
                    </View>
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
                    {
                        service.category === 'product' && (
                            <View style={styles.inputContainer}>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>Estoque: </Text>
                                    <Text>{service.amount}</Text>
                                    <Pressable style={styles.editButton}>
                                        <Text>Editar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }
                </View>
                <SubmitFormButtons
                    submit={() => deleteFunction(service._id)}
                    setFormOff={setFormOff}
                    submitButtonText='Excluir'
                    submitButtonColor='darkred'
                />
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