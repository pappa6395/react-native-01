import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'
import React, { useState } from 'react'

const SearchInput = ({
    title,
    handleChangeText,
    value,
    placeholder,
    otherStyles,
    keyboardType,

}: {
    title: string,
    handleChangeText: (text: string) => void,
    value: string;
    placeholder?: string;
    otherStyles?: string;
    keyboardType?: string;
}) => {

    const [showPassword, setShowPassword] = useState(false);

  return (

    <View className='w-full h-16 px-4 bg-black-100 
        rounded-2xl border-2 border-black-200 focus:border-secondary-200 
        flex-row items-center space-x-4'
    >
        <TextInput
            style={{ flex: 1 }} 
            className='text-white font-pregular text-base flex-1 mt-0.5'
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#7b7b8b"}
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            keyboardType={keyboardType as any}
            returnKeyType='done'
            autoCorrect={false}
            autoCapitalize={'none'}
        />
        <TouchableOpacity>
            <Image 
                source={icons.search}
                className='size-5'
                resizeMode='contain'
            />
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput