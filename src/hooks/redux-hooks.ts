import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



const useDebounce = <T> (value: T, delay: number) => {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debounceValue
}

export default useDebounce