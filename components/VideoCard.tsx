import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';


const VideoCard = ({
    video
}: {
    video: {
        id: number;
        title: string;
        description: string;
        thumbnail: string;
        creator: {
            username: string;
            avatar: string;
        };
        createdAt: string;
    };
}) => {

    const { 
        id, 
        title, 
        description, 
        thumbnail,
        creator: {
            username,
            avatar
        },
        createdAt
     } = video

     const [play, setPlay] = useState(false)
    
  return (

    <View className='flex-col items-center px-4 mb-14'>
        <View className='flex-row gap-3 items-start'>
            <View className='justify-center items-center flex-row flex-1'>
                <View className='border border-secondary-200 justify-center 
                items-center w-[46px] h-[46px] rounded-lg p-0.5 '>
                    <Image
                        source={{ uri: thumbnail }}
                        className='w-full h-full rounded-lg'
                        resizeMode='cover'
                    />
                </View>
                <View className='justify-center flex-1 ml-3'>
                    <Text 
                        className='text-sm font-psemibold text-white'
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text className='text-xs text-gray-100 font-pregular'>
                        {username}
                    </Text>
                </View>
            </View>
            <View className='pt-2'>
                <Image
                    source={icons.menu}
                    className='size-5'
                    resizeMode='contain' 
                />
            </View>
        </View>
        {play ? 
        (   
            <Text className='text-white font-pregular text-sm mt-3'>
                Playing Video: {title}
            </Text>

        ) : (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                className='w-full h-60 rounded-xl mt-3 relative
                justify-center items-center'
            >
                <Image
                    source={{ uri: thumbnail }}
                    className='w-full h-full rounded-xl mt-3'
                    resizeMode='cover'
                />
                <Image
                    source={icons.play}
                    className='size-12 absolute'
                    resizeMode='contain' 
                />
            </TouchableOpacity>
        )}
      
    </View>

  )
}

export default VideoCard