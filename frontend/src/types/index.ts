export interface Song {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    title: string;
    artist:string;
    imageUrl:string;
    songs:Song[];
}

export interface Stats{
    totalAlbums:number;
    totalSongs:number;
    totalUsers:number;
    totalArtists:number;
}

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    _id: string;
    ClerkId: string;
    fullName:string;
    ImageUrl:string;
}