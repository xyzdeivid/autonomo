import React, { createContext, useState } from 'react'

export interface Value {
    value: number
    date: string
}

export interface Service {
    _id: string
    value: number
}

export type Services = Service[]

export type SetService = React.Dispatch<React.SetStateAction<Service>>

export type SetServices = React.Dispatch<React.SetStateAction<Services>>

export type ServicesState = [Services, SetServices]

export const DEFAULT_SERVICE: Service = {
    _id: '',
    value: 0
}

interface TDocsContext {
    services: ServicesState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
}

const DocsProvider = ({ children }: DocsProviderProps) => {

    // Documentos usados na aplicação
    const [services, setServices] = useState<Services>([])

    const docs: TDocsContext = {
        services: [services, setServices]
    }

    return (
        <DocsContext.Provider value={docs}>
            {children}
        </DocsContext.Provider>
    )

}

export default DocsProvider