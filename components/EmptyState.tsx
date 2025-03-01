import { View, Text, Image } from 'react-native'
import { images } from '../constants'
import React from 'react'
import CustomButton from './CustomButton';
import { router } from 'expo-router';


const EmptyState = ({
    title,
    subtitle,
    otherStyles,
}: {
    title: string;
    subtitle: string;
    otherStyles?: string;
}) => {

  return (

    <View className='justify-center items-center px-4'>
      <Image 
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />
      <Text className={`text-white text-lg font-psemibold mt-6 ${otherStyles}`}>
        {title}
      </Text>
      <Text className='text-gray-400 font-pmedium text-md'>
        {subtitle}
      </Text>
      <CustomButton
        title={'Create a video'}
        handlePress={() => router.push('/create')}
        containerStyles='w-full px-3 mt-7 my-5'
        textStyles='text-primary text-base font-psemibold' 
      />
    </View>

  )
}

export default EmptyState