import './App.css'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className='flex flex-col w-full h-full'>
          <Header />
          <div className='flex bg-[#f7faff] flex-row w-full h-full'>
            <ProductsPage />
          </div>

        </div>} />
        <Route path="/checkout" element={
          <div className='flex flex-col w-full h-full'>
            <Header />
            <CheckoutPage />
          </div>
        } />
      </Routes>
    </Router>

  )
}

export default App
