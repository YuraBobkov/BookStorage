import React from 'react';
import ItemForm from '../components/EditForm';

import Item from '../components/Item';

const Result = props => {
  if (!props.data){
    return null;
  }
  return (
    <div className="result">
      {props.data.map( elem => <Item elem={elem} key={elem._id} />)}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ItemForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Result;
