import React, { createContext, useState } from 'react'

interface MainDisplaysContextT {
    tabBar: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    header: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const DEFAULT_DISPLAYS: MainDisplaysContextT = {
    tabBar: [false, () => false],
    header: [false, () => false]
}

export const MainDisplaysContext = createContext<MainDisplaysContextT>(DEFAULT_DISPLAYS)

interface MainDisplaysProviderProps {
    children: React.ReactNode
}

export default function MainDisplaysProvider({ children }: MainDisplaysProviderProps) {

    const [showHeader, setShowHeader] = useState(true)
    const [hideTabBar, setHideTabBar] = useState(false)

    const displays: MainDisplaysContextT = {
        tabBar: [hideTabBar, setHideTabBar],
        header: [showHeader, setShowHeader]
    }

    return (
        <MainDisplaysContext.Provider value={displays}>
            {children}
        </MainDisplaysContext.Provider>
    )

}