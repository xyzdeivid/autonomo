import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface NoStockCreationFormProps {
    name: string
    value: number
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitNoStock: () => Promise<void>
}

export default function NoStockCreationForm({ name, value, setName, setValue, submitNoStock }: NoStockCreationFormProps) {

    return (
        <>
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