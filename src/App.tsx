import './styles.css'
import img from './programmer.png'
import logo from './Logo.svg'

export const App = () => {
  return (
    <>
      <img src={img} alt="logo" width={300} height={300} />
      <img src={logo} alt="logo" width={300} height={300} />
      <h1>Hi {process.env.name}</h1>
    </>
  )
}
