
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

import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
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
            console.error('Failed to sign in user');
            return;
        }
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

        )
        if (!allPosts) {
            throw new Error('Failed to get all posts');
        }
        return allPosts.documents;

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
        return allPosts.documents;

    } catch (err) {
        console.error('Error getting all posts:', err);
    }
}