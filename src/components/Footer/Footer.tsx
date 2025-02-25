import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-[#FDF5E6] py-10 text-[#4A3F35]'>
      <div className='max-w-screen-xl mx-auto flex justify-between flex-wrap'>
        {/* Quy định */}
        <div className='w-full sm:w-1/4 px-4 mb-8 sm:mb-0'>
          <h3 className='text-xl font-semibold mb-4 text-[#8B4513]'>QUY ĐỊNH</h3>
          <ul>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Giới thiệu
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Liên hệ
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tết blog
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Chính sách vận chuyển
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Bảo hành sản phẩm
              </a>
            </li>
          </ul>
        </div>

        {/* Dịch vụ quà Tết */}
        <div className='w-full sm:w-1/4 px-4 mb-8 sm:mb-0'>
          <h3 className='text-xl font-semibold mb-4 text-[#8B4513]'>DỊCH VỤ QUÀ TẾT</h3>
          <ul>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tết Hà Nội
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tết Bình Dương
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tết Đồng Nai
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tết Cần Thơ
              </a>
            </li>
          </ul>
        </div>

        {/* Sản phẩm */}
        <div className='w-full sm:w-1/4 px-4 mb-8 sm:mb-0'>
          <h3 className='text-xl font-semibold mb-4 text-[#8B4513]'>SẢN PHẨM</h3>
          <ul>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tết
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Hộp quà tết
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tết công sở
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#8B4513]'>
                Quà tặng sức khoẻ
              </a>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className='w-full sm:w-1/4 px-4 mb-8 sm:mb-0'>
          <h3 className='text-xl font-semibold mb-4 text-[#8B4513]'>LIÊN HỆ</h3>
          <div>
            <p>
              <strong>TP HCM:</strong> 14/14 Đường Bàu Bàng, Quận Tân Bình
            </p>
            <p>
              <strong>Hotline:</strong> <span className='text-xl font-bold text-[#B22222]'>0906 330 360</span>
            </p>
          </div>
          <div className='flex gap-4 mt-4'>
            <img src='facebook-icon.png' alt='Facebook' className='w-8 h-8' />
            <img src='zalo-icon.png' alt='Zalo' className='w-8 h-8' />
            <img src='youtube-icon.png' alt='YouTube' className='w-8 h-8' />
          </div>
        </div>
      </div>

      <div className='text-center mt-8 text-sm'>
        <p>© 2023 HappyBox. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
