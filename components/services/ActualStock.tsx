import { Item } from '@/types'
import { EditableProperty } from '../common/EditableProperty'
import { EditAmountField } from '../common/EditAmountField'

interface ActualStockProps {
    item: Item
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    setStock: React.Dispatch<React.SetStateAction<number>>
    editStock: () => Promise<void>
    isEditable: boolean
}

export default function ActualStock({ item, showEditInput, setShowEditInput, setStock, isEditable, editStock }: ActualStockProps) {

    return (
        <>
            {
                !showEditInput && (
                    <EditableProperty
                        label='Estoque'
                        propertyName={String(item.amount)}
                        isEditable={isEditable}
                        onEditablePropertyButtonPress={() => {
                            setShowEditInput(true)
                        }}
                    />
                )
            }
            {
                showEditInput && (
                    <EditAmountField
                        setAmount={setStock}
                        defaultValue={item.amount || 0}
                        onSuccessButtonPress={editStock}
                        onCancelButtonPress={() => setShowEditInput(false)}
                    />
                )
            }
        </>
    )

}