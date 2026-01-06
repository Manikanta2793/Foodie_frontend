import React, { useState, useEffect } from 'react'
import { API_URL } from '../data/apiPath'
import './AllProducts.css'

const AllProducts = () => {
    const [products, setProducts] = useState([])

    const productsHandler = async () => {
        try {
            const firmId = localStorage.getItem('firmId')
            const response = await fetch(`${API_URL}/product/all-products/${firmId}`)
            const newProductsData = await response.json()
            setProducts(newProductsData.products)
            console.log(newProductsData)
        } catch (error) {
            alert('Failed to fetch products')
            console.error(error)
        }
    }

    useEffect(() => {
        productsHandler()
    }, [])
    const deleteProductById = async(productId)=>{
        try{
            const response = await fetch(`${API_URL}/product/${productId}`,{
                method:'DELETE'
            })
            const data = await response.json();
            if(response.ok){
                setProducts(products.filter((product)=>product._id !== productId))
                alert('Product deleted successfully')
               
            }
        }catch(error){
            alert('Failed to delete product')
            console.error(error)
        }
    }

    return (
        <div className="products-section">
            {!products? (
                <p className="no-products-message">NO PRODUCTS FOUND</p>
            ) : (
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="product-name">{product.productName}</td>
                                <td className="product-price">{product.price}</td>
                                <td className="product-image">
                                    {product.image && (
                                        <img
                                            className="product-thumb"
                                            src={`${API_URL}/uploads/${product.image}`}
                                            alt={product.productName}
                                        />
                                    )}
                                </td>
                                <td className="product-actions">
                                    <button className="delete-btn" onClick={() => deleteProductById(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AllProducts