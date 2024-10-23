import reactLogo from '../assets/react.svg'
import './App.css'
import BookForm from "./containers/BookForm.jsx";

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Forms</h1>
      <div className="card">
        <BookForm />
      </div>
    </>
  )
}

export default App
