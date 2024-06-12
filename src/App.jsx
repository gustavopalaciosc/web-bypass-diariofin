import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';


function App() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState([]);
  

  const fetchArticle = async () => {
      

    try {
      const url = 'http://127.0.0.1:8000/article/?url=https://www.df.cl/economia-y-politica/macro/las-senales-economicas-en-mayo-se-modera-el-interes-por-el-consumo';
      const response = await axios.get(url);
      //console.log(response.data['title']);
      //console.log(response.data['subtitle']);
      //console.log(response.data['body']);

      setTitle(response.data['title']);
      setSubtitle(response.data['subtitle']);
      setBody(response.data['body']);

     

    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {

    fetchArticle();
  }, []);



  return (
    <div className='main-content'>
      <div className='title-container'>
        <h1>{title}</h1>
      </div>
      <div className='subtitle-container'>
        <h2>{subtitle}</h2>
      </div>

      <div className='body-container'>
        {body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>

  )
}

export default App
