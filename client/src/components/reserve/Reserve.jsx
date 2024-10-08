import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/Searchcontext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Reserve({setOpen, hotelId}) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const{ data, loading, error} = useFetch(`room/${hotelId}`);
  const{dates} = useContext(SearchContext);

  const getDatesInRange = (startDate,endDate)=>{

    const end = new Date(endDate);
    const start = new Date(startDate);
    
    const date = new Date(start.getTime());

    let list=[];

    while(date <= end){
      list.push(new Date(date).getTime());
      date.setDate(date.getDate()+1)

    }
    return list;

  }
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) => {

    

    try {
      const isFound = roomNumber.unavailableDate.some((date) =>
        allDates.includes(new Date(date).getTime())
      );
      return !isFound;
    } catch (error) {
      console.error("Error in isAvailable function:", error);
      return false; // Default to not available in case of error
    }
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms)

  const navigate= useNavigate();

  const handleClick = async () => {
    try{
      await Promise.all(selectedRooms.map(roomId=>{
        const res = axios.put(`/rooms/availability/${roomId}`, {dates: allDates})
        return res;
      }))
      setOpen(false);
      navigate("/");

    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> setOpen(false)} />
        <span>Select your rooms: </span>
        {data.map((item, index) => (
          <div key={index} className="ritem">
            <div className="rInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
            {item.roomNumbers.map((roomNumber) => (
              <div key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input 
                  type="checkbox" 
                  value={roomNumber._id} 
                  onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)} 
                />
              </div>
            ))}
        </div>

          </div>
        ))}

<button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        

      </div>
    </div>
  )
}
