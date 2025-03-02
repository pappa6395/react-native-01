import { View, Text } from 'react-native'
import React from 'react'


const InfoBox = ({
    title,
    subtitle,
    containerStyles,
    titleStyles,
}: {
    title: string | number;
    subtitle: string;
    containerStyles?: string;
    titleStyles?: string;
}) => {

  return (
    <View className={containerStyles}>
        <Text className={`text-white text-center font-psemibold ${titleStyles}`}
        >
            {title}
        </Text>
        <Text className='text-sm text-gray-100 text-center font-regular'>{subtitle}</Text>
    </View>
  )
}

export default InfoBox