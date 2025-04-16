import { Route, Routes } from 'react-router-dom'
import './App.css'
import ResponsiveAppBar from './components/header/Header'
import CartPage from './pages/cart/CartPage'
import MainPage from './pages/main/MainPage'
import ProductsPage from './pages/product/ProductsPage'
import { ToastContainer } from 'react-toastify';
import ProductDetails from './pages/productDetails/ProductDetails'
import NotFoundPage from './pages/notFound/NotFoundPage'
import CreateProduct from './pages/createProduct/CreateProduct'
import UpdateProduct from './pages/updateProduct/UpdateProduct'
import FavoriteProducts from './pages/favoriteProducts/FavoriteProducts'

function App() {
	return (
		<>
		<ToastContainer />
			<ResponsiveAppBar />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='/create-product' element={<CreateProduct />} />
				<Route path='/favorite-products' element={<FavoriteProducts />} />
				<Route path='/update-product/:id' element={<UpdateProduct />} />
				<Route path='/product-details/:id' element={<ProductDetails />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	)
}

export default App
