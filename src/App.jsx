import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchArticle = async (articleUrl) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/article/?url=${articleUrl}`);
      setTitle(response.data['title']);
      setSubtitle(response.data['subtitle']);
      setBody(response.data['body']);
    } catch (error) {
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
        <h1 className='page-title-h1'>Diario Financiero</h1>
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
              <button type="submit">Cargar Artículo</button>
            </div>
          </div>
        </form>
      </div>

      {loading ? (
        <p>Cargando...</p>
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