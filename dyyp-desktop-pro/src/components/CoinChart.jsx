import React, { Component, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    ResponsiveContainer
} from "recharts";

const CoinChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);

    useEffect(() => {
        const fetchHist = async () => {
            const query  = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=`+import.meta.env.VITE_APP_API_KEY;
            const response = await fetch(query);
            const json = await response.json();
            setHistData(json.Data.Data);
        };

        fetchHist().catch(console.error);
    }, [symbol, market])

    const cleanData = (data) => {
        let filteredData = [];
        let countDays = 0;
        for (const item of data) {
            let accurateTime = new Date(item.time).toLocaleTimeString("en-US");
            let accurateDay = new Date();
            accurateDay.setDate(accurateDay.getDate()- countDays);
        
            filteredData.push({
            'time': accurateDay.toLocaleDateString("en-US") + " " + accurateTime,
            'open price': item.open,
            });
            countDays ++;
        }
        
        // data is given counting backwards, so return the reverse to have data ordered from oldest to newest for accurate plotting
        return filteredData.reverse();    
    };

      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div className="chart-container">
                <br></br>
                <div className="chart-title">
                    <h2>30-Day Price Data for {symbol}</h2>
                </div>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={1000}
                            height={400}
                            data={cleanData(histData)}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 30,
                            }}
                            >
                            <Line
                                type="monotone"
                                dataKey="open price"
                                stroke="#5DAB50"
                                activeDot={{ r: 5 }}
                            />
                            <CartesianGrid strokeDasharray="5 5" />
                            <XAxis dataKey="time" interval={2} angle={20} dx={20} dy={-5}>
                                <Label value="Date and Time" offset={0} position="insideBottom" dy={30}/>
                            </XAxis>
                        
                            <YAxis
                                label={{
                                value: "Price",
                                angle: -90,
                                dx: -15,
                                position: "insideLeft",
                                textAnchor: "middle",
                                }}
                            />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>  
            </div>
          ) : null}
        </div>
      );
    
  };

export default CoinChart;