import Container from "@/components/common/Container"
import AnyItemWarning from "@/components/common/AnyItemWarning"

import { DocsContext } from "@/context/DocsContext"
import { useContext } from "react"

export default function Expenses() {

    const [expenses, setExpenses] = useContext(DocsContext).expenses

    return (
        <Container>
            {
                expenses[0]
                ? null
                : <AnyItemWarning />
            }
        </Container>
    )
}