import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '@/components/SearchInput'
import Trending, { Posts } from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts, getUserPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { usePapAoraContext } from '@/context/globalProvider'

const Home = () => {

  const { user } = usePapAoraContext()

  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async() => {
    setRefreshing(true)
    // Fetch latest videos from API
    await refetch()
    // Simulate a delay to mimic network request
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }
  
  

  return (
    <SafeAreaView>
      <FlatList 
        data={posts}
        keyExtractor={(item, index) => item?.id?.toString() ?? `post-${index}`}
        renderItem={({ item }) => (
          <VideoCard post={item as Posts} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-sm font-pmedium text-white'>
                  Welcome Back
                </Text>
                <Text className='text-3xl text-white font-bold'>
                  {user?.username}
                </Text> 
              </View>
              <View className='mt-5'>
                <Image
                  source={images.logoSmall} 
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput 
              title='Search'
              placeholder='Search for a video title'
              otherStyles='mt-6'
            />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                  Latest Videos
              </Text>
              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title='No Videos Found'
            subtitle='Be the first one to upload a video'
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />

      
    </SafeAreaView>
  )
}

export default Home