import { createContext, useState } from 'react'

const DEFAULT_CONTEXT: ContextT = {
    form: [false, () => false],
    button: [false, () => false]
}

interface ContextT {
    form: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    button: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const ContentContext = createContext<ContextT>(DEFAULT_CONTEXT)

interface ContentProviderProps {
    children: React.ReactNode
}

export default function ContentProvider({ children }: ContentProviderProps) {

    const [addItemsForm, setAddItemsForm] = useState<boolean>(false)
    const [button, setButton] = useState<boolean>(true)

    const info: ContextT = {
        form: [addItemsForm, setAddItemsForm],
        button: [button, setButton]
    }

    return (
        <ContentContext.Provider value={info}>
            {children}
        </ContentContext.Provider>
    )

}