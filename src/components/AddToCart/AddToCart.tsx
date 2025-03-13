import { useState } from 'react';
import { Button } from 'src/components/ui/Button';
import { FaShoppingCart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface AddToCartProps {
    initialItems: CartItem[];
    onAddToCart: () => void;
}

export default function AddToCart({ initialItems, onAddToCart }: AddToCartProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
    const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

    const handleAddToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
        setIsCartVisible(true);
        onAddToCart();
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className='relative'>
            <button
                className='fixed top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg'
                onClick={toggleCartVisibility}
            >
                <FaShoppingCart size={24} />
            </button>
            {isCartVisible && (
                <div className='fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto'>
                    <h2 className='text-xl font-bold mb-4'>Giỏ Hàng</h2>
                    {cartItems.map(item => (
                        <div key={item.id} className='flex items-center justify-between mb-4'>
                            <div>
                                <p className='font-bold'>{item.name}</p>
                                <p>{item.id}</p>
                                <p className='text-red-500'>{item.price.toLocaleString()} đ</p>
                            </div>
                            <div className='flex items-center'>
                                <p className='mr-2'>x {item.quantity}</p>
                                <button onClick={() => handleRemoveFromCart(item.id)}>
                                    <FaTrash className='text-gray-500' />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='border-t pt-4'>
                        <p className='font-bold text-lg'>Tổng số phụ: {totalPrice.toLocaleString()} đ</p>
                    </div>
                    <Button className='mt-4 w-full' onClick={() => alert('Xem giỏ hàng')}>
                        Xem giỏ hàng
                    </Button>
                    <Button className='mt-2 w-full bg-red-500 text-white' onClick={() => alert('Thanh toán')}>
                        THANH TOÁN
                    </Button>
                </div>
            )}
        </div>
    );
}