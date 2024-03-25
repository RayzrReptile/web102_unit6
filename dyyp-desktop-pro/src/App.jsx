import { useState, useEffect } from 'react'
import CoinInfo from './components/CoinInfo';
import './App.css'

function App() {
  // State Variables
  let [cryptoList, setCryptoList] = useState(null);
  let [searchResults, setSearchResults] = useState([]);
  let [searchInput, setSearchInput] = useState("");

  // Use Effect for Querying Data
  useEffect(() => {
    const fetchAllCoinData = () => {
      fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${import.meta.env.VITE_APP_ACCESS_KEY}`)
      .then(response => response.json())
      .then(data => setCryptoList(data))
      .catch(err => console.log("There was an error: " + toString(err)))
    }

    fetchAllCoinData();
  }, []);

  // Search Function
  const searchItems = (searchQuery) => {
    setSearchInput(searchQuery);
    if (searchQuery !== "") {
      const filteredData = Object.keys(cryptoList.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredData);
    }
    else {
      console.log("All coins");
      setSearchResults([]);
    }
  };

  // Main Return Output
  return (
    <>
      <div className="App">
        <section className="header-section">
          <div className="header-title-wrapper">
            <img draggable="false" src="DYYPLogoV6.png" alt="DYYP Logo" className="header-logo" />
            <h3 className="subtitle">desktop</h3>
          </div>
          <div className="header-search-wrapper">
            <input 
              type="text" 
              className="searchbar"
               placeholder='SEARCH...'
               onChange={(inputString) => searchItems(inputString.target.value)}
            />
          </div>
        </section>
        <section className="main-section">
            {searchInput.length == 0 ? (
              <div className="crypto-list-container">
                <div className="found-results">
                <h3>Showing all coins</h3>
                </div>
                <hr />
                <ul className="crypto-list">
                  {cryptoList && Object.entries(cryptoList.Data).map(([coin]) => 
                    cryptoList.Data[coin].PlatformType=="blockchain" ? (
                      <CoinInfo
                        image={cryptoList.Data[coin].ImageUrl}
                        name={cryptoList.Data[coin].FullName}
                        symbol={cryptoList.Data[coin].Symbol}
                      />
                    ) : null
                  )}
                </ul>
              </div>
            ) : (
              <div>
                {searchResults.length > 0 ? (
                  <div className="crypto-list-container">
                    <div className="found-results">
                      {searchResults.length==1 ? (
                        <h3>Showing 1 result found for "{searchInput}"</h3>
                      ) : (
                        <h3>Showing {searchResults.length} results found for "{searchInput}"</h3>
                      )}
                    </div>
                    <hr />
                    <ul className="crypto-list">
                      {searchResults && searchResults.map((coin) => 
                        cryptoList.Data[coin].PlatformType=="blockchain" ? (
                          <CoinInfo
                            image={cryptoList.Data[coin].ImageUrl}
                            name={cryptoList.Data[coin].FullName}
                            symbol={cryptoList.Data[coin].Symbol}
                          />
                        ) : null
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="no-results">
                    <h3>No results found for "{searchInput}"</h3>
                  </div>
                )}
              </div>
            )}
        </section>
      </div>
    </>
  )
}

export default App
