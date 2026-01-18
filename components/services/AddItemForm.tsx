import { useState } from 'react'
import { Item, Outflow } from '@/types/index'
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
import NoStockCreationForm from './NoStockCreationForm'
import { colors } from '@/constants/appColors'
import { Alert } from 'react-native'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm }: AddServiceFormProps) {

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

    const addItem = useAddItem().addItem

    const getErrorMessage = (error: string) => {
        switch (error) {
            case 'DUPLICATE_ITEM':
                return 'Já existe um item com esse nome.'
        
            case 'DB_ERROR':
                return 'Erro ao acessar banco de dados'
        }
    }

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
        const result = await addItem(item, resaleOutflow)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        // close form
        setAddServiceForm(false)
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
                                onCloseFormButtonPress={() => setAddServiceForm(false)}
                                textColor={colors.items.max}
                            />
                            <ItemsCategoriesForm
                                setCategory={setCategory}
                                setStep={setStep}
                            />
                        </>
                    )
                }
                {
                    step === 1 && category === 'service' && (
                        <ServiceCreationForm
                            name={name}
                            value={value}
                            setName={setName}
                            setValue={setValue}
                            setStep={setStep}
                            submitService={submitNewItem}
                            setForm={setAddServiceForm}

                        />
                    )
                }
                {
                    step === 1 && category === 'budget' && (
                        <BudgetCreationForm
                            name={name}
                            setName={setName}
                            setStep={setStep}
                            submitBudget={submitNewItem}
                            setForm={setAddServiceForm}
                        />
                    )
                }
                {
                    step === 1 && category === 'product' && (
                        <ResaleOrStockButtons
                            setStep={setStep}
                            setResale={setResale}
                            setStock={setStock}
                            setAmount={setAmount}
                            setForm={setAddServiceForm}
                        />
                    )
                }
                {
                    step === 2 && resale && (
                        <ResaleCreationForm
                            submitResale={submitNewItem}
                            setResale={setResale}
                            setStep={setStep}
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
                            setForm={setAddServiceForm}
                        />
                    )
                }
                {
                    step === 2 && stock && (
                        <StockCreationForm
                            name={name}
                            amount={amount}
                            value={value}
                            setStep={setStep}
                            setStock={setStock}
                            setAmount={setAmount}
                            setValue={setValue}
                            setName={setName}
                            submitStock={submitNewItem}
                            setForm={setAddServiceForm}
                        />
                    )
                }
                {
                    step === 2 && !resale && !stock && (
                        <NoStockCreationForm
                            name={name}
                            value={value}
                            setStep={setStep}
                            setName={setName}
                            setValue={setValue}
                            submitNoStock={submitNewItem}
                            setForm={setAddServiceForm}
                        />
                    )
                }
            </FormContainer>
        </>
    )

}