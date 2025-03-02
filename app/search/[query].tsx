import { FlatList, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import { Posts } from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { searchPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])
  

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={posts}
        keyExtractor={(item, index) => item?.id?.toString() ?? `post-${index}`}
        renderItem={({ item }) => (
          <VideoCard post={item as Posts} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6 w-full'>
            <View className='justify-between items-start mb-6'>
              <View>
                <Text className='text-sm font-pmedium text-white'>
                  Search Results
                </Text>
                <Text className='text-3xl text-white font-bold'>
                  {query}
                </Text> 
                
                <View className='mt-6 mb-8 w-full'>
                    <SearchInput
                      title=''
                      initialQuery={query}
                      placeholder='Search for a video topic'
                      otherStyles='mt-6 w-full'
                      keyboardType='default'
                      
                    />
                </View>
              </View>
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

export default Search