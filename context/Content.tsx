import { createContext, useState } from 'react'

export const ContentContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => ''])

interface ContentProviderProps {
    children: React.ReactNode
}

export default function ContentProvider({ children }: ContentProviderProps) {

    const [content, setContent] = useState('financial')

    return (
        <ContentContext.Provider value={[content, setContent]}>
            {children}
        </ContentContext.Provider>
    )

}