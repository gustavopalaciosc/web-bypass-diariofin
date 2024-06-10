import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';


function App() {
  
  useEffect(() => {
    const fetchArticle = async () => {

      try {
        const url = 'http://127.0.0.1:8000/article/?url=https://www.df.cl/economia-y-politica/macro/las-senales-economicas-en-mayo-se-modera-el-interes-por-el-consumo';
        const response = await axios.get(url);
        console.log(response.data['title']);
        console.log(response.data['subtitle']);
        console.log(response.data['body']);

      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, []);

  return (
    <div className='main-content'>
      <h1>Hola mundo</h1>

    </div>

  )
}

export default App
