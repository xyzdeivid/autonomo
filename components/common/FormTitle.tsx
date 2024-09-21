import { Text } from 'react-native'

interface FormTitleProps {
    text: string
}

export default function FormTitle({ text }: FormTitleProps) {

    return (
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>{text}</Text>
    )

}