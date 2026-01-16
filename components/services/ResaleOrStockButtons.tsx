import { Pressable, StyleSheet, Text, View } from 'react-native'
import ProductSubCategoryButton from './ProductSubCategoryButton'
import { colors } from '@/constants/appColors'
import { CloseFormButton } from '../common/CloseFormButton'

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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable
                    style={styles.comeBackButton}
                    onPress={() => setStep(0)}
                >
                    <Text style={{ color: 'white' }}>Voltar</Text>
                </Pressable>
                <CloseFormButton color={colors.items.mid} onPress={() => setForm(false)} />
            </View>
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

const styles = StyleSheet.create({

    comeBackButton: {
        backgroundColor: colors.items.max,
        alignSelf: 'flex-start',
        marginBottom: 20,
        padding: 6,
        borderRadius: 4
    }

})