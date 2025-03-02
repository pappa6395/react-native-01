
import InputFile from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.pap.papaora',
    projectId: '67c159150005b2c2e55c',
    databaseId: '67c15b5700048cb08686',
    userCollectionId: '67c15baa0014249204f3',
    videoCollectionId: '67c15c4f0009e01d9429',
    storageId: '67c15fa70006d9907995'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = appwriteConfig;

import { CreateFormProps } from '@/app/(tabs)/create';
import RNFS from 'react-native-fs';
import { Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage } from 'react-native-appwrite';
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async(email: string, password: string, username: string) => {
    // Register User
   try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username,
    )
    if (!newAccount) {
        console.error('Failed to register user');
        return;
    }
    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )
    return newUser;

   } catch (err) {
    console.error('Error registering user:', err);
   }

}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if (!session) {
            console.log('Failed to sign in. Please try again');
            return;
        }
        return session;
    } catch (err) {
        console.error('Error signing in user:', err);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (err) {
        console.error('Error signing in user:', err);
    }
}

export const getCurrenUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error('Failed to get current user');
        }
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) {
            throw new Error('Failed to get current user');
        }
        return currentUser.documents[0];

    } catch (err) {
        console.error('Error getting current user:', err);
    }
}

export const getAllPosts = async () => {
    try {
        const allPosts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
            ]

        )
        if (!allPosts) {
            throw new Error('Failed to get all posts');
        }
        return allPosts.documents.map((doc) => (
            {
                id: doc.$id,
                creator: {
                    username: doc.creator.username,
                    avatar: doc.creator.avatar,
                },
                title: doc.title,
                description: doc.description,
                prompt: doc.prompt,
                thumbnail: doc.thumbnail,
                createdAt: doc.$createdAt,
                videoUrl: doc.video
            }
        ))

    } catch (err) {
        console.error('Error getting all posts:', err);
    }
}

export const getLatestPosts = async () => {
    try {
        const allPosts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(7)
            ]
        )
        if (!allPosts) {
            throw new Error('Failed to get all posts');
        }
        return allPosts.documents.map((doc) => (
            {
                id: doc.$id,
                creator: {
                    username: doc.creator.username,
                    avatar: doc.creator.avatar,
                },
                title: doc.title,
                description: doc.description,
                prompt: doc.prompt,
                thumbnail: doc.thumbnail,
                createdAt: doc.$createdAt,
                videoUrl: doc.video
            }
        ))

    } catch (err) {
        console.error('Error getting all posts:', err);
    }
}

export const searchPosts = async (query: any ) => {
    try {
        const searchPosts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.search('title', query),
                Query.limit(7)
            ]
        )
        if (!searchPosts) {
            throw new Error('Failed to get all posts');
        }
        return searchPosts.documents.map((doc) => (
            {
                id: doc.$id,
                creator: {
                    username: doc.creator.username,
                    avatar: doc.creator.avatar,
                },
                title: doc.title,
                description: doc.description,
                prompt: doc.prompt,
                thumbnail: doc.thumbnail,
                createdAt: doc.$createdAt,
                videoUrl: doc.video
            }
        ))

    } catch (err) {
        console.error('Error getting all posts:', err);
    }
}

export const getUserPosts = async (userId: any ) => {
    try {
        const userPosts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.equal('creator', userId),
                Query.orderDesc('$createdAt'),
            ]
        )
        if (!userPosts) {
            throw new Error('Failed to get all posts');
        }
        return userPosts.documents.map((doc) => (
            {
                id: doc.$id,
                creator: {
                    username: doc.creator.username,
                    avatar: doc.creator.avatar,
                },
                title: doc.title,
                description: doc.description,
                prompt: doc.prompt,
                thumbnail: doc.thumbnail,
                createdAt: doc.$createdAt,
                videoUrl: doc.video
            }
        ))

    } catch (err) {
        console.error('Error getting all posts:', err);
    }
}

export async function uploadFile(file: any, type: string) {
    if (!file) return;
    
    console.log('payload check:', file);
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }
    
    try {
        // Upload the file to Appwrite Storage using the Buffer
        const response = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
            
        );

        if (!response || !response.$id) {
            throw new Error('Failed to upload file: No response or invalid response from Appwrite.');
        }
    
      const fileUrl = await getFilePreview(response.$id, type);
      return {
        status: 200,
        data: { fileUrl },
        error: null,
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file. Please try again later.');
    }  
}
  

export const getFilePreview = async (fileId: string, type: string) => {

    let fileUrl;
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId, fileId,
                2000, 2000, ImageGravity.Top, 100 
            )
        } else {
            throw new Error('Unsupported file type');
        }
        if (!fileUrl) {
            throw new Error('Failed to get file preview');
        }
        return fileUrl;

    } catch (error) {
        console.log('Error getting file preview:', error);
        return {
            status: 500,
            data: null,
            error: 'An error occurred while getting the file preview. Please try again later.'
        }
    }
}

export const createVideoPost = async (form: CreateFormProps) => {
    try {
        const [thumbnailResponse, videoResponse] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const thumbnailUrl = thumbnailResponse?.data.fileUrl;
        const videoUrl = videoResponse?.data.fileUrl;

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
            
        )
        return {
            status: 200,
            data: { newPost },
            error: null,
        }
    } catch (err) {
        console.log('Error creating post:', err);
        return {
            status: 500,
            data: null,
            error: 'An error occurred while creating the post. Please try again later.'
        }
    }
}

