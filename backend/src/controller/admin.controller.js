import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function for clloudinary upload
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto",
        });
        return result.secure_url
    } catch (error) {
        console.log("Error in cloudinary upload: ", error);
        throw new Error("Error uploading to cloudinary");
    }
}

export const createSong = async (req, res,next) => {
    try {
        if(!req.file || !req.file.audiofile || !req.file.imagefile){
            return res.status(400).json({success: false, message: "Missing audio or image file"});
        }

        const { title, artist, albumId,duration } = req.body;
        const audiofile = req.file.audiofile;
        const imagefile = req.file.imagefile;

        const audioUrl = await uploadToCloudinary(audiofile);
        const imageUrl = await uploadToCloudinary(imagefile);

        const song = new Song(
            {
                title,
                artist,
                audioUrl,
                imageUrl,
                duration,
                albumId: albumId || null
            }
        )

        await song.save();
        
        // if song belong to an album , update the album's song array
        if(albumId){
            await Album.findOneAndUpdate(albumId,{
                $push: {
                    songs: song._id
                }
            })
        }
        res.status(201).json(song);
    } catch (error) {
        console.log("Error in createsong ", error);
        next(error);
    }
}

export const deleteSong = async (req, res,next) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id)

        //if song belongs to an album, update the album's songs array
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: song._id},
            })
        }

        await Song.findByIdAndDelete(id);
        res.status(200).json({message: "Song deleted successfully"});
    } catch (error) {
        console.log("error in deletesong ", error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist,releaseYear } = req.body;
        const {imagefile} = req.files;

        const imageUrl = await uploadToCloudinary(imagefile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        await album.save();

        res.status(201).json(album);
    } catch (error) {
        console.log("Error in createAlbum: ", error);
        next(error);
        
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: "Album deleted successfully"});
    } catch (error) {
        console.log("Error in deleteAlbum: ", error);
        next(error);   
    }
}

export const checkAdmin = async (req, res) => {
    res.status(200).json({admin: true});
}