import { useRef, useEffect, useState } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationTimeToString } from '../../../utils/convertDurationTimeToString'

export function Player(){

  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const { episodeList, 
          currentEpisodeIndex, 
          isPlaying,
          isLooping,
          isShuffling, 
          togglePlay,
          toggleLoop,
          toggleShuffle,
          setPlayingState,
          playNext,
          playPrevious,
          hasNext,
          hasPrevious
        } = usePlayer()


  useEffect(() => {
    if(!audioRef.current){
      return
    }

    if(isPlaying){
      audioRef.current.play()
    } else{
      audioRef.current.pause()
    }

  }, [isPlaying])

  function setupProgressListener(){
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }


  const episode = episodeList[currentEpisodeIndex]

  return(
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="PlayingNow Img"/>
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image 
            width={592} 
            height={592} 
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
        </div>
      ) }

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>

        <span>{convertDurationTimeToString(progress)}</span>

          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider}/>
            )}
          </div>

          <span>{convertDurationTimeToString(episode?.duration ?? 0)}</span>
        </div>

        { episode && (

          <audio 
          src={episode.url}
          ref={audioRef}
          autoPlay
          loop={isLooping}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          onLoadedMetadata={setupProgressListener}
          />

        )}

        <div className={styles.buttons}>
          <button 
            type="button" 
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="shuffleBtn"/>
          </button>
          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src="/play-previous.svg" alt="previousBtn"/>
          </button>
          <button 
            type="button" 
            className={styles.playButton} 
            disabled={!episode}
            onClick={togglePlay}
          >
            { isPlaying
              ? <img src="/pause.svg" alt="PauseBtn"/>
              : <img src="/play.svg" alt="PlayBtn"/>
              }
          </button>
          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="playNextBtn"/>
          </button>
          <button 
            type="button" 
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="repeatBtn"/>
          </button>
        </div>
      </footer>
    </div>
  )
}