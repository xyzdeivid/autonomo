import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface ServiceCreationFormProps {
    name: string
    value: number
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitService: () => Promise<void>
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
}

export default function ServiceCreationForm({ name, value, setName, setValue, submitService, labelBgColor, inputBgColor, inputBorderColor }: ServiceCreationFormProps) {

    return (
        <>
            <FormNameField
                setName={setName}
                label='Nome do Serviço'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            <FormValueField
                setValue={setValue}
                label='Valor'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            {
                (name && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitService} />
                ) : null
            }
        </>
    )

}