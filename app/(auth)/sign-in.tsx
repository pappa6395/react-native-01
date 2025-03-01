import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { signIn } from '@/lib/appwrite'

type FormField = {
  email: string;
  password: string;
}

const SignIn = () => {

  const [form, setForm] = useState<FormField>({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
      return;
    }
    setIsSubmitting(true)
    console.log('Submitting form:', form)
    
    try {
      const result = await signIn(form.email, form.password)
      if (!result) {
        Alert.alert('Error', 'Failed to sign in user')
        setIsSubmitting(false)
        return;
      }
      Alert.alert('Success', 'User signed in successfully')
      setIsSubmitting(false)
      router.push('/home')

    } catch (err) {
      Alert.alert('Error', 'Failed to sign in user')
      setIsSubmitting(false)
      return;
    }
    
  }

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white font-psemibold mt-10'>Log in to Aora</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({
              ...form, email: e
            })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form, password: e
            })}
            otherStyles="mt-7"
          />
          <CustomButton
            title={'Sign In'}
            handlePress={submit}
            containerStyles='w-full mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-gray-100 text-sm font-pregular'>
                Don&apos;t have an account ?
            </Text>
            <Link href={"/sign-up"} className='text-sm font-psemibold text-secondary-200'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn