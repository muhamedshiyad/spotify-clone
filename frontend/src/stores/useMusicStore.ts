import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import {create} from "zustand";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	madeforyousongs: Song[];
	trendingSongs: Song[];
	featuredSongs: Song[];
	stats:Stats

    fetchAlbums: () => Promise<void>;
	fetchAlbumById:(id:string) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums:[],
    songs:[],
    isLoading: false,
	error: null,
	currentAlbum: null,
	madeforyousongs: [],
	trendingSongs: [],
	featuredSongs: [],
	stats:{
		totalAlbums:0,
		totalSongs:0,
		totalUsers:0,
		totalArtists:0
	},

	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/song/${id}`);

			set(state =>({
				songs:state.songs.filter(song=>song._id !== id)
			}))
			toast.success("song delete successfully")
		} catch (error) {
			
		}
	},

	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data });
		} catch (error:any) {
			set({ error: error.message });
		}finally{
			set({isLoading: false});
		}
	},

	fetchStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/stats");
			set({ stats: response.data });
		} catch (error:any) {
			set({ error: error.message });
		}finally{
			set({isLoading: false});
		}
	},

    fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById:async(id) =>{
		set({isLoading: true,error:null});
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({currentAlbum:response.data});
		} catch (error: any) {
			set({error: error.response.data.message});
		}finally{
			set({isLoading: false});
		}
	},

	fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/featured");
			set({ featuredSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		}finally{
			set({isLoading: false});
		}
	},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response =await axiosInstance.get("/songs/made-for-you");
			set({ madeforyousongs: response.data });
		} catch (error:any) {
			set({ error: error.response.data.message });
		}finally{
			set({isLoading: false});
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error:any) {
			set({ error: error.response.data.message });
		}finally{
			set({isLoading: false});
		}
	},
}));