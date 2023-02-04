import { Route, Routes } from 'react-router-dom'
import './App.css'
import SearchCommands from './pages/SearchCommands'
import AddCommand from './pages/AddCommand'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditCommand from './pages/EditCommand';

function App() {

  return (
    <div className="App">
      <ToastContainer position='bottom-right' theme='colored'/>
      <Routes>
        <Route path="/" element={<SearchCommands />} />
        <Route path="/add" element={<AddCommand />} />
        <Route path="/edit/:id" element={<EditCommand />} />
      </Routes>
    </div>
  )
}

export default App
