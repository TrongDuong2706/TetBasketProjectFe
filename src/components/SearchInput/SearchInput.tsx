import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getBasketByName } from 'src/apis/basket.api'

export default function SearchInput() {
    const [query, setQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    const [page, setPage] = useState(1) // Page bắt đầu từ 1
    const pageSize = 5 // Định kích thước trang
    const [name, setName] = useState<string | null>(null)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['getBasketByName', page, name],
        queryFn: () => getBasketByName(page, pageSize, name)
    })

    const basket = data?.data.result.elements || []

    useEffect(() => {
        setFilteredProducts(
            basket.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            )
        )
    }, [query, basket])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
    }

    return (
        <div className='relative'>
            <input
                type='text'
                placeholder='Tìm kiếm sản phẩm'
                className='w-full py-2 pl-4 pr-8 rounded bg-[#feffea] text-black text-sm focus:outline-none focus:ring-0'
                value={query}
                onChange={handleInputChange}
            />
            <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800' size={16} />
            {query && (
                <div className='absolute w-full bg-white border border-gray-300 rounded mt-1'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id} className='p-2 hover:bg-gray-100 flex items-center'>
                                <img src={product.image} alt={product.name} className='w-10 h-10 mr-2' />
                                <div>
                                    <div className='text-black'>{product.name}</div>
                                    <div className='text-gray-500'>{product.price}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='p-2 text-gray-500'>No products found</div>
                    )}
                </div>
            )}
        </div>
    )
}
