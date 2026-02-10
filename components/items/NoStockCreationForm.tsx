import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/styles/appColors'

interface NoStockCreationFormProps {
    name: string
    value: number
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitNoStock: () => Promise<void>
    labelBgColor: string
    inputBgColor: string
}

export default function NoStockCreationForm({ name, value, setName, setValue, submitNoStock, labelBgColor, inputBgColor }: NoStockCreationFormProps) {

    return (
        <>
            <FormNameField
                setName={setName}
                label='Nome do Produto'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            <FormValueField
                setValue={setValue}
                label='Valor de Venda (un)'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            {
                (name && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitNoStock} />
                ) : null
            }
        </>
    )

}