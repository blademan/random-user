import React, { useState, useEffect } from 'react';
import { FaEnvelopeOpen, FaUser, FaCalendarTimes, FaMap, FaPhone, FaLock } from 'react-icons/fa';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

function App() {
 const [loading, setLoading] = useState(true);
 const [person, setPerson] = useState([]);
 const [title, setTitle] = useState('');
 const [value, setValue] = useState('random person');

 const handleValue = (e) => {
  if (e.target.classList.contains('icon')) {
   const newValue = e.target.dataset.label;
   setTitle(newValue);
   setValue(person[newValue]);
  }
 };

 const getPerson = async () => {
  setLoading(true);
  const response = await fetch(url);
  const data = await response.json();
  const person = data.results[0];
  const { phone, email } = person;
  const { large: image } = person.picture;
  const { password } = person.login;
  const { first, last } = person.name;
  const {
   dob: { age },
  } = person;
  const {
   street: { number, name },
  } = person.location;

  const newPerson = {
   image,
   phone,
   email,
   password,
   age,
   street: `${number} ${name}`,
   name: `${first} ${last}`,
  };
  setPerson(newPerson);
  setLoading(false);
  setTitle('name');
  setValue(newPerson.name);
 };

 useEffect(() => {
  getPerson();
 }, []);

 return (
  <div className="">
   <div className="section h-[50vh] bg-gray-1"></div>
   <div className="section h-[50vh]   bg-[#f1f5f8] px-6">
    <div className="flex flex-col items-center justify-center bg-white p-6 pt-6 rounded-md top-[-200px] relative shadow-lg max-w-[600px] mx-auto">
     <div className="content absolute w-full h-[130px] bg-[#f1f5f8] top-0 left-0 border border-b-200 rounded-t-md "></div>
     <img
      src={(person && person.image) || defaultImage}
      alt=""
      className="relative rounded-full border border-gray-200  p-1 bg-white w-[150px] h-[150px] "
     />
     <p className="pt-10 text-2xl text-tx pb-2">My {title} is</p>
     <p className="text-3xl pb-4">{value}</p>

     <div className="values-list flex justify-around w-full text-[#617d98] text-2xl">
      <button
       className="hover:text-[#49a6e9] duration-500  icon p-1"
       data-label="name"
       onMouseOver={handleValue}>
       <FaUser className="" />
      </button>
      <button
       className="hover:text-[#49a6e9] duration-500  icon p-1"
       data-label="email"
       onMouseOver={handleValue}>
       <FaEnvelopeOpen />
      </button>
      <button
       className="hover:text-[#49a6e9] duration-500 icon p-1"
       data-label="age"
       onMouseOver={handleValue}>
       <FaCalendarTimes />
      </button>
      <button
       className="hover:text-[#49a6e9] duration-500 icon p-1"
       data-label="street"
       onMouseOver={handleValue}>
       <FaMap />
      </button>
      <button
       className="hover:text-[#49a6e9] duration-500 icon p-1"
       data-label="phone"
       onMouseOver={handleValue}>
       <FaPhone />
      </button>
      <button
       className="hover:text-[#49a6e9] duration-500 icon p-1"
       data-label="password"
       onMouseOver={handleValue}>
       <FaLock />
      </button>
     </div>
     <button
      onClick={getPerson}
      className=" bg-[#49a6e9] px-4 py-1 rounded-md text-white mt-6 tracking-widest hover:bg-tx">
      {loading ? 'Loading...' : 'Random User'}
     </button>
    </div>
   </div>
  </div>
 );
}

export default App;
