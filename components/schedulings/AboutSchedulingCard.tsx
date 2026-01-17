import { Animated, BackHandler, Dimensions } from 'react-native'
import { Entry } from '@/types'
import { moneyFormat } from '@/functions/common'
import { useEffect, useRef, useState } from 'react'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import AddClienteButton from './AddClienteButton'
import ActualCustomer from './ActualCustomer'
import useAddCustomerName from '@/hooks/useAddCustomerName'
import useEditCustomerName from '@/hooks/useEditCustomerName'
import useEditEntryDate from '@/hooks/useEditEntryDate'
import { EditableProperty } from '../common/EditableProperty'
import { EditDateField } from '../common/EditDateField'
import { DeleteListItemButton } from '../common/DeleteListItemButton'
import { colors } from '@/constants/appColors'
import { ListItemCardContainer } from '../common/ListItemCardContainer'
import { ListItemCardHeader } from '../common/ListItemCardHeader'
import { ListItemCardBody } from '../common/ListItemCardBody'

const { height } = Dimensions.get('window')

interface AboutSchedulingCardProps {
    scheduling: Entry
    deleteFunction: (scheduling: Entry) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutSchedulingCard({ scheduling, deleteFunction, setFormOff }: AboutSchedulingCardProps) {

    const slideAnim = useRef(new Animated.Value(height)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [customer, setCustomer] = useState('')

    const [showEditCustomerInput, setShowEditCustomerInput] = useState(false)

    const addCustomerName = useAddCustomerName().addCustomerName
    const editCustomerName = useEditCustomerName().editCustomerName
    const editEntryDate = useEditEntryDate().editEntryDate

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const submitCustomerName = async () => {

        setLoadingPage(true)

        await addCustomerName(scheduling._id, customer)

        setLoadingPage(false)
        setFormOff(false)

    }

    const submitCustomerNameToEdit = async () => {

        setLoadingPage(true)

        await editCustomerName(scheduling._id, customer)

        setLoadingPage(false)
        setShowEditCustomerInput(false)

    }

    const editDate = async (newDate: string) => {

        setLoadingPage(true)

        await editEntryDate(newDate, scheduling._id)

        setLoadingPage(false)

    }

    return (
        <>
            {loadingPage && <LoadingScreen />}
            <ListItemCardContainer bgColor={colors.entries.min}>
                <Animated.View
                    style={{ transform: [{ translateY: slideAnim }] }}
                >
                    <ListItemCardHeader
                        text='Detalhes de Receita'
                        bgColor={colors.entries.max}
                        onCloseCardButton={() => setFormOff(false)}
                    />
                    <ListItemCardBody>
                        {
                            scheduling.customer
                                ? <ActualCustomer
                                    customer={scheduling.customer}
                                    setNewCustomerName={setCustomer}
                                    newCustomerName={customer}
                                    editCustomerName={submitCustomerNameToEdit}
                                    showEditInput={showEditCustomerInput}
                                    setShowEditInput={setShowEditCustomerInput}
                                />
                                : <AddClienteButton
                                    setCustomer={setCustomer}
                                    customer={customer}
                                    addCustomer={submitCustomerName}
                                />
                        }
                        <EditableProperty
                            label='Produto/Serviço: '
                            propertyName={scheduling.serviceId}
                            isEditable={false}
                            bgColor={colors.entries.min}
                            borderColor={colors.entries.mid}
                        />
                        <EditDateField
                            defaultValue={scheduling.date}
                            editDate={editDate}
                            bgColor={colors.entries.min}
                            borderColor={colors.entries.mid}
                        />
                        <EditableProperty
                            label='Valor: '
                            propertyName={moneyFormat(scheduling.serviceValue)}
                            isEditable={false}
                            bgColor={colors.entries.min}
                            borderColor={colors.entries.mid}
                        />
                        {
                            (scheduling.serviceAmount && scheduling.serviceCategory === 'product') ? (
                                <>
                                    <EditableProperty
                                        label='Valor (un): '
                                        propertyName={moneyFormat(scheduling.serviceValue / scheduling.serviceAmount)}
                                        isEditable={false}
                                        bgColor={colors.entries.min}
                                        borderColor={colors.entries.mid}
                                    />
                                    <EditableProperty
                                        label='Quantidade: '
                                        propertyName={String(scheduling.serviceAmount)}
                                        isEditable={false}
                                        bgColor={colors.entries.min}
                                        borderColor={colors.entries.mid}
                                    />
                                </>
                            ) : null
                        }
                        <DeleteListItemButton onPress={() => setConfirmDelete(true)} />
                    </ListItemCardBody>
                </Animated.View>
            </ListItemCardContainer>
            {
                confirmDelete && (
                    <ConfirmDelete
                        name={scheduling.serviceId}
                        deleteFunction={() => {
                            deleteFunction(scheduling)
                        }}
                        setConfirmDelete={setConfirmDelete}
                    />
                )
            }
        </>
    )

}