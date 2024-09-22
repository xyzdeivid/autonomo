import { View } from 'react-native'

interface ContainerProps {
    children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>{children}</View>
    )

}