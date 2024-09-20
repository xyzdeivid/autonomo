import { Text } from 'react-native'
import FormBody from '../common/FormBody'

interface EditServiceFormProps {
    service: string
}

export default function EditServiceForm({ service }: EditServiceFormProps) {

    return (
        <FormBody>
            <Text>{service}</Text>
        </FormBody>
    )

}