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
                style={styles.container}
                onPress={() => {
                    setStep(2)
                    if (setSubCategory) setSubCategory(true)
                }}
            >
                <Text style={{ color: '#330066', fontWeight: 'bold', fontSize: 20 }}>{subCategoryName}</Text>
                <Text style={styles.text}>
                    {subCategoryText}
                </Text>
            </Pressable>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        backgroundColor: '#6600CC1A',
        padding: 12,
        borderRadius: 6
    },

    text: {
        color: '#330066',
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
        backgroundColor: '#330066',
        padding: 4,
        borderRadius: 4,
        fontWeight: 'bold',
        color: 'white'
    }

})