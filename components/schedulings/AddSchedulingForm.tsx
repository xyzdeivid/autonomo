import React, { useContext, useState } from 'react'
import { StyleSheet, Text, Alert } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext } from '@/context/DocsContext'
import { Entry, Item } from '@/types'
import { FormDateField } from '../common/FormDateField'
import SelectServiceInput from './SelectServiceInput'
import { warning } from '@/functions/common'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { createNewEntry, getServices } from '@/functions/schedulings'
import { FormAmountField } from '../common/FormAmountField'
import { FormValueField } from '../common/FormValueField'
import LoadingScreen from '../common/LoadingScreen'
import { FormNameField } from '../common/FormNameField'
import useAddEntry from '@/hooks/useAddEntry'
import SaveButton from '../common/SaveButton'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [services] = useContext(DocsContext).items
    const [service, setService] = useState<Item>(getServices(services)[0])

    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [costumerName, setCustomerName] = useState('')

    const addEntry = useAddEntry().addEntry

    const checkAllInputs = (): boolean => {

        switch (service.category) {

            case 'product':
                if (amount) return true
                return false

            case 'service':
                return true

            case 'budget':
                if (value) return true
                return false

            default:
                return false

        }

    }

    const checkAmount = (product: Item) => {

        if (product.isThereAmount) {

            let actualServiceAmount = 0
            if (service.amount) {
                actualServiceAmount = service.amount - amount
            }

            if (actualServiceAmount < 0) {

                return false

            }

            return true

        }

        return true

    }

    const getCurrentDate = () => {
        const year = new Date().getFullYear()
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const day = String(new Date().getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const addScheduling = async () => {

        if (!checkAllInputs()) {

            Alert.alert('Todos os campos precisam ser preenchidos')
            return

        }

        const currentDate = new Date(getCurrentDate())
        const entryDate = new Date(date)

        if (entryDate > currentDate) {

            warning('Não é possível registrar entradas em datas futuras', setLoadingScreen)
            return

        }

        if (!checkAmount(service)) {

            warning('Produto sem estoque', setLoadingScreen)
            return
        }

        setLoadingScreen(true)

        const newScheduling: Entry = createNewEntry(service, amount, value, date, costumerName)

        const productToUpdate = services.find(service => service._id === newScheduling.serviceId)

        await addEntry(newScheduling, productToUpdate)

        setAddSchedulingForm(false)
        setHideTabBar(false)
        setLoadingScreen(false)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle
                    text='Nova Receita'
                    onCloseFormButtonPress={() => setAddSchedulingForm(false)}
                    textColor='#006600'
                />
                <SelectServiceInput
                    service={service}
                    setService={setService}
                    services={getServices(services)}
                    amount={service.amount ? service.amount - amount : undefined}
                />
                <FormNameField
                    setName={setCustomerName}
                    label='Cliente:'
                    bgColor='#0066001a'
                    textColor='#006600'
                />
                <FormDateField
                    setTargetDate={setDate}
                    bgColor='#00660080'
                    textColor='#006600'
                    borderBottomColor='#0066001a'
                />
                {service.category === 'product' && (
                    <FormAmountField
                        text='* Quantidade:'
                        setAmount={setAmount}
                        bgColor='rgba(0, 102, 0, 0.1)'
                        textColor='#006600'
                    />
                )}
                {
                    service.category === 'budget' && (
                        <FormValueField
                            label='* Valor:'
                            setValue={setValue}
                            bgColor='rgba(0, 102, 0, 0.1)'
                            textColor='#006600'
                        />
                    )
                }
                {
                    service.category !== 'service' && (
                        <Text style={styles.infoText}>* campo obrigatório</Text>
                    )
                }
                {
                    checkAllInputs() && (
                        <SaveButton color='#006600' onPress={addScheduling} />
                    )
                }
            </FormContainer>
        </>
    )

}

const styles = StyleSheet.create({
    infoText: {
        color: 'rgba(0, 102, 0, 0.5)',
        fontSize: 12,
        marginBottom: 20
    }
})