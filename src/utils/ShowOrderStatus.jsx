import React from 'react'
import { Message } from 'primereact/message';
import { Tooltip } from 'primereact/tooltip';
function ShowOrderStatus({id,data}) {
  return (
    <div  style={{ cursor:'pointer' }} > 
    <Tooltip target={`#v${id}`} mouseTrack mouseTrackLeft={10} content={data.tooltip}/>
    <Message id={`v${id}`}   icon={data.icon} severity={data.type} text={data.text} ></Message>

</div>
  )
}

export default ShowOrderStatus
