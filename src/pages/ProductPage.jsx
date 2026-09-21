import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { NavLink } from 'react-router-dom'

function ProductPage() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getAllProducts(){
    setIsLoading(true)
    try{
      const res = await fetch("http://localhost:8000/products")
      const data = await res.json()

      setProducts(data)
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false)
    }
    
  }

  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-10'>
        
        {
          products.map(pro=>{
            return <NavLink key={pro.id} to={`/product/${pro.id}`}>
              <ProductCard
                image={pro.image}
                shop={pro.shop}
                name={pro.name}
                oriPrice={pro.oriPrice}
                disPrice={pro.disPrice}
              />
            </NavLink>
          })
        }

      </div>
    </div>
  )
}

export default ProductPage