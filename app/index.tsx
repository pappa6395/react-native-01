import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '@/components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import 'react-native-url-polyfill/auto'
import { usePapAoraContext } from '@/context/globalProvider'


function App () {

  const { isLoading, isLoggedIn } = usePapAoraContext();
  
  if (!isLoading && isLoggedIn) {
      return <Redirect href='/home' />
  }
  
  return (

    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
      }}
      >
        <View className='flex-1 justify-center items-center px-6 min-h-[85vh]'>
            <Image 
              source={images.logo}
              className='w-[130px] h-[84px]'
              resizeMode='contain'
            />
            <Image 
              source={images.cards}
              className='max-w-[380px] w-full h-[300px]'
              resizeMode='contain'
            />
            <View className='mt-5 relative'>
              <Text className='text-3xl text-white font-bold text-center'>
                  Discover Endless Possibilities with {' '}
                  <Text className='text-secondary-200'>Aora</Text>
              </Text>
              <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
              />
            </View>
            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
              Where creativity meets innovation: embark on a journey of limitless exploration with Aora
            </Text>

            <CustomButton
              title={'Continue with Email'}
              handlePress={() => router.push('/sign-in')}
              containerStyles='w-full mt-7'
            />
            
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>

  )
}

export default App