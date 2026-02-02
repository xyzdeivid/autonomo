import { Entry } from '@/types'

// ***DADOS DO MOCK***

// Receita média por dia trabalhado: 100

// Receita de cada cliente
// Carlos: 190
// Ana: 25
// Bruno: 20
// Mariana: 70
// Lucas: 35
// Fernanda: 105
// Rafael: 50
// Juliana: 95
// Pedro: 25
// Camila: 155
// João: 235

export const entries: Entry[] = [
    { _id: '1', date: '2026-01-01', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Carlos' },
    { _id: '30', date: '2026-01-01', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Pedro' },
    { _id: '2', date: '2026-01-02', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Ana' },
    { _id: '40', date: '2026-01-02', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '3', date: '2026-01-03', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 20, serviceIsThereAmount: true, serviceAmount: 1, customer: 'Bruno' },
    { _id: '27', date: '2026-01-03', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Mariana' },
    { _id: '4', date: '2026-01-04', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 40, serviceIsThereAmount: true, serviceAmount: 2, customer: 'Mariana' },
    { _id: '35', date: '2026-01-04', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '5', date: '2026-01-05', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 25, serviceIsThereAmount: true, serviceAmount: 1, customer: 'Lucas' },
    { _id: '42', date: '2026-01-05', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 65, serviceIsThereAmount: false },
    { _id: '6', date: '2026-01-06', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Carlos' },
    { _id: '33', date: '2026-01-06', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '7', date: '2026-01-07', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 55, serviceIsThereAmount: false, customer: 'Fernanda' },
    { _id: '46', date: '2026-01-07', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 40, serviceIsThereAmount: true, serviceAmount: 2 },
    { _id: '8', date: '2026-01-08', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 50, serviceIsThereAmount: true, serviceAmount: 2, customer: 'Rafael' },
    { _id: '37', date: '2026-01-08', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 210, serviceIsThereAmount: false },
    { _id: '9', date: '2026-01-09', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Juliana' },
    { _id: '29', date: '2026-01-09', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 50, serviceIsThereAmount: true, serviceAmount: 2, customer: 'Fernanda' },
    { _id: '12', date: '2026-01-12', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Lucas' },
    { _id: '49', date: '2026-01-12', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 50, serviceIsThereAmount: true, serviceAmount: 2 },
    { _id: '13', date: '2026-01-13', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 75, serviceIsThereAmount: true, serviceAmount: 3, customer: 'Camila' },
    { _id: '39', date: '2026-01-13', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 100, serviceIsThereAmount: true, serviceAmount: 4 },
    { _id: '14', date: '2026-01-14', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Mariana' },
    { _id: '31', date: '2026-01-14', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 60, serviceIsThereAmount: true, serviceAmount: 3 },
    { _id: '15', date: '2026-01-15', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 200, serviceIsThereAmount: false, customer: 'João' },
    { _id: '45', date: '2026-01-15', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '16', date: '2026-01-16', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 20, serviceIsThereAmount: true, serviceAmount: 1, customer: 'Carlos' },
    { _id: '50', date: '2026-01-16', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '19', date: '2026-01-19', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 80, serviceIsThereAmount: false, customer: 'Juliana' },
    { _id: '43', date: '2026-01-19', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '20', date: '2026-01-20', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Pedro' },
    { _id: '47', date: '2026-01-20', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 300, serviceIsThereAmount: false },
    { _id: '21', date: '2026-01-21', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 80, serviceIsThereAmount: true, serviceAmount: 4, customer: 'Camila' },
    { _id: '28', date: '2026-01-21', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 150, serviceIsThereAmount: false, customer: 'Carlos' },
    { _id: '22', date: '2026-01-22', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 35, serviceIsThereAmount: false, customer: 'João' },
    { _id: '38', date: '2026-01-22', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '23', date: '2026-01-23', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Ana' },
    { _id: '48', date: '2026-01-23', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '41', date: '2026-01-24', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 80, serviceIsThereAmount: true, serviceAmount: 4 },
    { _id: '32', date: '2026-01-25', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 90, serviceIsThereAmount: false }
]

export const onlyEntriesWithCustomer: Entry[] = [
    { _id: '1', date: '2026-01-01', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Carlos' },
    { _id: '30', date: '2026-01-01', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Pedro' },
    { _id: '2', date: '2026-01-02', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Ana' },
    { _id: '3', date: '2026-01-03', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 20, serviceIsThereAmount: true, serviceAmount: 1, customer: 'Bruno' },
    { _id: '27', date: '2026-01-03', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Mariana' },
    { _id: '4', date: '2026-01-04', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 40, serviceIsThereAmount: true, serviceAmount: 2, customer: 'Mariana' },
    { _id: '5', date: '2026-01-05', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 25, serviceIsThereAmount: true, serviceAmount: 1, customer: 'Lucas' },
    { _id: '6', date: '2026-01-06', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Carlos' },
    { _id: '7', date: '2026-01-07', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 55, serviceIsThereAmount: false, customer: 'Fernanda' },
    { _id: '8', date: '2026-01-08', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 50, serviceIsThereAmount: true, serviceAmount: 2, customer: 'Rafael' },
    { _id: '9', date: '2026-01-09', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Juliana' },
    { _id: '29', date: '2026-01-09', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 50, serviceIsThereAmount: true, serviceAmount: 2, customer: 'Fernanda' },
    { _id: '12', date: '2026-01-12', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Lucas' },
    { _id: '13', date: '2026-01-13', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 75, serviceIsThereAmount: true, serviceAmount: 3, customer: 'Camila' },
    { _id: '14', date: '2026-01-14', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Mariana' },
    { _id: '15', date: '2026-01-15', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 200, serviceIsThereAmount: false, customer: 'João' },
    { _id: '16', date: '2026-01-16', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 20, serviceIsThereAmount: true, serviceAmount: 1, customer: 'Carlos' },
    { _id: '19', date: '2026-01-19', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 80, serviceIsThereAmount: false, customer: 'Juliana' },
    { _id: '20', date: '2026-01-20', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false, customer: 'Pedro' },
    { _id: '21', date: '2026-01-21', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 80, serviceIsThereAmount: true, serviceAmount: 4, customer: 'Camila' },
    { _id: '28', date: '2026-01-21', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 150, serviceIsThereAmount: false, customer: 'Carlos' },
    { _id: '22', date: '2026-01-22', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 35, serviceIsThereAmount: false, customer: 'João' },
    { _id: '23', date: '2026-01-23', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false, customer: 'Ana' }
]


export const onlyEntriesWithoutCustomer: Entry[] = [
    { _id: '40', date: '2026-01-02', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '35', date: '2026-01-04', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '42', date: '2026-01-05', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 65, serviceIsThereAmount: false },
    { _id: '33', date: '2026-01-06', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '46', date: '2026-01-07', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 40, serviceIsThereAmount: true, serviceAmount: 2 },
    { _id: '37', date: '2026-01-08', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 210, serviceIsThereAmount: false },
    { _id: '44', date: '2026-01-10', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 25, serviceIsThereAmount: true, serviceAmount: 1 },
    { _id: '49', date: '2026-01-12', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 50, serviceIsThereAmount: true, serviceAmount: 2 },
    { _id: '39', date: '2026-01-13', serviceId: 'Produto 2', serviceCategory: 'product', serviceValue: 100, serviceIsThereAmount: true, serviceAmount: 4 },
    { _id: '31', date: '2026-01-14', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 60, serviceIsThereAmount: true, serviceAmount: 3 },
    { _id: '45', date: '2026-01-15', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '50', date: '2026-01-16', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
    { _id: '43', date: '2026-01-19', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '47', date: '2026-01-20', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 300, serviceIsThereAmount: false },
    { _id: '38', date: '2026-01-22', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '48', date: '2026-01-23', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    { _id: '41', date: '2026-01-24', serviceId: 'Produto 1', serviceCategory: 'product', serviceValue: 80, serviceIsThereAmount: true, serviceAmount: 4 },
    { _id: '32', date: '2026-01-25', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 90, serviceIsThereAmount: false }
]