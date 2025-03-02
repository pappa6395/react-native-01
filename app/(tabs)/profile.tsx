import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Posts } from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { router } from 'expo-router'
import { usePapAoraContext } from '@/context/globalProvider'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'

const Profile = () => {

  const { user, setUser, setIsLoggedIn } = usePapAoraContext()

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

  const logout = async () => {
    
    await signOut();
    Alert.alert('logout', 'logged out successfully')
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/sign-in');
  }
  

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={posts}
        keyExtractor={(item, index) => item?.id?.toString() ?? `post-${index}`}
        renderItem={({ item }) => (
          <VideoCard post={item as Posts} />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
              <TouchableOpacity 
                className='w-full items-end mb-10 px-2'
                onPress={logout}
              >
                <Image 
                  source={icons.logout}
                  resizeMode='contain'
                  className='size-6'
                />
              </TouchableOpacity>
              <View className='w-16 h-16 border border-secondary-200
              rounded-lg justify-center items-center'>
                <Image
                  source={{ uri : user?.avatar }} 
                  className='w-[90%] h-[90%] rounded-lg'
                  resizeMode='cover'
                />
              </View>
              <InfoBox
                title={user?.username}
                subtitle={user?.email}
                containerStyles={'mt-5'}
                titleStyles={'text-lg'}
              />
              <View className='mt-5 flex-row items-center justify-center gap-4'>
                <InfoBox
                  title={posts.length || 0}
                  subtitle={'Posts'}
                  containerStyles={'mt-5'}
                  titleStyles={'text-lg'}
                />
                <InfoBox
                title={'1.2k'}
                subtitle={'Followers'}
                containerStyles={'mt-5'}
                titleStyles={'text-xl'}
              />
              </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title='No Videos Found'
            subtitle='No videos found for this search query'
          />
        )}
      />

      
    </SafeAreaView>
  )
}

export default Profile