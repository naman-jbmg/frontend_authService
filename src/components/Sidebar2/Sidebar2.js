import React,{useState} from 'react'
import './sidebar2.css'

export default function Sidebar2() {

    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
        <div className={isOpen ? 'sidebar open' : 'sidebar'} style={{backgroundColor:"blue"}}>
      <button onClick={toggleSidebar} style={{margin:500}}>Close Sidebar</button>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
    </>
  )
}
