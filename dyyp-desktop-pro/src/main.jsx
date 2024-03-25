import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import Layout from './routes/Layout.jsx';
import DetailView from './routes/DetailView.jsx';
import NotFound from './routes/NotFound.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false} path='/coinDetails/:symbol' element={<DetailView />}/>
          <Route path="*" element={<NotFound /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
