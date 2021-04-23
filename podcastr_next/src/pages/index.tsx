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
  publishedAt: string;
}


type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[]
}


//não fazer formatação de dados no componente em si
import  Link  from 'next/link'
import styles from './home.module.scss'
import Image from 'next/image'
export default function Home({latestEpisodes, allEpisodes}: HomeProps){

  return(
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos Lançamentos</h2>
        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>

                <Image width={192} 
                height={192} 
                src={episode.thumbnail} 
                alt={episode.title}
                objectFit="cover"/>

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                  <button type="button">
                    <img src="/play-green.svg" alt="PlayBtn"/>
                  </button>
                </div>
                
              </li>
            )
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
          <h2>Todos episódios</h2>
          <table cellSpacing={0}>
            <thead>
              <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map(episode => {
                return (
                  <tr key={episode.id}>
                    <td style={{width: 72}}>
                      <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit='cover'
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{width: 100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type="button">
                          <img src="/play-green.svg" alt="PlayBtn"/>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)
    

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8
  }
}