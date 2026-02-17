import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, Text } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext } from '@/context/DocsContext'
import { Entry, Item } from '@/types'
import { FormDateField } from '../common/FormDateField'
import SelectServiceInput from './SelectItemInput'
import { createNewEntry, getServices } from '@/utils/schedulings'
import { FormAmountField } from '../common/FormAmountField'
import { FormValueField } from '../common/FormValueField'
import LoadingScreen from '../common/LoadingScreen'
import { FormNameField } from '../common/FormNameField'
import useAddEntry from '@/hooks/entries/useAddEntry'
import SaveButton from '../common/SaveButton'
import { colors } from '@/styles/appColors'
import { getErrorMessage } from '@/utils/common'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddEntryForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

    const theme = useGetTheme()

    const [services] = useContext(DocsContext).items
    const [service, setService] = useState<Item>(getServices(services)[0])

    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [costumerName, setCustomerName] = useState('')

    const labelBgColor = theme === 'dark' ? colors.entries.max : colors.entries.midMax
    const inputBgColor = theme === 'dark' ? colors.cardBackground.dark : colors.entries.min

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
                    label='Cliente'
                    labelBgColor={labelBgColor}
                    inputBgColor={inputBgColor}
                />
                <FormDateField
                    setTargetDate={setDate}
                    label='Data'
                    labelBgColor={labelBgColor}
                    buttonBgColor={inputBgColor}
                />
                {
                    service.category === 'product' ? (
                        <FormAmountField
                            setAmount={setAmount}
                            label='* Quantidade'
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                        />
                    ) : null
                }
                {
                    service.category === 'budget' ? (
                        <FormValueField
                            setValue={setValue}
                            label='* Valor'
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                        />
                    ) : null
                }
                {
                    service.category !== 'service' ? (
                        <Text style={{
                            ...styles.infoText,
                            color: theme === 'dark' ? '#FFF' : colors.entries.mid
                        }}>
                            * campo obrigatório
                        </Text>
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