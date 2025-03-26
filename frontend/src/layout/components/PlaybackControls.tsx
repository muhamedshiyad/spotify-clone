import { usePlayerStore } from "@/stores/usePlayerStore"
import { use, useEffect, useRef, useState } from "react";

const playbackControls = () => {
    const{currentSong,isPlaying,togglePlay,playNext,playPrevious} = usePlayerStore();

    const[volume,setVolume] = useState(75);
    const [currentTime,setCurrentTime] = useState(0);
    const [duration,setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement|null>(null);

    useEffect(()=>{
        audioRef.current = document.querySelector("audio");

        const audio = audioRef.current;
        if(!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate",updateTime);
        audio.addEventListener("loadedmetdata",updateDuration);

        const handleEnded = () => {
            usePlayerStore.setState({isPlaying:false});
        }

        audio.addEventListener("ended",handleEnded);

        return () => {
            audio.removeEventListener("timeupdate",updateTime);
            audio.removeEventListener("loadedmetdata",updateDuration);
            audio.removeEventListener("ended",handleEnded);
        };
    },[currentSong]);

    const handleSeek = (value: number) => {
        if(audioRef.current){
            audioRef.current.currentTime = value;
        }
    }

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
        <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">

        </div>
    </footer>
  )
}

export default playbackControls