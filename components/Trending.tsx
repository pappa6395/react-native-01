import { 
  Image, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ImageBackground, 
  ViewStyle, 
  TextStyle, 
  ImageStyle, 
  View, 
  Button,
  StyleSheet 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import { VideoView, useVideoPlayer } from 'expo-video'
import { Video, ResizeMode } from 'expo-av'
import { useEvent } from 'expo';


const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: { transform: [{ scale: 0.9 }] },
  1: { transform: [{ scale: 1 }] },
}
const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: { transform: [{ scale: 1 }] },
  1: { transform: [{ scale: 0.9 }] },
}


const TrendingItem = ({ 
  activeItem, 
  item 
}: {
  activeItem: any;
  item: any;
}) => {

  const [play, setPlay] = useState(false);
  const videoSource = item?.videoUrl

  const player = useVideoPlayer(videoSource, player => {
    player.play();
    player.loop = false;
  });


  return (
    <Animatable.View
      className=''
      animation={activeItem?.id === item.id ? zoomIn : zoomOut }
      duration={500}
    >
      {play ? (
        <VideoView 
          style={styles.video} 
          player={player} 
          allowsFullscreen 
          allowsPictureInPicture 
          
        />
        
      ) : (
        <TouchableOpacity 
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail}}
            className='w-52 h-72 rounded-[35px] my-5 
            overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />
          <Image 
            source={icons.play}
            className='absolute bottom-0 right-0 size-12'
          />
        </TouchableOpacity>
      )}
      
    </Animatable.View>
  )
}

export type PostProps = {
  posts: Posts[];
}
export type Posts = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  prompt: string;
  creator: {
    username: string;
    avatar: string;
  };
  createdAt: string;
}

const Trending: React.FC<PostProps> = ({ posts }) => {

  const [activeItem, setActiveItem] = useState<Posts | null>(posts?.[0] || null);

  const viewableItemsChanged = ({
    viewableItems 
  }: {
    viewableItems: { index: number }[]  // An array of objects with an index property
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index!== 0) {
      setActiveItem(posts[viewableItems[0].index]);
    }
  }
  if (!posts || posts.length === 0) return <Text className="text-white">No posts available</Text>;

  return (

   <FlatList 
     data={posts}
     keyExtractor={(post, index) => post?.id?.toString() ?? `post-${index}`}
     renderItem={({ item }) => (
       <TrendingItem activeItem={activeItem} item={item} />
     )}
     //ListHeaderComponent={() => <Text className='text-white'>Trending Videos</Text>}
     //ListFooterComponent={() => <Text className='text-white'>End of Trending</Text>}
     showsVerticalScrollIndicator={false}
     onViewableItemsChanged={viewableItemsChanged as (viewableItems: any) => void}
     viewabilityConfig={{itemVisiblePercentThreshold: 70}}
     horizontal
   />

  )
}

export default Trending

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