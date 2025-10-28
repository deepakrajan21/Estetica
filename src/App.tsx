import './App.css'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage'

const App: React.FC = () => {

  return (
    <div className='flex flex-col w-full h-full'>
      <Header />
      <ProductsPage />
    </div>
  )
}

export default App
