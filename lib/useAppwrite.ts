import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";
import { Posts } from "@/components/Trending";

export const useAppwrite = (fn: () => any ) => {
    const [data, setData] = useState<Posts[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchData = async() => {
        setIsLoading(true)
        // Fetch videos from API
        try {
            const response = await fn();
            setData(response)
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch videos')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    },[]);

    const refetch = () => fetchData();

    return { data, isLoading, refetch}
}