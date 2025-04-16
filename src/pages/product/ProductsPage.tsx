import {
	MenuItem,
	Pagination,
	Select,
	SelectChangeEvent,
	Stack,
} from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCart } from '../../features/slices/cartSlice'
import {
	fetchProducts,
	filterByCategory,
	getCategories,
	setCurrentPage,
	toggleLike,
} from '../../features/slices/productsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { CartItem, Product } from '../../types/types'

const ProductsPage = () => {
	const {
		filteredProducts,
		categories,
		selectedCategory,
		currentPage,
		itemsPerPage,
		loading,
		error,
	} = useAppSelector(state => state.products)
	const dispatch = useAppDispatch()
	const [search, setSearch] = useState('')

	const searchFilterProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
	

	const handleCategoryChange = (
		event: SelectChangeEvent<{ value: string }> // MUI - ChangeEvent эмес, SelectChangeEvent<string> болуу керек.
	): void => {
		const category = event.target.value as string
		dispatch(filterByCategory(category === 'Все категории' ? null : category))
	}

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,   // MUI Pagination обработчик 2 аргумент кутот биз ага бироосун гана бергенбиз: (event и page).
		page: number
	): void => {
		dispatch(setCurrentPage(page))
	}

	const handleAddToCart = (product: CartItem) => {
		dispatch(addToCart({ ...product, quantity: 1 }))  // AddToCart(продукт: CartItem) функция number поля объектти кутот, бирок биз аны берген жокпуз.
	}

	useEffect(() => {
		dispatch(fetchProducts())
		dispatch(getCategories())
	}, [dispatch])
	

	if (error) return <div>Продукты не найдены</div>
	if (loading)
		return (
			<Box sx={{ width: '100%' }}>
				<LinearProgress color='secondary' />
			</Box>
		)
	const indexOfLastProduct = currentPage * itemsPerPage
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
	const currentPageProducts = searchFilterProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	)
	const totalPages = Math.ceil(searchFilterProducts.length / itemsPerPage)

	return (
		<>
		<input type="text" placeholder='Search...' className='w-full h-10 border border-black pl-5' onChange={(e) => setSearch(e.target.value)} />
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				label='Age'
				value={{ value: selectedCategory || 'Все категории'}} // бул жерде, selectedCategory null болушу мүмкүн жана компонент string күтөт
				onChange={handleCategoryChange}
			>
				<MenuItem value={'Все категории'}>Все категории</MenuItem>
				{categories.map(category => (
					<MenuItem value={category.name} key={category.id}>
						{category.name}
					</MenuItem>
				))}
			</Select>
			<div className='flex flex-wrap gap-20 justify-around mt-10'>
				{currentPageProducts.map((product: Product) => (
					<div key={product.id} className='w-[215px] h-full cursor-pointer'>
						<Link to={`/product-details/${product.id}`}>
							<img
								src={product.images[0]}
								alt='error'
								className='w-full h-[250px] rounded-lg'
							/>
						</Link>
						<div className='flex justify-between items-center'>
							<p className='text-orange-600 font-bold text-xl mt-3'>
								{product.price} сом
							</p>
							<button onClick={() => dispatch(toggleLike(product.id))}>
								{product.like ? '❤️' : '🤍'}
							</button>
						</div>
						<p className='text-xl font-sans mt-2'>{product.title}</p>
						<button
							className='w-full h-10 bg-violet-600 rounded-2xl text-white text-md font-mono mt-5 hover:bg-violet-700'
							onClick={() => handleAddToCart({...product, quantity: 1})}
						>
							В корзину
						</button>
					</div>
				))}
			</div>
			{totalPages > 1 && (
				<Stack
					spacing={2}
					direction='row'
					justifyContent='center'
					marginTop='50px'
				>
					<Pagination
						count={totalPages}
						color='secondary'
						page={currentPage}
						onChange={handlePageChange}
					/>
				</Stack>
			)}
		</>
	)
}

export default ProductsPage