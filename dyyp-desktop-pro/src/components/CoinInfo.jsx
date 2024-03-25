import { useState, useEffect } from "react";

const CoinInfo = ({image, name, symbol}) => {
    // Variables
    let [price, setPrice] = useState(null)

    useEffect(() => {
        const getCoinPrice = () => {
            let query = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${import.meta.env.VITE_APP_ACCESS_KEY}`;
            fetch(query)
            .then(response => response.json())
            .then(data => setPrice(data))
            .catch(() => {
                console.error;
                console.log("Set price to null")
                setPrice(null);
            })
        }

        getCoinPrice();
    }, [symbol]);

    return <div className="coin-info-container">
        {price ? (
            <li className="coin-info-item" key={symbol}>
                <div className="image-wrapper">
                    <img 
                    draggable="false"
                    src={`https://www.cryptocompare.com${image}`} 
                    alt={name} 
                    className="coin-image" />
                </div>
                <div className="info-wrapper">
                    <h2 className="coin-name">{name}</h2>
                    <h4 className="coin-symbol">{symbol}</h4>
                    <div>
                        {price.USD != null && price.USD != "" ? (
                            <h2 className="coin-price">${price.USD} USD</h2>
                    ) : <h2 className="coin-price">Price Unlisted</h2>}
                    </div>
                </div>
            </li>
        ) : null}
    </div>
};

export default CoinInfo;