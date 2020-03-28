import React from 'react';
import axios from 'axios';
import queryString from 'querystring'

const SearchForm = (props) => {

  let form = document.getElementById('formCitySearch');

  const onSubmit = () => {

    const params = {
      limit: form.limit.value,
      filter: form.filter.value,
      sort: form.sort.value
    };

    let keys = Object.keys(params);
    for(let i = 0; i < keys.length; i++){
      if(!params[keys[i]]&&i!=1){
        alert("All fields are required.");
        return;
      }
    }

    axios.get('/apis/cities/city?' + queryString.encode(params)).then(
      (res) => {
        if(res.data.error){
          alert(res.data.error);
        } else {
          props.setCities(res.data);
        }
      }
    ).catch((err) => {
      console.log(err);
    }).then( (res) => {
      console.log(res);
    }
    )
  }

  return (
    <div>
      <form id="formCitySearch">
        <div className="row form-group">
          <div className="col col-12 col-sm-3">
            <label htmlFor="filter">City name:</label>
          </div>
          <div className="col col-12 col-sm-9">
            <input id="filter" name="filter" type="text" className="form-control" placeholder="Spokane"></input>
          </div>
        </div>
        <div className="row form-group">
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
        </div>
        <div className="row form-group">
          <div className="col col-12 col-sm-3">
            <label htmlFor="sort">Sort by:</label>
          </div>
          <div className="col col-12 col-sm-9">
            <select id="sort" name="sort" type="text" className="form-control" placeholder="Spokane">
              <option value="alphabetical">Alphabetical</option>
              <option value="rank">Rank</option>
              <option value="similarity">Similarity</option>
            </select>
          </div>
        </div>
      </form>
      <button className="btn btn-primary" onClick={onSubmit}>Search</button>
    </div>
  );

}

export default SearchForm;
