import { useState } from 'react'
import { Item, Outflow } from '@/types/index'
import FormTitle from '../common/FormTitle'
import LoadingScreen from '../common/LoadingScreen'
import ServiceCreationForm from './ServiceCreationForm'
import FormContainer from '../common/FormContainer'
import useAddItem from '@/hooks/useAddItem'
import createItem from '@/utils/createItem'
import createResaleOutflow from '@/utils/createResaleOutflow'
import { BudgetCreationForm } from './BudgetCreationForm'
import ResaleCreationForm from './ResaleCreationForm'
import ResaleOrStockButtons from './ResaleOrStockButtons'
import StockCreationForm from './StockCreationForm'
import NoStockCreationForm from './NoStockCreationForm'
import { colors } from '@/constants/appColors'
import { Alert } from 'react-native'
import { getErrorMessage } from '@/utils/common'

interface AddServiceFormProps {
    categorySelected: string
    setShowItemCategoryCard: React.Dispatch<React.SetStateAction<boolean>>
    setShowAddItemForm: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddItemForm({ categorySelected, setShowItemCategoryCard, setShowAddItemForm }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [valueOutflowChoice, setValueOutflowChoice] = useState('total')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [resale, setResale] = useState(false)
    const [purchaseValue, setPurchaseValue] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState('')
    const [stock, setStock] = useState(false)
    const [step, setStep] = useState(0)

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
        const item: Item = createItem(categorySelected, name, value, amount, resale, stock)

        // add data to database and context
        const result = await addItem(item, resaleOutflow)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        } else {

            setShowItemCategoryCard(false)
            setShowAddItemForm(false)

        }

        setLoadingScreen(false)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer>
                <FormTitle
                    text='Novo Item'
                    onCloseFormButtonPress={() => {
                        setShowItemCategoryCard(false)
                        setShowAddItemForm(false)
                    }}
                    textColor={colors.items.max}
                />
                {
                    step === 0 && categorySelected === 'service' && (
                        <ServiceCreationForm
                            name={name}
                            value={value}
                            setName={setName}
                            setValue={setValue}
                            submitService={submitNewItem}

                        />
                    )
                }
                {
                    step === 0 && categorySelected === 'budget' && (
                        <BudgetCreationForm
                            name={name}
                            setName={setName}
                            submitBudget={submitNewItem}
                        />
                    )
                }
                {
                    step === 0 && categorySelected === 'product' && (
                        <ResaleOrStockButtons
                            setStep={setStep}
                            setResale={setResale}
                            setStock={setStock}
                            setAmount={setAmount}
                            setForm={setShowAddItemForm}
                        />
                    )
                }
                {
                    step === 1 && resale && (
                        <ResaleCreationForm
                            submitResale={submitNewItem}
                            name={name}
                            amount={amount}
                            purchaseValue={purchaseValue}
                            value={value}
                            setPurchaseDate={setPurchaseDate}
                            setAmount={setAmount}
                            setPurchaseValue={setPurchaseValue}
                            valueOutflowChoice={valueOutflowChoice}
                            setValueOutflowChoice={setValueOutflowChoice}
                            setName={setName}
                            setValue={setValue}
                        />
                    )
                }
                {
                    step === 1 && stock && (
                        <StockCreationForm
                            name={name}
                            amount={amount}
                            value={value}
                            setStock={setStock}
                            setAmount={setAmount}
                            setValue={setValue}
                            setName={setName}
                            submitStock={submitNewItem}
                        />
                    )
                }
                {
                    step === 1 && !resale && !stock && (
                        <NoStockCreationForm
                            name={name}
                            value={value}
                            setName={setName}
                            setValue={setValue}
                            submitNoStock={submitNewItem}
                        />
                    )
                }
            </FormContainer>
        </>
    )

}