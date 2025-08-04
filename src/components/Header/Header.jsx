import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, Navigate, useSearchParams } from "react-router-dom";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [date , setDate] = useState ([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'traveling-date-range',
  }])
  const [openDate , setOpenDate] = useState(false);
  const handleOptions = (name , operation) =>{
    setOptions(prev =>{
      return{
            ...prev,
            [name] : operation === "inc" ? options[name] +1 : options[name] -1 ,
      }
})
  }
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    //note : =>  setSearchParams(encodedParams);
    Navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div onClick={()=> setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate , 'MM/dd/yyyy')} to ${format(date[0].endDate , 'MM/dd/yyyy')}`}
          </div>
          {openDate && (<DateRange ranges={date} onChange={(item) => setDate([item.selection])} 
            className="date"
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
            />
            ) }
        </div>
        <span className="seperator"></span>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children} children &bull; {options.room}
          </div>
          {openOptions && <GuestOptionList options={options} setOpenOptions={setOpenOptions} handleOptions={handleOptions}/>}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({options , handleOptions ,setOpenOptions}) {
  const optionRef = useRef();
  useOutsideClick(optionRef,"optionDropDown" ,()=>setOpenOptions(false) );
  <div className="guestOptions" ref={optionRef}>
    <OptionItem  handleOptions={handleOptions}
    type="adult"
    options={options}
    minlLimit = {1}
    />
    <OptionItem handleOptions={handleOptions} type="children"
     options={options}
     minlLimit = {0}/>
    <OptionItem handleOptions={handleOptions} type="room"
     options={options}
     minlLimit = {1} />
  </div>;
}

function OptionItem({options , type , minlLimit , handleOptions}) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button className="optionCounterBtn" onClick={()=>handleOptions(type , "dec")} disabled={options[type] <= minlLimit}>
          <HiMinus className="icon" />
        </button>
        <span className="optionConterNumber">{options[type]}</span>
        <button
        onClick={()=> handleOptions(type , "inc")}
          className="optionCounterBtn" >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
