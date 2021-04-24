import { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export function Player(){

  const { episodeList, 
          currentEpisodeIndex, 
          isPlaying, 
          togglePlay 
        } = useContext(PlayerContext)

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
          <span>00:00</span>

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

          <span>00:00</span>
        </div>

        { episode && (

          <audio 
          src={episode.url}
          autoPlay
          />

        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="shuffleBtn"/>
          </button>
          <button type="button" disabled={!episode}>
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
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="playNextBtn"/>
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="repeatBtn"/>
          </button>
        </div>
      </footer>
    </div>
  )
}