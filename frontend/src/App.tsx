
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import './App.css'
import {Signup} from './route/Signup'
import Signin from './route/Signin'
import Blog from './route/Blog'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
