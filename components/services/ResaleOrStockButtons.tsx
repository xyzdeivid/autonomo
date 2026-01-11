import AmountInput from "../common/AmountInput"
import ResaleButton from "./ResaleButton"
import StockButton from "./StockButton"

interface ResaleOrStockButtonsProps {
    resale: boolean
    setResale: React.Dispatch<React.SetStateAction<boolean>>
    stock: boolean
    setStock: React.Dispatch<React.SetStateAction<boolean>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    whichButtonPressed: string
    setWhichButtonPressed: React.Dispatch<React.SetStateAction<string>>
}

export default function ResaleOrStockButtons({
    resale,
    setResale,
    stock,
    setStock,
    setAmount,
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
        </>
    )

}