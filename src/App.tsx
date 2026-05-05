import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Cash Operations System</h1>
          <p>Loading...</p>
        </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App