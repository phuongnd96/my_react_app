import React, { useState } from 'react';
import '../public/Modal.css'
export const Modal = (props) => {
    let isShow = props.isShow;
    let quitModal = props.quitModal;
    let content = props.content;
    let imgSource = props.imgSource;
    let addToCart = props.addToCartHandler;
    let increaseQuantity = props.increaseQuantityHandler;
    let decreaseQuantity = props.decreaseQuantityHandler;
    let count = props.count;
    let inStock = props.inStock;
    return (
        <div className="modal" style={{
            width: "100%"
            , height: "100%"
            , display: isShow ? "" : "none"
            , position: "fixed"
            , zIndex: "1"
            , left: 0
            , top: 0
            , overflow: "auto"
            , backgroundColor: "rgba(0,0,0,0.4)"
        }}>
            <div style={{
                backgroundColor: "#fefefe"
                , margin: "15% auto"
                , padding: "20px"
                , border: "1px solid #dbdbdb"
                , width: "80%"
            }}>
                <span style={{
                    color: "#aaa"
                    , float: "right"
                    , fontSize: "28px"
                    , fontWeight: "bold"
                    , cursor: "pointer"
                }}
                    onClick={quitModal}>&times;</span>
                <p>{content}</p>
                <p>{inStock == 0 ? <div>Out of Stock</div> : inStock}</p>
                <p>Add To Cart</p>
                <div>
                    <span>Quantity</span>
                    <button onClick={increaseQuantity}>+</button>
                    <button onClick={decreaseQuantity}>-</button>
                    <div>{count}</div>
                </div>

                <button onClick={addToCart} style={{ cursor: "pointer" }}>
                    Add
                    </button>


                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    {imgSource.map((link) => {
                        return (
                            <img style={{
                                width: "200px"
                                , height: "200px"
                            }} src={link} />
                        )
                    })}
                </div>


            </div>
        </div>
    )

}