import React from 'react'

function ProductCard({image, shop, name, oriPrice, disPrice}) {
  return (
    <div>
        
        <div className='relative'>
            <img src={image} alt="" />
            <div className='absolute bottom-0 text-white bg-red-500 px-3 py-1 '>-10%</div>
        </div>
        <div className='font-semibold mt-2 px-1'>
            <div className='flex justify-between'>
                <div>{shop}</div>
                <div>❤️</div>
            </div>
            <p>{name}</p>
            <p className='text-red-500'>${disPrice} <span className='text-gray-600 line-through'>${oriPrice}</span></p>
        </div>   
    </div>
  )
}

export default ProductCard