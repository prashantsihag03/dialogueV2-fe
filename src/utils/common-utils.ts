const isTrue = (val: unknown) => {
  const result =
    val === true || val === 'true' || val === 'True' || val === 'TRUE'
  return result
}
export default isTrue
