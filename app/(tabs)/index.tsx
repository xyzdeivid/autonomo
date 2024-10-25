import { useContext, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterSchedulings } from '@/functions/common'
import Revenue from '@/components/info/Revenue'
import { ContentContext } from '@/context/InfoContent'
import GeneralButton from '@/components/info/GeneralButton'
import AddItemForm from '@/components/info/AddItemForm'
import AddServiceForm from '@/components/services/AddServiceForm'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'

export default function Info() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [services] = useContext(DocsContext).services
    const [selectedMonth] = useContext(MonthContext)
    const [addItemsForm, setAddItemsForm] = useContext(ContentContext).form
    const [generalButton, setGeneralButton] = useContext(ContentContext).button
    const [addServiceForm, setAddServiceForm] = useState(false)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [addSchedulingForm, setAddSchedulingForm] = useState(false)

    return (
        <Container>
            {
                schedulings[0] && (<MonthInput dropdownIconColor='#08819B' />)
            }
            {
                filterSchedulings(schedulings, selectedMonth)[0]
                    ? <Revenue />
                    : <AnyItemWarning text='Nenhuma informação disponível' />
            }
            {
                generalButton
                && <GeneralButton
                    setAddItemsForm={setAddItemsForm}
                    setGeneralButton={setGeneralButton}
                />
            }
            {
                addItemsForm
                && <AddItemForm
                    setGeneralButton={setGeneralButton}
                    setAddItemsForm={setAddItemsForm}
                    setAddServiceForm={setAddServiceForm}
                    setAddExpenseForm={setAddExpenseForm}
                    setAddSchedulingForm={setAddSchedulingForm}
                    services={services}
                />
            }
            {
                addServiceForm
                && <AddServiceForm
                    setAddServiceForm={setAddServiceForm}
                    setButton={setGeneralButton}
                />
            }
            {
                addExpenseForm
                && <AddExpenseForm
                    setAddExpenseForm={setAddExpenseForm}
                    setButton={setGeneralButton}
                />
            }
            {
                addSchedulingForm
                && <AddSchedulingForm
                    setAddSchedulingForm={setAddSchedulingForm}
                    setButton={setGeneralButton}
                />
            }
        </Container>
    )

}