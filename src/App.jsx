import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './components/Button/Button';
import './App.css';
import LoadingWidget from './components/LoadingWidget/LoadingWidget';

function App() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchArticle = async (articleUrl) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://backend-web-diariofin.onrender.com/article/?url=${articleUrl}`);
      if (response.data['status_code'] == 200 ) {
      setTitle(response.data['title']);
      setSubtitle(response.data['subtitle']);
      setBody(response.data['body']);
      } else {
        console.log(response.data['status_code']);
        console.log(response.data['message']);
      }
    } catch (error) {
      console.log("Request error");
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchArticle(url);
  };

  return (
    <div className='main-content'>
      <div className='page-title-container'>
        <h1 className='page-title-h1'><span className='title-highlight'>Diario</span> Financiero</h1>
      </div>
      <div className='instructions-container'>
        <h2>Busca artículos bloqueados en el <a className='instructions-link' href="https://www.df.cl/" target='_blank'><span className='title-highlight'>Diario</span> Financiero</a> y leelos de manera gratuita.</h2>
        
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className='form-items'>
            <div className='input-container'>
              <input
                className='form-article-input'
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Ingrese la URL del artículo DF"
              />
            </div>
            <div className='form-button-container'>
              <Button text="Cargar artículo"/>
            </div>
          </div>
        </form>
      </div>

      {loading ? (
        <>
          <div className='loading-container'>
            <LoadingWidget />
          </div>
        </>
      ) : (
        <>
          <div className='title-container'>
            <h1 className='article-title-h1'>{title}</h1>
          </div>
          <div className='subtitle-container'>
            <h2 className='article-subtitle-h2'>{subtitle}</h2>
          </div>
          <hr />
          <div className='body-container'>
            {body.map((paragraph, index) => (
              <p className='article-paragraph' key={index}>{paragraph}</p>
            ))}
          </div>
        </>
      )}
      
    </div>
  );
}

export default App;
