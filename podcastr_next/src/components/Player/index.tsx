import styles from './styles.module.scss'

export function Player(){

  return(
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="PlayingNow Img"/>
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
          <div className={styles.emptySlider}/>
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="shuffleBtn"/>
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="previousBtn"/>
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="playBtn"/>
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="playNextBtn"/>
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="repeatBtn"/>
          </button>
        </div>
      </footer>
    </div>
  )
}