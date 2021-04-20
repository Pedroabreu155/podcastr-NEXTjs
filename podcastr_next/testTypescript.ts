

function createWelcomeMessade(user: User){
  return `Boas-vindas, ${user.name}! Cidade: ${user.adress.city}`
}

// com o typescript
type User = {
  name: string,
  adress: {
    city: string,
    state: string
  }
}


//ajudas que o TS dá para não cometer erros de código

type ButtonProps = {
  title: string
}


function Button(props: ButtonProps){
  return (
    <button>{props.title}</button>
  )
}

function App(){
    return(
      <div>
        <Button title="Button 1">
      </div>
    )
}