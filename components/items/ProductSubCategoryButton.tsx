import { colors } from '@/constants/appColors'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ProductSubCategoryButtonProps {
    subCategoryName: string
    subCategoryText: string
    setStep: React.Dispatch<React.SetStateAction<number>>
    setSubCategory?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductSubCategoryButton({ subCategoryName, subCategoryText, setStep, setSubCategory }: ProductSubCategoryButtonProps) {


    return (
        <View style={{ marginBottom: 20 }}>
            <Pressable
                style={({ pressed }) => [
                    styles.container,
                    {
                        backgroundColor: pressed
                            ? 'white'
                            : `${colors.items.min}`,
                    },
                ]}
                onPress={() => {
                    setStep(1)
                    if (setSubCategory) setSubCategory(true)
                }}
            >
                <Text style={{ color: colors.items.max, fontWeight: 'bold', fontSize: 20 }}>{subCategoryName}</Text>
                <Text style={styles.text}>
                    {subCategoryText}
                </Text>
            </Pressable>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        padding: 12,
        borderRadius: 6
    },

    text: {
        color: colors.items.max,
        marginTop: 2
    },

    comeBackButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 12
    },

    comeBackButtonText: {
        backgroundColor: colors.items.max,
        padding: 4,
        borderRadius: 4,
        fontWeight: 'bold',
        color: 'white'
    }

})