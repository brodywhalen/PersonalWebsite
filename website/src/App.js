import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Notes from './components/Notes'

const App = () => {

  const padding = {
    padding: 5
  }

return (
  <Router>
    <div>
      <h1> Brody Whalen's Website </h1>
    </div>
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/notes">notes</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
    <Routes> 
      <Route path="/notes" element={<div>{<Notes />}</div>} />
      <Route path="/users" element={<div>users</div>} />
      <Route path="/" element={<div>nothing</div>} />
    </Routes>
  </Router>
  )
}

export default App;
