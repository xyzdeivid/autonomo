import { moneyFormat } from '@/functions/common'
import { Item } from '@/types'
import { EditableProperty } from '../common/EditableProperty'
import { EditValueField } from '../common/EditValueField'

interface ActualValueProps {
    item: Item
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    editValue: () => Promise<void>
    isEditable: boolean
}

export default function ActualValue({ item, showEditInput, setShowEditInput, value, setValue, editValue, isEditable }: ActualValueProps) {

    return (
        <>
            {
                !showEditInput && (
                    <EditableProperty
                        label='Valor'
                        propertyName={moneyFormat(item.value)}
                        isEditable={isEditable}
                        onEditButtonPress={() => {
                            setShowEditInput(true)
                        }}
                    />
                )
            }
            {
                showEditInput && (
                    <EditValueField
                        newValue={value}
                        setNewValue={setValue}
                        onSuccessButtonPress={editValue}
                        defaultValue={item.value}
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