import React from 'react';

const NavBar = (props) => {

    return (
        <div className="row">
        <div class="col col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 center btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary">Left</button>
          <button type="button" class="btn btn-secondary">Middle</button>
          <button type="button" class="btn btn-secondary">Right</button>
        </div>
      </div>
    );

}

export default NavBar;