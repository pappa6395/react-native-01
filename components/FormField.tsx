import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'
import React, { useState } from 'react'

const FormField = ({
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

    <View className={`space-y-2 ${otherStyles}`}>
        <Text className='text-base text-gray-100 
        font-pmedium'
        >
            {title}
        </Text>
        <View className='w-full h-16 px-4 bg-black-100 
        rounded-2xl border-2 border-black-200 focus:border-secondary-200 
        flex-row items-center'
        >
            <TextInput
                style={{ flex: 1 }} 
                className='text-white font-psemibold text-base'
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
            {title === 'Password' && (
                <TouchableOpacity 
                    className='ml-2' 
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Image 
                        source={!showPassword ? icons.eye : icons.eyeHide }
                        className='size-6'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </View>
    </View>
  )
}

export default FormField