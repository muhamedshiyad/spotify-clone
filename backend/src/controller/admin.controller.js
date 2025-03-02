import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const createSong = async (req, res) => {
    try {
        if(!req.file || !req.file.audiofile || !req.file.imagefile){
            return res.status(400).json({success: false, message: "Missing audio or image file"});
        }

        const { title, artist, albumId,duration } = req.body;
        const audiofile = req.file.audiofile;
        const imagefile = req.file.imagefile;

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
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}