import { useEffect, useState } from "react";
import "./App.css";

const URL = "http://localhost:3005/api/product/";
function App() {
    const [products, setProduct] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState({});

    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        getItems();
    }, []);

    const handlePostItem = (event) => {
        event.preventDefault();

        if (name && imageURL && description && price) {
            postItem({
                name: name,
                imageURL: imageURL,
                description: description,
                price: price,
            }).then(res => {
                getItems();
            })
        }
    };

    const handlePutItem = (event) => {
        event.preventDefault();

        if (name && imageURL && description && price && selectedProduct) {
            const item = {
                name: name,
                imageURL: imageURL,
                description: description,
                price: price,
            };

            putItem(item, selectedProduct._id).then(res => {
                getItems();
            })
        }
        
    };

    const handleRemoveItem = (id) => {
        deleteItem(id).then(res => {
            getItems();
        })
    }

    function getItems () {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProduct(data);
            });
    }

    function postItem(item) {
        const validProduct = {
            product: item,
        };

        return fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validProduct),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(console.log);
    }

    function deleteItem(id) {
        const validProduct = {
            id: id,
        };

        return fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validProduct),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(console.log);
    }

    function putItem(item, id) {
        console.log(item);
        const validProduct = {
            product: item,
            id: id,
        };
        
        return fetch(URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validProduct),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(console.log);
    }

    return (
        <>
            <form onSubmit={handlePostItem}>
                <input
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <input
                    placeholder="image url"
                    onChange={(e) => setImageURL(e.target.value)}
                ></input>
                <input
                    placeholder="description"
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
                <input
                    placeholder="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                ></input>
                <button type="submit">add</button>
                <button onClick={handlePutItem}>update selected</button>
            </form>
            <div className="cards">
                {products.map((product) => {
                    return (
                        <div key={JSON.stringify(product)} onClick={() => setSelectedProduct(product)} className={`card ${product._id !== selectedProduct._id || "card_selected"} `}>
                            <img
                                src={product.imageURL}
                                className="card-img"
                            ></img>
                            <div className="card-name">name: {product.name}</div>
                            <div className="card-price">price: {product.price}</div>

                            <button onClick={() => handleRemoveItem(product._id)}>Remove</button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default App;
