
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const apiKey = 'k2MyQP4T'; 

  const [ images, setImages ] = useState([]);
  const [ userInput, setUserInput ] = useState("");
  const [ searchTerm, setSearchTerm ] = useState("");

  useEffect(()=>{
    axios({
      url: 'https://www.rijksmuseum.nl/api/en/collection',
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: apiKey,
        imgonly: true,
        q: searchTerm
      }
    }).then((response) => {
      setImages(response.data.artObjects);
    });
  },[searchTerm])

  const handleInput = (event) => {
    setUserInput(event.target.value);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
  }
  return (
    <div className="App">
      <h1>Welcome back to the art Museum</h1>
      <h2> heyo</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor='search'>Search for Art</label>
        <input type="text" id="search" 
        onChange={ handleInput } value={userInput}/>
        <button>Search</button>
      </form>
      {
        images.map((artwork) => {
          
          return (
            <div key={artwork.id}>
              
              <h2>{artwork.longTitle}</h2>
              <img src={artwork.webImage.url} alt={artwork.title}/>
              
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
