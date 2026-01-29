import { Entry } from '@/types'

export const entries: Entry[] = [
    {
        _id: '1',
        date: '2026-01-01',
        serviceId: 'Serviço',
        serviceCategory: 'service',
        serviceValue: 50,
        serviceIsThereAmount: false,
        customer: 'João'
    },
    {
        _id: '2',
        date: '2026-01-01',
        serviceId: 'Serviço',
        serviceCategory: 'service',
        serviceValue: 50,
        serviceIsThereAmount: true,
        serviceAmount: 1,
        customer: 'Pedro'
    },
    {
        _id: '3',
        date: '2026-01-02',
        serviceId: 'Serviço',
        serviceCategory: 'service',
        serviceValue: 50,
        serviceIsThereAmount: false,
        customer: 'Lucas'
    },
    {
        _id: '4',
        date: '2026-01-02',
        serviceId: 'Produto',
        serviceCategory: 'product',
        serviceValue: 20,
        serviceIsThereAmount: true,
        serviceAmount: 2,
        customer: 'Marcos'
    },
    {
        _id: '5',
        date: '2026-01-03',
        serviceId: 'Produto',
        serviceCategory: 'product',
        serviceValue: 10,
        serviceIsThereAmount: true,
        serviceAmount: 1,
        customer: 'Ana'
    },
    {
        _id: '6',
        date: '2026-01-03',
        serviceId: 'Produto',
        serviceCategory: 'product',
        serviceValue: 60,
        serviceIsThereAmount: true,
        serviceAmount: 6,
        customer: 'Rafael'
    }
]