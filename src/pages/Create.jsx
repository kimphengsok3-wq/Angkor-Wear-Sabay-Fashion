import React, { useState } from 'react'

function Create() {

    const [productData, setProductData] = useState({
        name: "",
        shop: "",
        oriPrice: 0,
        disPrice: 0,
        image: ""
    })

    function handleinputChange(e){
        setProductData({...productData, [e.target.name]:e.target.value})
    }

    async function handleCreateProduct(e) {
        e.preventDefault()
        const res = await fetch("http://localhost:8000/products",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: productData.name,
                shop: productData.shop,
                oriPrice: Number(productData.oriPrice),
                disPrice: Number(productData.disPrice),
                image: productData.image
            })
        })
        const data = await res.json()
    }

    return (
        <div>
            <form action="" className='w-96 border border-gray-300 m-auto my-10 p-5 rounded-xl'>
                <div className='text-2xl font-semibold'>Create New Product</div>
                <div className='flex flex-col gap-4 mt-5'>
                    <div >
                        <label htmlFor="name">Name</label><br />
                        <input onChange={handleinputChange} className='border border-gray-300 p-1 w-full rounded-md focus:outline-blue-800' type="text" id='name' name='name' placeholder='Enter product name' />
                    </div>
                    <div >
                        <label htmlFor="shop">Shop</label><br />
                        <input onChange={handleinputChange} className='border border-gray-300 p-1 w-full rounded-md focus:outline-blue-800' type="text" id='shop' name='shop' placeholder='Enter product shop' />
                    </div>
                    <div>
                        <label htmlFor="oriPrice">Original Price</label><br />
                        <input onChange={handleinputChange} className='border border-gray-300 p-1 w-full rounded-md focus:outline-blue-800' type="number" id='oriPrice' name='oriPrice' placeholder='Enter product original price' />
                    </div>
                    <div>
                        <label htmlFor="disPrice">Discount Price</label><br />
                        <input onChange={handleinputChange} className='border border-gray-300 p-1 w-full rounded-md focus:outline-blue-800' type="number" id='disPrice' name='disPrice' placeholder='Enter product discount price' />
                    </div>
                    <div>
                        <label htmlFor="image">Image</label><br />
                        <input onChange={handleinputChange} className='border border-gray-300 p-1 w-full rounded-md focus:outline-blue-800' type="text" id='image' name='image' placeholder='Enter product Image' />
                    </div>
                    
                    <button onClick={handleCreateProduct} className='bg-blue-400 p-2 rounded-lg mt-4 text-white font-bold'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default Create