import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
import { Posts } from './Trending';
import { useVideoPlayer, VideoView } from 'expo-video';



const VideoCard = ({post}: {post: Posts}) => {

    
    const [play, setPlay] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
   
    const videoUrl = post.videoUrl
    
    if (!videoUrl) return undefined

    const player = useVideoPlayer(videoUrl, player => {
        player.play();
        if (player.status === 'idle') {
            player.loop = true;
        } else {
            player.loop = false;
        }
    });

    const handleToggleMenu = () => {
        setIsOpen(!isOpen)
    }


    //console.log('play', play);
    
    
  return (

    <View className='flex-col items-center px-4 mb-14'>
         <View className='w-full'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='border border-secondary-200 justify-center 
                    items-center w-[46px] h-[46px] rounded-lg p-0.5 '>
                        <Image
                            source={{ uri: post.thumbnail }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3'>
                        <Text 
                            className='text-sm font-psemibold text-white'
                            numberOfLines={1}
                        >
                            {post.title}
                        </Text>
                        <Text className='text-xs text-gray-100 font-pregular'>
                            {post.creator.username}
                        </Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <TouchableOpacity
                        onPress={handleToggleMenu}
                    >
                        <Image
                            source={icons.menu}
                            className='size-5'
                            resizeMode='contain' 
                        />
                    </TouchableOpacity>
                    {isOpen && (
                        <View className='absolute top-12 right-0 w-[40px] bg-black-200 rounded-xl shadow-md'>
                            <Text className='text-white'>Hello</Text>
                        </View>
                    )}
                </View>
            </View>
            <View className='w-full px-2'>
                {play ? 
                (   
                    <VideoView 
                        style={styles.video} 
                        player={player} 
                        allowsFullscreen 
                        allowsPictureInPicture 
                    />
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>setPlay(true)}
                        className='w-full h-60 rounded-xl mt-3 relative
                        justify-center items-center'
                    >
                        <ImageBackground
                            source={{ uri: post.thumbnail }}
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
        </View>
    </View>

  )
}

export default VideoCard

const styles = StyleSheet.create({
  video: {
    width: 330,
    height: 225,
    borderRadius: 35,
    marginTop: 6,
    backgroundColor: 'black',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  controlsContainer: {
    padding: 10,
  },
});