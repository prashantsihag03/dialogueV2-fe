const isTrue = (val: unknown) => {
  const result =
    val === true || val === 'true' || val === 'True' || val === 'TRUE'
  console.log('Checking if ', val, ' is true: ', result)
  return result
}
export default isTrue
