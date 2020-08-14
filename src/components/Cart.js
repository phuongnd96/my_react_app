import React, { useState } from 'react';
import '../public/Cart.css'
require('dotenv').config();
export const Cart = () => {
    let products = JSON.parse(localStorage.getItem('cart'));
    async function submitHandler(e) {
        e.preventDefault();
        let data = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            products: products
        };
        let response = await fetch(`${process.env.REACT_APP_BASE_URL_DEV}/payment`, {
            method: 'POST'
            , mode: 'cors'
            , headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify(data)
        });
        if (response.status === 200) {
            alert('Success');
            localStorage.clear('cart');
            localStorage.clear('flag');
        }
        else {
            alert('Fill all required fields');
        }
    }
    let [name, changeName] = useState("");
    let [phone, changePhone] = useState("");
    let [email, changeEmail] = useState("");
    let [address, changeAdress] = useState("");
    const changeNameHandler = (e) => {
        changeName(e.target.value);
    }
    const changePhoneHandler = (e) => {
        changePhone(e.target.value);
    }
    const changeEmailHandler = (e) => {
        changeEmail(e.target.value);
    }
    const changeAddressHandler = (e) => {
        changeAdress(e.target.value);
    }
    return (
        <div>
            <div id='submit-form' style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "100px" }}>
                <div>
                    Cart
            </div>
                <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column" }}>
                    <div className="input-wrapper">
                        <input onChange={changeNameHandler} value={name} placeholder="name"></input>
                        <div className='error'></div>
                    </div>
                    <div className="input-wrapper">
                        <input onChange={changePhoneHandler} value={phone} placeholder="phone"></input>
                        <div className='error'></div>
                    </div>
                    <div className="input-wrapper">
                        <input onChange={changeEmailHandler} value={email} placeholder="email"></input>
                        <div className='error'></div>
                    </div>
                    <div className="input-wrapper">
                        <input onChange={changeAddressHandler} value={address} placeholder="address"></input>
                        <div className='error'></div>
                    </div>
                    <div className="input-wrapper">
                        {
                            products != null ?
                                products.map((product) => {
                                    return (
                                        <div>
                                            <div style={{ fontWeight: "bold" }}>{product.productName}</div>
                                            <div>{product.quantity}</div>
                                        </div>
                                    )
                                })
                                : (<div></div>)}
                    </div>
                    <button id='submit-btn'>Submit</button>
                </form>
            </div>
        </div>

    )
}

