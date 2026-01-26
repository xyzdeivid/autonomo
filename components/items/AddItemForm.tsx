import { useState } from 'react'
import { Item, Outflow } from '@/types/index'
import FormTitle from '../common/FormTitle'
import LoadingScreen from '../common/LoadingScreen'
import ServiceCreationForm from './ServiceCreationForm'
import FormContainer from '../common/FormContainer'
import useAddItem from '@/hooks/items/useAddItem'
import createItem from '@/utils/createItem'
import createResaleOutflow from '@/utils/createResaleOutflow'
import { BudgetCreationForm } from './BudgetCreationForm'
import ResaleCreationForm from './ResaleCreationForm'
import ResaleOrStockButtons from './ResaleOrStockButtons'
import StockCreationForm from './StockCreationForm'
import NoStockCreationForm from './NoStockCreationForm'
import { colors } from '@/styles/appColors'
import { Alert } from 'react-native'
import { getErrorMessage } from '@/utils/common'

interface AddServiceFormProps {
    categorySelected: string
    setShowItemCategoryCard: React.Dispatch<React.SetStateAction<boolean>>
    setShowAddItemForm: React.Dispatch<React.SetStateAction<boolean>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export function AddItemForm({ categorySelected, setShowItemCategoryCard, setShowAddItemForm, setCategory }: AddServiceFormProps) {

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

    const labelBgColor = colors.items.midMax
    const inputBgColor = colors.items.min
    const inputBorderColor = colors.items.midMin

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

        }

        setCategory(categorySelected === 'budget' ? 'service' : categorySelected)
        setShowItemCategoryCard(false)
        setShowAddItemForm(false)
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
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                            inputBorderColor={inputBorderColor}
                        />
                    )
                }
                {
                    step === 0 && categorySelected === 'budget' && (
                        <BudgetCreationForm
                            name={name}
                            setName={setName}
                            submitBudget={submitNewItem}
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                            inputBorderColor={inputBorderColor}
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
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                            inputBorderColor={inputBorderColor}
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
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                            inputBorderColor={inputBorderColor}
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
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                            inputBorderColor={inputBorderColor}
                        />
                    )
                }
            </FormContainer>
        </>
    )

}