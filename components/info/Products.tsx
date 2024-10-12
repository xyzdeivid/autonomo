import { Scheduling } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'
import { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import InfoTitle from '../common/InfoTitle'
import ProductsChart from './ProductsChart'
import ProductsList from './ProductsList'
import AnyItemWarning from '../common/AnyItemWarning'

interface ProductsProps {
    schedulings: Scheduling[]
}

type ProductsT = {
    product: string
    amount: number
}[]

export default function Products({ schedulings }: ProductsProps) {

    const [selectedMonth] = useContext(MonthContext)
    const [products, setProducts] = useState<ProductsT>([] as ProductsT)

    const getMostOfferedProducts = () => {

        // Separando os nomes dos produtos
        let productsNames = schedulings.map(scheduling => {
            return scheduling.service._id
        })
        productsNames = [...new Set(productsNames)]

        // Preparando formato para receber a quantidade de cada produto vendido
        const productsWithAmounts = productsNames.map(productName => {
            return {
                product: productName,
                amount: 0
            }
        })

        schedulings.forEach(scheduling => {
            productsWithAmounts.forEach(product => {
                if (product.product === scheduling.service._id) {
                    product.amount += scheduling.service.amount
                }

            })
        })

        return productsWithAmounts.sort((a, b) => b.amount - a.amount)

    }

    useEffect(() => {
        setProducts(getMostOfferedProducts())
    }, [schedulings, selectedMonth])

    return (
        <View style={{ zIndex: -1 }}>
            {
                products[0]
                    ? <View>
                        <InfoTitle text='Produtos mais vendidos' />
                        <ProductsChart products={products} />
                        <ProductsList products={products} />
                    </View>
                    : <AnyItemWarning text='Nenhum produto registrado' />
            }
        </View>
    )

}