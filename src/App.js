import './App.css'
import ShortenURL from './Components/ShortenURL'
import PreviewURL from './Components/PreviewURL'

function App () {
  return (
    <div className='App'>
      <div>
        <ShortenURL />
        <PreviewURL />
      </div>
    </div>
  )
}

export default App
