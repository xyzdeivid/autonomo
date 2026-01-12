import { Button, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Item, Outflow } from '@/context/DocsContext'
import FormTitle from '../common/FormTitle'
import LoadingScreen from '../common/LoadingScreen'
import ItemsCategoriesForm from './ItemsCategoriesForm'
import ServiceCreationForm from './ServiceCreationForm'
import FormContainer from '../common/FormContainer'
import useAddItem from '@/hooks/useAddItem'
import createItem from '@/functions/createItem'
import createResaleOutflow from '@/functions/createResaleOutflow'
import { BudgetCreationForm } from './BudgetCreationForm'
import ResaleCreationForm from './ResaleCreationForm'
import ResaleOrStockButtons from './ResaleOrStockButtons'
import StockCreationForm from './StockCreationForm'
import addItemStepHandle from '@/functions/addItemStepHandle'
import NoStockCreationForm from './NoStockCreationForm'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm, setButton }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [valueOutflowChoice, setValueOutflowChoice] = useState('total')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [resale, setResale] = useState(false)
    const [purchaseValue, setPurchaseValue] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState('')
    const [stock, setStock] = useState(false)
    const [step, setStep] = useState(0)

    const [whichButtonPressed, setWhichButtonPressed] = useState('')

    const addItem = useAddItem().addItem

    const submitNewItem = async (): Promise<void> => {

        setLoadingScreen(true)

        let resaleOutflow: Outflow | undefined = undefined

        // create resale outflow to submit if needed
        if (resale) {

            resaleOutflow = createResaleOutflow(
                purchaseValue,
                amount,
                purchaseDate,
                name,
                valueOutflowChoice
            )

        }

        // create item to submit
        const item: Item = createItem(category, name, value, amount, resale, stock)

        // add data to database and context
        await addItem(item, resaleOutflow)

        // close form
        setAddServiceForm(false)
        setButton(true)
        setLoadingScreen(false)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer>
                {
                    step === 0 && (
                        <>
                            <FormTitle
                                text='Novo Produto ou Serviço'
                                textColor='#330066'
                            />
                            <ItemsCategoriesForm category={category} setCategory={setCategory} />
                        </>
                    )
                }
                {
                    step === 1 && category === 'service' && (
                        <ServiceCreationForm setName={setName} setValue={setValue} />
                    )
                }
                {
                    step === 1 && category === 'budget' && (
                        <BudgetCreationForm setName={setName} />
                    )
                }
                {
                    step === 1 && category === 'product' && (
                        <ResaleOrStockButtons
                            resale={resale}
                            setResale={setResale}
                            stock={stock}
                            setStock={setStock}
                            setAmount={setAmount}
                            whichButtonPressed={whichButtonPressed}
                            setWhichButtonPressed={setWhichButtonPressed}
                        />
                    )
                }
                {
                    step === 1 && resale && (
                        <ResaleCreationForm
                            setPurchaseDate={setPurchaseDate}
                            setAmount={setAmount}
                            setPurchaseValue={setPurchaseValue}
                            resale={resale}
                            valueOutflowChoice={valueOutflowChoice}
                            setValueOutflowChoice={setValueOutflowChoice}
                            setName={setName}
                            category={category}
                            setValue={setValue}
                        />
                    )
                }
                {
                    step === 1 && stock && (
                        <StockCreationForm
                            setAmount={setAmount}
                            setValue={setValue}
                            setName={setName}
                        />
                    )
                }
                {
                    step === 2 && (
                        <NoStockCreationForm
                            setName={setName}
                            setValue={setValue}
                        />
                    )
                }
            </FormContainer>
            <View style={styles.submitButtons}>
                <View>
                    <Button onPress={() => {
                        setAddServiceForm(false)
                        setButton(true)
                    }} title='Cancelar' color='gray' />
                </View>
                <View>
                    <Button onPress={() =>
                        addItemStepHandle(
                            step, category,
                            resale, amount,
                            purchaseValue, stock,
                            name, value,
                            submitNewItem, setStep
                        )
                    } title='Próximo' color='#330066' />
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    submitButtons: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    }


})