import React from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h3 className='text-xl font-bold mb-4'>{message}</h3>
        <div className='flex justify-end gap-4'>
          <button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={onCancel}>
            Hủy
          </button>
          <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={onConfirm}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
