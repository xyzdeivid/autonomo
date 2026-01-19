import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import ProductSubCategoryHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface NoStockCreationFormProps {
    name: string
    value: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitNoStock: () => Promise<void>
    setForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NoStockCreationForm({ name, value, setStep, setName, setValue, submitNoStock, setForm }: NoStockCreationFormProps) {

    const onComeBackButtonPress = () => {

        // Zerando estados ao sair do formulário
        setName('')
        setValue(0)
        setStep(1)

    }

    return (
        <>
            <ProductSubCategoryHeader
                title='Novo Produto'
                onComeBackButtonPress={onComeBackButtonPress}
                onCloseFormButtonPress={() => setForm(false)}
            />
            <FormNameField
                label='Nome do Produto:'
                setName={setName}
                textColor={colors.items.max}
                bgColor={colors.items.min}
            />
            <FormValueField
                label='Valor de Venda (un):'
                setValue={setValue}
                bgColor={colors.items.min}
                textColor={colors.items.max}
            />
            {
                (name && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitNoStock} />
                ) : null
            }
        </>
    )

}