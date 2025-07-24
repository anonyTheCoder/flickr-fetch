import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, API_BASE_URL } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
      fetchCartCount();
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  }, [isAuthenticated]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/v3/user/cart/list`);
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v3/user/cart/item/count`);
      setCartCount(response.data.count || 0);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v3/product/add/cart/${productId}`, {
        quantity
      });
      
      await fetchCartItems();
      await fetchCartCount();
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const updateCartItem = async (productId, increment = null, decrement = null) => {
    try {
      const requestBody = {};
      if (increment) requestBody.inc = increment;
      if (decrement) requestBody.dec = decrement;

      const response = await axios.post(`${API_BASE_URL}/v3/user/cart/${productId}/update`, requestBody);
      
      await fetchCartItems();
      await fetchCartCount();
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to update cart item:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update cart item' 
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v3/product/delete/cart/${productId}`);
      
      await fetchCartItems();
      await fetchCartCount();
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to remove from cart' 
      };
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/v3/user/cart/flush`);
      
      setCartItems([]);
      setCartCount(0);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to clear cart' 
      };
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const value = {
    cartItems,
    cartCount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    fetchCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};