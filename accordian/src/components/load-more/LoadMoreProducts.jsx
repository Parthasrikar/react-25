/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function LoadMoreProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setcount] = useState(0);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [addedToCart, setAddedToCart] = useState({}); // State to track added products

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const data = await response.json();

      if (data.products.length > 0 && data.products) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // This ensures no unnecessary re-renders
    }
  }

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) setDisabled(true);
  }, [products]);

  const handleAddToCart = (id, price) => {
    alert(`added product of price $${price}`);
    setAddedToCart((prevAdded) => ({
      ...prevAdded,
      [id]: true, // Mark product as added
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error != null) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen min-w-[100%] bg-slate-800 p-10">
      <h1 className="text-center text-slate-200 p-7 mb-7 text-5xl">SHOPIFY</h1>
      <div>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg : grid lg:grid-cols-3 lg:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="h-auto bg-slate-200 flex flex-col p-5 rounded items-center justify-center relative"
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {" "}
                  <FaStar className="text-yellow-300" size={20}></FaStar>{" "}
                  {product.rating}{" "}
                </div>
                <img
                  className="h-60 object-cover"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <h3>{product.title}</h3>
                <div className="flex gap-10 mt-3 items-center">
                  <p>Price: ${product.price}</p>
                  <button
                    className={`px-3 py-2 rounded-md text-slate-200 ${
                      addedToCart[product.id]
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-slate-800"
                    }`}
                    onClick={() =>
                      !addedToCart[product.id] &&
                      handleAddToCart(product.id, product.price)
                    }
                    disabled={addedToCart[product.id]}
                  >
                    {addedToCart[product.id] ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center gap-5 justify-center mt-5">
        <button
          disabled={disabled}
          className="px-3 py-2 bg-slate-200 text-slate-800 rounded text-bold"
          onClick={() => setcount(count + 1)}
        >
          Load more...
        </button>
        {disabled ? <p className="text-slate-200 text-lg">reached 100 products</p> : null}
      </div>
    </div>
  );
}

export { LoadMoreProducts };


// import React, { useEffect, useState, useRef } from "react";
// import { FaStar } from "react-icons/fa";

// // Memoized ProductCard to avoid re-rendering when props haven't changed
// const ProductCard = React.memo(({ product, isAdded, onAddToCart }) => (
//   <div className="h-auto bg-slate-200 flex flex-col p-5 rounded items-center justify-center relative">
//     <div className="absolute top-3 right-3 flex items-center gap-1.5">
//       <FaStar className="text-yellow-300" size={20} /> {product.rating}
//     </div>
//     <img className="h-60 object-cover" src={product.thumbnail} alt={product.title} />
//     <h3>{product.title}</h3>
//     <div className="flex gap-10 mt-3 items-center">
//       <p>Price: ${product.price}</p>
//       <button
//         className={`px-3 py-2 rounded-md text-slate-200 ${
//           isAdded ? "bg-green-500 cursor-not-allowed" : "bg-slate-800"
//         }`}
//         onClick={() => !isAdded && onAddToCart(product.id, product.price)}
//         disabled={isAdded}
//       >
//         {isAdded ? "Added" : "Add to Cart"}
//       </button>
//     </div>
//   </div>
// ));

// function LoadMoreProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [count, setCount] = useState(0);
//   const [error, setError] = useState(null);
//   const [disabled, setDisabled] = useState(false);
//   const [addedToCart, setAddedToCart] = useState({});

//   // Function to handle adding products to cart
//   const addToCart = (id, price) => {
//     alert(`Added product of price $${price}`);
//     setAddedToCart((prevAdded) => ({
//       ...prevAdded,
//       [id]: true, // Mark product as added
//     }));
//   };

//   async function fetchProducts() {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://dummyjson.com/products?limit=20&skip=${count * 20}`
//       );
//       const data = await response.json();

//       if (data.products.length > 0) {
//         setProducts((prevProducts) => [...prevProducts, ...data.products]);
//       }
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false); // Ensure no unnecessary re-renders
//     }
//   }

//   useEffect(() => {
//     fetchProducts();
//   }, [count]);

//   useEffect(() => {
//     if (products.length >= 100) setDisabled(true);
//   }, [products]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="min-h-screen min-w-[100%] bg-slate-800 p-10">
//       <h1 className="text-center text-slate-200 p-7 mb-7 text-5xl">SHOPIFY</h1>
//       <div>
//         {products.length > 0 ? (
//           <div className="grid grid-cols-3 gap-6">
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 isAdded={addedToCart[product.id]}
//                 onAddToCart={addToCart}
//               />
//             ))}
//           </div>
//         ) : null}
//       </div>
//       <div className="flex justify-center mt-5">
//         <button
//           disabled={disabled}
//           className="px-3 py-2 bg-slate-200 text-slate-800 rounded"
//           onClick={() => setCount((prevCount) => prevCount + 1)}
//         >
//           Load more..
//         </button>
//       </div>
//     </div>
//   );
// }

// export { LoadMoreProducts };
