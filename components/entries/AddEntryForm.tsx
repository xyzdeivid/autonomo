import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, Text } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext } from '@/context/DocsContext'
import { Entry, Item } from '@/types'
import { FormDateField } from '../common/FormDateField'
import SelectServiceInput from './SelectItemInput'
import { createNewEntry, getServices } from '@/functions/schedulings'
import { FormAmountField } from '../common/FormAmountField'
import { FormValueField } from '../common/FormValueField'
import LoadingScreen from '../common/LoadingScreen'
import { FormNameField } from '../common/FormNameField'
import useAddEntry from '@/hooks/useAddEntry'
import SaveButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'
import { getErrorMessage } from '@/functions/common'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

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

    const addScheduling = async () => {

        setLoadingScreen(true)

        const newScheduling: Entry = createNewEntry(service, amount, value, date, costumerName)

        const productToUpdate = services.find(service => service._id === newScheduling.serviceId)

        const result = await addEntry(newScheduling, productToUpdate)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setAddSchedulingForm(false)
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
                    textColor={colors.entries.max}
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
                    bgColor={colors.entries.min}
                    textColor={colors.entries.max}
                />
                <FormDateField
                    setTargetDate={setDate}
                    bgColor={colors.entries.max}
                    textColor={colors.entries.max}
                    borderBottomColor={colors.entries.min}
                />
                {
                    service.category === 'product' ? (
                        <FormAmountField
                            text='* Quantidade:'
                            setAmount={setAmount}
                            bgColor={colors.entries.min}
                            textColor={colors.entries.max}
                        />
                    ) : null
                }
                {
                    service.category === 'budget' ? (
                        <FormValueField
                            label='* Valor:'
                            setValue={setValue}
                            bgColor={colors.entries.min}
                            textColor={colors.entries.max}
                        />
                    ) : null
                }
                {
                    service.category !== 'service' ? (
                        <Text style={styles.infoText}>* campo obrigatório</Text>
                    ) : null
                }
                {
                    checkAllInputs() ? (
                        <SaveButton color={colors.entries.max} onPress={addScheduling} />
                    ) : null
                }
            </FormContainer>
        </>
    )

}

const styles = StyleSheet.create({
    infoText: {
        color: colors.entries.mid,
        fontSize: 12,
        marginBottom: 20
    }
})