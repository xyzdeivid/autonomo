import { EditableProperty } from '../common/EditableProperty'
import { EditNameField } from '../common/EditNameField'

interface ActualCustomerProps {
    customer: string
    setNewCustomerName: React.Dispatch<React.SetStateAction<string>>
    newCustomerName: string
    editCustomerName: () => Promise<void>
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActualCustomer({ customer, setNewCustomerName, newCustomerName, editCustomerName, showEditInput, setShowEditInput }: ActualCustomerProps) {

    return (
        <>
            {
                !showEditInput
                    ? <EditableProperty
                        label='Cliente: '
                        propertyName={customer}
                        isEditable={true}
                        onEditButtonPress={() => setShowEditInput(true)}
                    />
                    : <EditNameField
                        defaultValue={customer}
                        newName={newCustomerName}
                        setNewName={setNewCustomerName}
                        onSuccessButtonPress={editCustomerName}
                        onCancelButtonPress={() => setShowEditInput(false)}
                    />
            }
        </>

    )

}