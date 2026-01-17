import { moneyFormat } from '@/functions/common'
import { Outflow } from '@/types'
import { ListItemCardProperty } from '../common/ListItemCardProperty'
import { EditValueField } from '../common/EditValueField'
import { colors } from '@/constants/appColors'

interface ActualValueProps {
    outflow: Outflow
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    editValue: () => Promise<void>
    isEditable: boolean
}

export function ActualValue({ outflow, showEditInput, setShowEditInput, value, setValue, editValue, isEditable }: ActualValueProps) {

    return (
        <>
            {
                !showEditInput && (
                    <ListItemCardProperty
                        label='Valor: '
                        propertyName={moneyFormat(outflow.value)}
                        isEditable={isEditable}
                        onEditButtonPress={() => {
                            setShowEditInput(true)
                        }}
                        bgColor={colors.outflows.min}
                    />
                )
            }
            {
                showEditInput && (
                    <EditValueField
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