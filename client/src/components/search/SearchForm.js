import React, {useState} from 'react';
import axios from 'axios';
import queryString from 'querystring'

const SearchForm = (props) => {
  let [loaded, setLoaded] = useState(false);

  if(!loaded){
    setLoaded(true);
    axios.get('/apis/cities/city.php?filter=&limit=50')
    .then(
        (res) => {
            if(res.data.error){
                alert('error');
            } else {
                props.setCities(res.data)
            }
        }
    )
  }

  const onSubmit = (evt) => {
    let form = document.getElementById('formCitySearch');
    if(evt) evt.preventDefault();


    const params = {
      limit: 50,
      filter: form.filter.value,
    };

    let keys = Object.keys(params);
    for(let i = 0; i < keys.length; i++){
      if(!params[keys[i]]&&i!=1){
        alert("All fields are required.");
        return;
      }
    }

    axios.get('/apis/cities/city.php?' + queryString.encode(params)).then(
      (res) => {
        if(res.data.error){
          alert(res.data.error);
        } else {
          console.log(res.data);
          props.setCities(res.data);
        }
      }
    ).catch((err) => {
      if(err) console.log(err);
    })
  } 


  /*          
<div className="col col-12 col-sm-3">
  <label htmlFor="limit">Limit:</label>
</div> 
  <div className="col col-12 col-sm-9">
    <select id="limit" name="limit" className="form-control" placeholder="Spokane">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="25">25</option>
      <option value="30">30</option>
      <option value="35">35</option>
      <option value="40">40</option>
      <option value="45">45</option>
      <option value="50">50</option>
    </select>
  </div>
  */
  return (
    <div>
      <form id="formCitySearch" onSubmit={onSubmit}>
        <div className="row form-group">
          <div className="col col-12 col-sm-2">
            <label htmlFor="filter">City name:</label>
          </div>
          <div className="col col-12 col-sm-8">
            <input id="filter" name="filter" type="text" className="form-control" placeholder="Spokane"></input>
          </div>
          <div>
            <button className="btn btn-primary" onClick={onSubmit}>Search</button>
          </div>
        </div>
      </form>
    </div>
  );

}

export default SearchForm;
