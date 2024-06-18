import React, { useState,useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams ,useNavigate} from 'react-router-dom'

const Player = () => {

  const {id}=useParams();
  const navigate=useNavigate();
// state variable storing
  const [apiData,setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2FlNDVmODk0YWUwY2M2MmU5Zjk2ZWY4OTYwY2U4NCIsInN1YiI6IjY2NDM1YThhZWYxNTM4OGUxYmYyMGMwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1s6cwHbkim6x5qaAzrRenaUupx_wVYBR6BoLiJX_sDM'
    }
  };
  // api first object result array 
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>navigate(-1)} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        {/* <p>Type</p> */}
      </div>
    </div>
  )
}

export default Player
// src='{url}' wrong src='url'