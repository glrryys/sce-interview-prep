import {useState} from 'react';

function SCE() {

  // define my variables
  const[ISBN, setISBN] = useState(''); // text
  const[url, setUrl] = useState(''); // text
  const[authors, setAuthors] = useState(''); // text
  const[title, setTitle] = useState(''); // text
  const[cover, setCover] = useState(''); // link (it's just one)

  const [data, setData] = useState({}); // managing groups of data



  const submitForm = async () => {
    const res = await fetch (`https://sce.sjsu.edu/isbn/${ISBN}`); //ISBN (a variable) will be searched by the api
    const resData = await res.json(); // variable called resData, it's wtv comes from api   // this is also PARSING json
    // res.json turns it into readable data for javascript
    // await means waiting until the action is done before doing something else

    
    
    // its hidning the info in one big box instead of giving it all staight up 
    // so u have to find ISBN and then also dig into isbn

    
    const ISBNinfo = `ISBN:${ISBN}`; // locating what the number the 
    // user typed in and holds later for data finding
    const locateINFO = resData[ISBNinfo]; // locating if they can match
    // the number the user inserted and then displaying the data 

// without ^ it was empty info 

    setData({
      title: locateINFO.title,
      authors: locateINFO.authors.map( author  => author.name),  // shows the arrays (collection) of names of authors
      // .name finds anything with name but since it's on the locateINFO.authors, it finds it within that
      url: locateINFO.url,
      cover: locateINFO.cover.large
    });

  
// ^ setting data from API - .data comes from the set Data 
// and .blah comes from the API 

  };

  return (
    <div> 
       {/* INPUT FIELD FOR ISBN */}
       {/* rendering an input & button in react */}
    
        <label htmlFor="ISBN">ISBN:</label>
      <input 
      type='text'
      value={ISBN}
      onChange={e => setISBN(e.target.value)}
      />
      
      {/* SUBMIT BUTTON */}
    
      <button onClick ={submitForm}>Submit</button>

      {/* RENDER = DISPLAY  */}
       <h1>{data.title}</h1> 
        <h2>{data.authors} </h2>
        <h2>{data.url}</h2> 
        <img src={data.cover} alt="Cover" />
    </div> 

  ); 
}

export default SCE; 
