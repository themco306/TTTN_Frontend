import React from 'react'
import appUrl from '../../api/appUrl'

function ItemPostH({data}) {
  return (
    <div className='row'>
      <div className="col-md-5">
        <img src={appUrl.postUrl+data.imagePath} className="img-fluid" alt="..."/>
      </div>
      <div className="col-md-7"></div>
    </div>
  )
}

export default ItemPostH
