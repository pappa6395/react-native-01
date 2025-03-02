import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({
    title, 
    handlePress, 
    containerStyles,
    textStyles,
    isLoading
}: {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
}) => {

  return (

    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading} 
        className={`bg-secondary-200 rounded-xl 
        min-h-[62px] justify-center items-center
        ${containerStyles} ${isLoading ? 'opacity-50' : '' }`}>
        <Text 
            className={`text-primary font-psemibold 
            text-lg ${textStyles}`}
        >
            {title}
        </Text>
    </TouchableOpacity>

  )
}

export default CustomButton