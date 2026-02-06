import { ScrollView } from 'react-native'

export function ListContainer({ children }: { children: React.ReactNode }) {

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
            {children}
        </ScrollView>
    )

}