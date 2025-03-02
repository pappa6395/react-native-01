import { StyleSheet ,View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { useVideoPlayer, VideoView } from 'expo-video'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createVideoPost } from '@/lib/appwrite'
import { usePapAoraContext } from '@/context/globalProvider'
import * as ImagePicker from 'expo-image-picker';

export type CreateFormProps ={
  userId: number | null;
  title: string;
  video: ImagePicker.ImagePickerAsset | null;
  thumbnail: ImagePicker.ImagePickerAsset | null;
  prompt: string;
}

const create = () => {

  const { user } = usePapAoraContext()

  const [upLoading, setUpLoading] = useState(false)
  const [form, setForm] = useState<CreateFormProps>({
    userId: user?.id || null,
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  })

  const videoSource = form.video?.uri ?? "";
  
  const player = useVideoPlayer(videoSource, player => {
    player.play();
    player.loop = false;
  });

  const openPicker = async (selectType: string) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type: selectType === 'image' 
    //   ? ['image/png', 'image/jpg', 'image/heif', 'image/jpeg'] 
    //   : ['video/mp4', 'video/gif'],
    // });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image'? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
         ...form, 
          thumbnail: result?.assets[0],
        })
      }
      if (selectType === 'video') {
        setForm({
         ...form, 
          video: result?.assets[0],
        })
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      Alert.alert('Error', 'Please fill or upload in all the fields')
      return;
    }
    setUpLoading(true);

    try {
      await createVideoPost({
        ...form, userId: user.$id
      })
      Alert.alert('Success', 'Post uploaded successfully!' )
      setUpLoading(false)
      router.push('/home')

    } catch (error) {
      Alert.alert('Error', 'Failed to create post')
      setUpLoading(false)
    } finally {
      setForm({
        userId: null,
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      })
    }

  }

  return (
    
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Upload Video
        </Text>

        <FormField
          title={'Video Title'}
          value={form.title}
          placeholder='Give your video a catch tiltle...'
          handleChangeText={(e) => setForm({
           ...form, title: e
          })}
          otherStyles='mt-10' 
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <VideoView 
                player={player}
                style={styles.video}
                allowsFullscreen 
                allowsPictureInPicture 
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 
              rounded-2xl justify-center items-center'
              >
                <View className='w-14 h-14 border border-dashed 
                border-secondary-100 justify-center items-center'
                >
                  <Image
                    source={icons.upload}
                    className='w-1/2 h-1/2'
                    resizeMode='contain'
                  />
                </View>

              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri : form.thumbnail.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode='contain'
            />
            ) : (
              <View className='w-full h-16 px-4 bg-black-100 
              rounded-2xl justify-center items-center border-2
              border-black-200 flex-row space-x-2 gap-2'
              >
                <Image
                  source={icons.upload}
                  className='w-5 h-5'
                  resizeMode='contain'
                />
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Choose a thumbnail image for your video.
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title={'AI Prompt'}
          value={form.prompt}
          placeholder='The prompt you used to create this video...'
          handleChangeText={(e) => setForm({
           ...form, prompt: e
          })}
          otherStyles='mt-10'
        />
        <CustomButton
          title={'Submit & Publish'}
          isLoading={upLoading}
          handlePress={submit}
          containerStyles='w-full mt-7'
        />
      </ScrollView>
    </SafeAreaView>

  )
}

export default create

const styles = StyleSheet.create({
  video: {
    width: 180,
    height: 225,
    borderRadius: 35,
    marginTop: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  controlsContainer: {
    padding: 10,
  },
});