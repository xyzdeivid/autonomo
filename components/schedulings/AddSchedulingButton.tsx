import { Alert, Button, StyleSheet, View } from 'react-native'

import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { getServices } from '@/functions/schedulings'

interface AddSchedulingButtonProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingButton({ setAddSchedulingForm }: AddSchedulingButtonProps) {

    const [services] = useContext(DocsContext).services

    const checkServices = () => {
        getServices(services)[0]
            ? setAddSchedulingForm(true)
            : Alert.alert('Sem item disponível', 'Verifique se você tem algum item ou estoque disponível.')
    }

    return (
        <View style={styles.buttonContainer}>
            <Button
                onPress={() => checkServices()}
                color='#08819B'
                title='Cadastrar'
            />
        </View>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '50%',
        marginHorizontal: 'auto',
        marginTop: 16
    }
})