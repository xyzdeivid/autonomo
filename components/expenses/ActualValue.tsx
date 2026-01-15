import { moneyFormat } from '@/functions/common'
import { Outflow } from '@/types'
import { EditableProperty } from '../common/EditableProperty'
import { EditValueInput } from '../common/EditValueInput'

interface ActualValueProps {
    outflow: Outflow
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    editValue: () => Promise<void>
    isEditable: boolean
}

export default function ActualValue({ outflow, showEditInput, setShowEditInput, value, setValue, editValue, isEditable }: ActualValueProps) {

    return (
        <>
            {
                !showEditInput && (
                    <EditableProperty
                        label='Valor'
                        propertyName={moneyFormat(outflow.value)}
                        isEditable={isEditable}
                        onEditablePropertyButtonPress={() => {
                            setShowEditInput(true)
                        }}
                    />
                )
            }
            {
                showEditInput && (
                    <EditValueInput
                        newValue={value}
                        setNewValue={setValue}
                        onSuccessButtonPress={editValue}
                        defaultValue={outflow.value}
                        onCancelButtonPress={() => {
                            setValue(0)
                            setShowEditInput(false)
                        }}
                    />
                )
            }
        </>
    )

}