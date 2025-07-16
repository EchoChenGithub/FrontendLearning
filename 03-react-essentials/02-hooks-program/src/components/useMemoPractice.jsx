import React, {useMemo, useState} from 'react';

function ProductDisplay({ product }) {
    // 假设这里有一些复杂的计算，根据 product 的价格计算税后总价
    const calculateTotalPrice = (price, taxRate) => {
        console.log('Calculating total price...'); // 打印这行是为了观察它何时执行
        return price * (1 + taxRate);
    };
    const taxRate = 0.15; // 15% 税率
    const totalPrice = useMemo(() => calculateTotalPrice(product.price, taxRate), [product.price, taxRate]); // 15% 税率

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Tax: 15%</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
    );
}

function ShoppingCart() {
    const [quantity, setQuantity] = useState(1);
    const product = useMemo(() => {return {name: "Laptop", price: 1000}}, []);


    return (
        <div>
            <h1>Shopping Cart</h1>
            {/*这里传递了 product, 而且 product 被 useMemo 包裹，引用也是稳定的，不会引起ProductDisplay的重新渲染*/}
            <ProductDisplay product={product} />
            <hr />
            <p>Quantity: {quantity}</p>
            <button onClick={() => setQuantity(q => q + 1)}>Increase Quantity</button>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>Decrease Quantity</button>
        </div>
    );
}

export default function useMemoPractice() {
    return (
        <div>
            <h2>Example 1/4: Shopping Cart</h2>
            <ShoppingCart />
        </div>
    );
}