import React, { createContext, useState } from 'react'

export const HideTabBarContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => false])

interface HideTabBarProviderProps {
    children: React.ReactNode
}

export default function HideTabBarProvider({ children }: HideTabBarProviderProps) {

    const [hideTabBar, setHideTabBar] = useState(false)

    return (
        <HideTabBarContext.Provider value={[hideTabBar, setHideTabBar]}>
            {children}
        </HideTabBarContext.Provider>
    )

}