import { Outflow } from '@/types'
import { ListItemCardProperty } from '../common/ListItemCardProperty'
import { EditNameField } from '../common/EditNameCard'
import { colors } from '@/constants/appColors'

interface ActualNameProps {
    outflow: Outflow
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    editName: () => Promise<void>
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    isEditable: boolean
}

export function ActualName({ outflow, name, setName, editName, showEditInput, setShowEditInput, isEditable }: ActualNameProps) {

    return (
        <>
            {
                !showEditInput && (
                    <ListItemCardProperty
                        label='Nome: '
                        propertyName={outflow.name}
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
                    <EditNameField
                        defaultValue={outflow.name}
                        newName={name}
                        setNewName={setName}
                        onSuccessButtonPress={editName}
                        onCancelButtonPress={() => {
                            setShowEditInput(false)
                            setName('')
                        }}
                    />
                )
            }

        </>
    )

}