// import { useEffect } from "react"

//Formas de consumir APIs



// SPA

// export default function Home() {
//   //dois parâmetros, oque fazer e quando fazer
//   //array vazio no react faz que dispare uma unica vez quando carregado
//   useEffect(() => {
//     fetch('http://localhost:3333/episodes')
//     .then(response => response.json())
//     .then(data => console.log(data))
//   }, [])


//   return(
//     <h1>Index</h1>
//   )
// }

// SSR
// É executado toda vez que alguém acessar a page
// export default function Home(props){
//   console.log(props.episodes)

//   return(
//     <>
//     <h1>Index</h1>
//     <p>{JSON.stringify(props.episodes)}</p>
//     </>
//   )
// }


// export async function getServerSideProps(){
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()
    

//   return {
//     props: {
//       episodes: data
//     }
//   }
// }



// SSG --------------------

import { GetStaticProps } from 'next'


type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  published_at: string;
}


type HomeProps = {
  episodes: Episode[]
}


//não fazer formatação de dados no componente em si

import styles from './home.module.scss'
export default function Home(props: HomeProps){

  return(
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>

      </section>
      <section className={styles.allEpisodes}>

      </section>
    </div>
  )
}


import { api } from '../services/api'
import { format, parseISO} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationTimeToString } from '../../utils/convertDurationTimeToString'

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'publishet_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationTimeToString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,

    }
  })
    

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8
  }
}