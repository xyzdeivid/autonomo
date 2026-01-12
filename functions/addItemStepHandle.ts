import { Alert } from 'react-native'

export default function addItemStepHandle (step: number,
    category: string,
    resale: boolean,
    amount: number,
    purchaseValue: number,
    stock: boolean,
    name: string,
    value: number,
    submitNewItem: () => Promise<void>,
    setStep: React.Dispatch<React.SetStateAction<number>>
) {

    if (step === 0 && !category) {

        Alert.alert('Escolha uma categoria!')
        return

    }

    if (step === 1 && resale) {

        if (!(name && amount && purchaseValue && value)) {

            Alert.alert('Preencha todos os campos!')
            return

        }

        submitNewItem()
        return

    }

    if (step === 1 && stock) {

        if (!(name && value && amount)) {

            Alert.alert('Preencha todos os campos!')
            return

        }

        submitNewItem()
        return

    }

    if (step === 1 && category === 'service') {

        if (!(name && value)) {
            Alert.alert('Preencha todos os campos!')
            return

        }

        submitNewItem()
        return

    }

    if (step === 1 && category === 'budget') {

        if (!name) {

            Alert.alert('Preencha todos os campos!')
            return

        }

        submitNewItem()
        return

    }

    if (step === 2 ) {

        if (!(name && value)) {

            Alert.alert('Preencha todos os campos!')
            return

        }

        submitNewItem()
        return

    }

    setStep(step + 1)

}