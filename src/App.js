import {useState, useEffect} from 'react'
import axios from 'axios'
import qs from'querystring'

const App = () => {
  const [full, setFull] = useState('');
  const [arrayData, setArrayData] = useState([]);


  const url = 'http://localhost:5000/'

  const data = {
    full: full
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const handleChange = (e) =>{
    setFull(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(full)
    axios.post(url,qs.stringify(data), config)
      .then(res => {
        // console.log(res.data)
      })
  }

  useEffect(()=> {
    const fetchData = async () =>{
      const result = await axios.get(url);
      setArrayData(result.data);
      console.log(arrayData.urls)
    }
    fetchData();
  }, [] )

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <label className="input-label">
          Long URL
          <input type="text" name="url" onChange={handleChange}/>
        </label>
        <button type="submit">Shorten</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Long Url</th>
            <th>Short Url</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {/* {final.map(this.renderWebsite)} */}
        </tbody>
      </table>
    </div>
  );
}


const renderWebsite = (entry, index) => {
return (
<tr key={index}>
<td>{entry.full}</td>
<td>{entry.short}</td>
<td>{entry.clicks}</td>
</tr>
)
}

export default App;
