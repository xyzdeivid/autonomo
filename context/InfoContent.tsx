import { createContext, useState } from 'react'

const DEFAULT_CONTEXT: ContextT = {
    content: ['', () => ''],
    form: [false, () => false]
}

interface ContextT {
    content: [string, React.Dispatch<React.SetStateAction<string>>]
    form: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const ContentContext = createContext<ContextT>(DEFAULT_CONTEXT)

interface ContentProviderProps {
    children: React.ReactNode
}

export default function ContentProvider({ children }: ContentProviderProps) {

    const [content, setContent] = useState<string>('financial')
    const [addItemsForm, setAddItemsForm] = useState<boolean>(false)

    const info: ContextT = {
        content: [content, setContent],
        form: [addItemsForm, setAddItemsForm]
    }

    return (
        <ContentContext.Provider value={info}>
            {children}
        </ContentContext.Provider>
    )

}