import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { icons } from '../constants'
import React, { useState } from 'react'
import { router, usePathname } from 'expo-router';

const SearchInput = ({
    title,
    placeholder,
    otherStyles,
    keyboardType,
    initialQuery

}: {
    title: string,
    placeholder?: string;
    otherStyles?: string;
    keyboardType?: string;
    initialQuery?: any;
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [query, setQuery] = useState<string>(initialQuery || "");
    const pathname = usePathname();

  return (

    <View className='w-full h-16 px-4 bg-black-100 
        rounded-2xl border-2 border-black-200 focus:border-secondary-200 
        flex-row items-center space-x-4'
    >
        <TextInput
            style={{ flex: 1 }} 
            className='text-white font-pregular text-base flex-1 mt-0.5'
            value={query}
            placeholder={placeholder}
            placeholderTextColor={"#CDCDE0"}
            onChangeText={(e) => setQuery(e)}
            secureTextEntry={title === 'Password' && !showPassword}
            keyboardType={keyboardType as any}
            returnKeyType='done'
            autoCorrect={false}
            autoCapitalize={'none'}
        />
        <TouchableOpacity
            onPress={() => {
                if (!query) {
                    return Alert.alert('Missing query', 
                    "Please input somethings to reach results across database")
                }
                if (pathname.startsWith('/search')) router.setParams({ query })
                else router.push(`/search/${query}`)
            }}
        >
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