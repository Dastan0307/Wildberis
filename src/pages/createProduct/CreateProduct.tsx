import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
	const [title, setTitle] = useState<string>('')
	const [price, setPrice] = useState<number>(0)
	const [description, setDescription] = useState<string>('')
	const [categoryId, setCategoryId] = useState<number>(0)
	const [images, setImages] = useState<string[]>([''])

	const navigate = useNavigate()

	const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const updateUrls = [...images]
		updateUrls[index] = event.target.value
		setImages(updateUrls)
	}

	const handleAddImage = () => {
		setImages([...images, ''] as string[])
	}

	const API = import.meta.env.VITE_API_URL
	

	const handleSubmit = async () => {
		if (title && price > 0 && images.every(url => url !== '')) {
			try {
				const product = {
					title,
                    price,
                    description,
                    categoryId,
                    images
				}

				const response = await axios.post(`${API}/products`, product)
				console.log(response.data);
				alert('Продукт успешно создан!')
				navigate('/products')
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<div className='w-[300px] mx-auto flex flex-col justify-start'>
			<h2 className='text-4xl'>Создать продукт</h2>
			<input
				type='text'
				placeholder='Название'
				value={title}
				onChange={e => setTitle(e.target.value)}
				className='w-full h-10 border border-black rounded-md pl-2 mt-20'
			/>
			<input
				type='number'
				placeholder='Цена'
				value={price}
				onChange={e => setPrice(Number(e.target.value))}
				className='w-12 h-10 border border-black rounded-md pl-2 mt-4'
			/>
			<textarea
				placeholder='Описание'
				value={description}
				onChange={e => setDescription(e.target.value)}
				className='w-full h-14 border border-black rounded-md pl-2 mt-4'
			/>
			<input
				type='number'
				placeholder='Категория'
				value={categoryId}
				onChange={e => setCategoryId(Number(e.target.value))}
				className='w-12 h-10 border border-black rounded-md pl-2 mt-4'
			/>

			<div>
				{
					images.map((url, index) => (
						<div key={index}>
							<input 
								type="text" 
								placeholder='URL картинки'
								value={url}
								onChange={(event) => handleImageUrlChange(event, index)}
								className='w-full h-10 border border-black rounded-md pl-2 mt-5'
							/>
						</div>
					))
				}
				<button onClick={handleAddImage} className='w-full text-left underline  mt-2'>Добавить картинку</button>
			</div>

			<button onClick={handleSubmit} className='w-full h-10 border border-black rounded-xl mt-2'>Создать продукт</button>
		</div>
	)
}

export default CreateProduct
