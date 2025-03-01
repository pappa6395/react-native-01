import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'

type FormField = {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {

  const [form, setForm] = useState<FormField>({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async() => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    console.log('Submitting form:', form)
    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.username);
      if (!result) {
        Alert.alert('Error', 'Failed to sign up user')
        setIsSubmitting(false)
        return;
      }
      setIsSubmitting(false)
      Alert.alert('Success', 'User signed up successfully')
      router.push('/sign-in')
    
    } catch (err) {
      Alert.alert('Error', 'Failed to sign up user')
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
          <Text className='text-2xl text-white font-psemibold mt-10'>Sign up to Aora</Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({
              ...form, username: e
            })}
            otherStyles="mt-7"
          />
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
            title={'Sign Up'}
            handlePress={submit}
            containerStyles='w-full mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-gray-100 text-sm font-pregular'>
                Have an account already ?
            </Text>
            <Link href={"/sign-in"} className='text-sm font-psemibold text-secondary-200'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp