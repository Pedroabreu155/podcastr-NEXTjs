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
    menbers: string
}


type HomeProps = {
  episodes: Array<Episode>
}

export default function Home(props: HomeProps){

  return(
    <>
    <h1>Index</h1>
    <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}


import { api } from '../services/api'

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'publishet_at',
      _order: 'desc'
    }
  })

    

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}