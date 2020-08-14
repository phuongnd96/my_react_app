import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import '../public/Card.css';
import '../public/MyWebPage.css';
import 'font-awesome/css/font-awesome.min.css';
import { PaginationBar } from './PaginationBar.js';
import { Modal } from './Modal.js';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Cart } from './Cart.js';
import '../public/MyWebPage.css';
export function MyWebPage(props) {
    // Control searchbox
    function keyUpHandler(e) {
        console.log(input);
        changeProductName(input.trim());
        changeMinPrice("");
        changeMaxPrice("");
        changePage(1)
        console.log(`page: ${page}`);
    }
    let [input, changeInput] = useState("Search here");
    let [toggle, changeToggle] = useState(false)
    let onChange = (e) => {
        changeInput(e.target.value);
    }
    // -------------------//
    const baseUrl = props.baseUrl;
    let [page, changePage] = useState(1);
    let [maxPages, changeMaxPages] = useState(10000);
    let [productName, changeProductName] = useState("");
    let [minPrice, changeMinPrice] = useState("");
    let [maxPrice, changeMaxPrice] = useState("");
    const [limit, changeLimit] = useState(12);
    const [data, changeData] = useState([]);
    let [isShowModal, changeIsShowModal] = useState(false);
    let [modalContent, changeModalContent] = useState("");
    let [detailLink, changeDetailLink] = useState([]);
    let [productTypesList, changeProductTypesList] = useState([]);
    let [productTypeQuery, changeProductTypeQuery] = useState("");
    let [productQuantity, changeProductQuantity] = useState(0);
    let [inStock, changeInStock] = useState(0);
    let flag = false;
    useEffect(() => {
        async function getData() {
            await fetch(`${baseUrl}/product?page=${page}&limit=${limit}&productName=${productName}&minPrice=${minPrice}&maxPrice=${maxPrice}&productType=${productTypeQuery}`).then((res) => {
                res.json().then((resJSON) => {
                    if (resJSON.length > 1) {
                        changeData([resJSON.slice(0, 4), resJSON.slice(4, 8), resJSON.slice(8, 12)]);
                        if (resJSON.length < 12) {
                            changeMaxPages(page);
                        }
                    }
                    else {
                        console.log('bug')
                        changeData([resJSON.slice(0, 4), resJSON.slice(4, 8), resJSON.slice(8, 12)]);
                    }
                })
            })
        }
        try {
            getData()
        } catch (error) {
            console.log(error.message);
        }
    }, [page, productName, minPrice, maxPrice, productTypeQuery]);
    useEffect(async () => {
        try {
            let result = await fetch(`${baseUrl}/productType`);
            result.json().then((resJSON) => {
                changeProductTypesList(productTypesList = resJSON)
            })
        } catch (error) {
            console.log(error.message);
        }
    }, []);
    function clickOnCard(productName, inStock) {
        changeIsShowModal(!isShowModal);
        changeModalContent(productName);
        changeInStock(inStock);
        changeDetailLink([`${baseUrl}/assets/detail?productName=${productName}&id=0`,
        `${baseUrl}/assets/detail/?productName=${productName}&id=1`,
        `${baseUrl}/assets/detail/?productName=${productName}&id=2`]);
    }
    function onChangeHandlerMin(e) {
        console.log(e.target.value);
        changePage(1);
        changeMinPrice(e.target.value);
    }
    function onChangeHandlerMax(e) {
        console.log(e.target.value);
        changePage(1);
        changeMaxPrice(e.target.value);
    }
    function onChangeHandlerType(e) {
        console.log(e.target.value);
        changeProductTypeQuery(productTypeQuery = e.target.value);
    }
    // Cần có 1 api fetch product quantity theo productName
    function addToCartHandler(e) {
        console.log(`${modalContent}: ${productQuantity}`);
        if (!localStorage.getItem('flag')) {
            localStorage.setItem('flag', flag);
            let cart = [
                {
                    productName: modalContent,
                    quantity: productQuantity
                }
            ]
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart = [
                ...cart,
                {
                    productName: modalContent,
                    quantity: productQuantity
                }
            ]
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        // changeFlag(true);
        localStorage.setItem('flag', true);
    }
    function increaseQuantityHandler(e) {
        if (productQuantity < inStock) {
            changeProductQuantity(++productQuantity);
        }
        console.log(productQuantity);
    }
    function decreaseQuantityHandler(e) {
        if (productQuantity > 0) {
            changeProductQuantity(--productQuantity)
        }
        console.log(productQuantity);
    }
    function goToCart() {
        console.log(JSON.parse(localStorage.getItem('cart')));
        console.log(BrowserRouter);
        console.log(Route);
        // return (<Modal isShow={isShowModal} />)
    }
    return (
        <Switch>
            <Route path="/cart" component={Cart}></Route>
            <div id="container">
                <Modal isShow={isShowModal} content={modalContent} quitModal={() => {
                    changeIsShowModal(!isShowModal);
                    changeProductQuantity(0);
                }} imgSource={detailLink} addToCartHandler={addToCartHandler} increaseQuantityHandler={increaseQuantityHandler}
                    decreaseQuantityHandler={decreaseQuantityHandler} count={productQuantity} inStock={inStock} />
                <div style={{
                    display: "flex"
                    , flexDirection: "row-reverse"
                    , padding: "40px 40px 40px 40px"
                    , border: "1px solid #dbdbdb"
                    , position: "relative"
                    , borderRadius: "20px"
                }} id="header">
                    <div id="searchBox">
                        <div>
                            <input style={{ borderRadius: "20px", marginLeft: "100px" }} onKeyUp={keyUpHandler} value={input} onClick={() => {
                                if (!toggle) {
                                    changeInput("");
                                }
                                changeToggle(true)
                            }} onChange={onChange} type="text" ></input>
                        </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                        <span style={{ marginRight: "20px" }}>Max Price</span>
                        <select onChange={onChangeHandlerMax} id="filter">
                            {([7000000, 10000000, 15000000, 20000000, 25000000, 30000000, 35000000]).map((elem) => {
                                return (<option value={elem}>{elem / 1000000} triệu</option>)
                            })}
                            <option selected="selected">Chọn giá lớn nhất</option>
                        </select>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                        <span style={{ marginRight: "20px" }}>Min Price</span>
                        <select onChange={onChangeHandlerMin}>
                            {([5000000, 7000000, 10000000, 15000000, 20000000, 25000000]).map((elem) => {
                                return (<option value={elem}>{elem / 1000000} triệu</option>)
                            })}
                            <option selected="selected">Chọn giá nhỏ nhất</option>
                        </select>
                    </div>
                    {/* Filter by type */}
                    <div style={{ marginLeft: "20px" }}>
                        <span style={{ marginRight: "20px" }}>Loại</span>
                        <select onChange={onChangeHandlerType} id="filter">
                            {
                                productTypesList.map((productType) => {
                                    return (<option value={productType}>{productType}</option>)
                                })
                            }
                            <option selected="selected">Sản phẩm theo Loại</option>
                        </select>
                    </div>
                    {/* <span onClick={goToCart} style={{ cursor: "pointer", paddingRight: "20px" }}>
                        Cart
                </span> */}
                    <Link to="/cart" style={{ paddingRight: "20px" }}>Go To Cart</Link>

                    <span style={{
                        position: "absolute",
                        left: "40px",
                        top: "40px",
                        cursor: "pointer",
                        justifyContent: "flex-end"
                    }} id="back-to-home" onClick={() => {
                        changePage(1);
                        changeMinPrice("");
                        changeMaxPrice("");
                        changeProductName("");
                        changeProductTypeQuery([])
                    }}>
                        HOME
                </span>
                </div>
                <div style={{ padding: "100px 50px 50px 100px" }} id="body">
                    {data.map((row) => {
                        return (
                            <div style={{ paddingTop: "30px", paddingBottom: "30px" }} className="row" >
                                {row.map((rowElement) => {
                                    return (<Card clickHandler={() => {
                                        clickOnCard(rowElement.productName, rowElement.inStock)
                                    }} imgPath={`${baseUrl}${rowElement.link}`} label={rowElement.productName}
                                        price={rowElement.price} discountPercentage="1" rating="4" comments="3" />)
                                })}
                            </div>
                        )
                    })}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} id="footer">
                    <PaginationBar icon="<" clickHandler={() => {
                        if (page > 1) {
                            changePage(--page);
                            // console.log(`page: ${page}`);
                        }
                    }} />
                    <PaginationBar icon=">" clickHandler={() => {
                        if (page < maxPages) {
                            changePage(++page);
                            // console.log(`page: ${page}`);
                        }
                    }} />
                </div>
            </div>
        </Switch>

    )
}