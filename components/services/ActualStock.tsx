import { Item } from '@/types'
import { ListItemCardProperty } from '../common/ListItemCardProperty'
import { EditAmountField } from '../common/EditAmountField'
import { colors } from '@/constants/appColors'

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
                    <ListItemCardProperty
                        label='Estoque: '
                        propertyName={String(item.amount)}
                        isEditable={isEditable}
                        onEditButtonPress={() => {
                            setShowEditInput(true)
                        }}
                        bgColor={colors.items.min}
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