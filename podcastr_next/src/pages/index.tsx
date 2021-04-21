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



// SSG

export default function Home(props){
  console.log(props.episodes)

  return(
    <>
    <h1>Index</h1>
    <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}


export async function getStaticProps(){
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()
    

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}