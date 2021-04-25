import { createContext, useState, ReactNode } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number,
  isPlaying: boolean;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void
  togglePlay: () => void;
}

type PlayerContextProviderProps = {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PLayerContextProvider({ children }: PlayerContextProviderProps){
  
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsplaying] = useState(false)

  function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsplaying(true)
  }

  function togglePlay(){
    setIsplaying(!isPlaying)
  }

  function setPlayingState(state: boolean){
    setIsplaying(state)
  }

  return(

    <PlayerContext.Provider 
    value={{ 
      episodeList, 
      currentEpisodeIndex, 
      play, 
      isPlaying, 
      togglePlay, 
      setPlayingState 
    }}>
      {children}
    </PlayerContext.Provider>
  ) 
  }