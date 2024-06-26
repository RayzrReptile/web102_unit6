import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "./CoinChart";
import Loading from "./Loading";
import Error from "./Error";

const CoinDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    
    useEffect(() => {
        const getCoinDetail = async () => {
            const queryDetail = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${import.meta.env.VITE_APP_API_KEY}`;
            const queryDescription = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${import.meta.env.VITE_APP_API_KEY}`;
            const details = await fetch(queryDetail);
            const description = await fetch(queryDescription);
    
            const detailsJSON = await details.json();
            const descriptionJSON = await description.json();
    
            setFullDetails({"numbers": detailsJSON.DISPLAY, "textData": descriptionJSON.Data})
        };
    
        getCoinDetail().catch(console.error);
    }, [params.symbol])
    
    return (
        <>
            {(fullDetails &&  fullDetails.textData) ? (
                <>
                    {fullDetails.textData[params.symbol] ? (
                        <div className="details-container">
                            <div className="details-top">
                                <div className="details-header">
                                    <h3 className="details-name">{fullDetails.textData[params.symbol].FullName}</h3>
                                    <p className="details-description">{fullDetails.textData[params.symbol].Description}</p>
                                    <p className="details-algorithm">This coin was made using the {fullDetails.textData[params.symbol].Algorithm} algorithm.</p>
                                </div>
                                <div className="details-img-container">
                                    <img src={`https://www.cryptocompare.com`+fullDetails.textData[params.symbol].ImageUrl} alt={fullDetails.textData[params.symbol].FullName} className="details-image" draggable='false' />
                                </div>
                            </div>
                            <div className="details-bottom">
                                <div className="table-wrapper">
                                    <table className="details-table">
                                        <tbody> 
                                            <tr>
                                            <th>Launch Date </th>
                                            <td>{fullDetails.textData[params.symbol].AssetLaunchDate}</td>
                                            </tr>
                                            <tr>
                                            <th>Website </th>
                                            <td>
                                                <a href={fullDetails.textData[params.symbol].AssetWebsiteUrl} target="_blank">{fullDetails.textData[params.symbol].AssetWebsiteUrl}</a>
                                            </td>
                                            </tr>
                                            <tr>
                                            <th>Whitepaper </th>
                                            <td>
                                                <a href={fullDetails.textData[params.symbol].AssetWhitepaperUrl}target="_blank">{fullDetails.textData[params.symbol].AssetWhitepaperUrl}</a>
                                            </td>
                                            </tr>
                                            <tr>
                                            <th>Monetary Symbol </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.FROMSYMBOL}</td>
                                            </tr>
                                            <tr>
                                            <th>Market </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.MARKET}</td>
                                            </tr>
                                            <tr>
                                            <th>Last Transaction </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.LASTUPDATE}</td>
                                            </tr>
                                            <tr>
                                            <th>Last Transaction Value</th>
                                            <td>{fullDetails.numbers[params.symbol].USD.PRICE}</td>
                                            </tr>
                                            <tr>
                                            <th>Volume </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.LASTVOLUMETO}</td>
                                            </tr>
                                            <tr>
                                            <th>Today's Open Price </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.OPENDAY}</td>
                                            </tr>
                                            <tr>
                                            <th>Highest Price during the Day </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.HIGHDAY}</td>
                                            </tr>
                                            <tr>
                                            <th>Lowest Price during the Day </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.LOWDAY}</td>
                                            </tr>
                                            <tr>
                                            <th>Change from Previous Day </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.CHANGEDAY}</td>
                                            </tr>
                                            <tr>
                                            <th>Market Cap </th>
                                            <td>{fullDetails.numbers[params.symbol].USD.MKTCAP}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <CoinChart
                                    symbol={params.symbol}
                                    market={fullDetails.numbers[params.symbol].USD.MARKET}
                                />
                            </div>
                        </div>
                    ) : <Error></Error>}
                </>
            ) : (
                <Loading></Loading>
            )}
        </>
    )
};

export default CoinDetail;