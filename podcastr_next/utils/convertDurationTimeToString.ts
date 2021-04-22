export function convertDurationTimeToString(duration: number){
  const hours = Math.floor(duration / 3600)//se a duração for menor que uma hora será arredondado a zero
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration % 60

  const timeToString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')

    return timeToString
}