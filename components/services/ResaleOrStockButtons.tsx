import { Text } from 'react-native'
import ResaleButton from './ResaleButton'
import StockButton from './StockButton'

interface ResaleOrStockButtonsProps {
    resale: boolean
    stock: boolean
    setResale: React.Dispatch<React.SetStateAction<boolean>>
    setStock: React.Dispatch<React.SetStateAction<boolean>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    whichButtonPressed: string
    setWhichButtonPressed: React.Dispatch<React.SetStateAction<string>>
}

export default function ResaleOrStockButtons({
    resale, stock,
    setResale,
    setStock,
    whichButtonPressed,
    setWhichButtonPressed
}: ResaleOrStockButtonsProps) {

    return (
        <>
            <ResaleButton
                resale={resale}
                setResale={setResale}
                whichButtonPressed={whichButtonPressed}
                setWhichButtonPressed={setWhichButtonPressed}
            />
            <StockButton
                stock={stock}
                setStock={setStock}
                whichButtonPressed={whichButtonPressed}
                setWhichButtonPressed={setWhichButtonPressed}
            />
            {
                !resale && !stock && (
                    <Text style={{
                        backgroundColor: '#6600CC1A',
                        padding: 12,
                        borderRadius: 6,
                        color: '#330066'
                    }}>
                        Caso seja você mesmo fabrique seu produto e ele seja vendido por encomenda,
                        basta avançar para a próxima etapa.
                    </Text>
                )
            }
        </>
    )

}