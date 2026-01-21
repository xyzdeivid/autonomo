import ProductSubCategoryButton from './ProductSubCategoryButton'

interface ResaleOrStockButtonsProps {
    setStep: React.Dispatch<React.SetStateAction<number>>
    setResale: React.Dispatch<React.SetStateAction<boolean>>
    setStock: React.Dispatch<React.SetStateAction<boolean>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    setForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResaleOrStockButtons({
    setResale,
    setStep,
    setStock,
    setForm
}: ResaleOrStockButtonsProps) {

    return (
        <>
            {/* botão de revenda */}
            <ProductSubCategoryButton
                subCategoryName='Revenda'
                subCategoryText='Selecione caso você compre o produto de um fornecedor para revendê-lo posteriormente.'
                setStep={setStep}
                setSubCategory={setResale}
            />
            {/* botão de estoque */}
            <ProductSubCategoryButton
                subCategoryName='Estoque'
                subCategoryText='Selecione caso você mesmo fabrique seu produto e ele possua estoque.'
                setStep={setStep}
                setSubCategory={setStock}
            />
            {/* botão de sem estoque */}
            <ProductSubCategoryButton
                subCategoryName='Sem Estoque'
                subCategoryText='Selecione caso você mesmo fabrique seu produto e ele seja vendido por encomenda.'
                setStep={setStep}
            />
        </>
    )

}