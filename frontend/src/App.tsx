import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './Home'
import User from './User'
import Navbar from './components/Navbar'
import Dropdown from './components/Dropdown'
import { useRef, useState } from 'react'
import ChatModal from './components/ChatModal'
import CreatePostModal from './components/CreatePostModal'

export default function App() {
  
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [showChatModal, setShowChatModal] = useState<boolean>(false)
  const [closedCreatePostModal, setCloseCreatePostModal] = useState<boolean>(false)
  const dropdownRef = useRef<any>(null)
  const modalRef = useRef<any>(null)
  const buttonRef = useRef<any>(null)

  return (
    <>
    <div className='flex justify-between items-end'>
    {closedCreatePostModal&&<CreatePostModal setCloseCreatePostModal={setCloseCreatePostModal} closedCreatePostModal={closedCreatePostModal}/>}
      <div className='flex flex-row'>
        <Navbar closedCreatePostModal={closedCreatePostModal} setCloseCreatePostModal={setCloseCreatePostModal} buttonRef={buttonRef} setShowChatModal={setShowChatModal} showChatModal={showChatModal} dropdownRef={dropdownRef} showDropdown={showDropdown} setShowDropDown={setShowDropdown}/>
        {showDropdown&& <Dropdown dropdownRef={dropdownRef}/>}
      </div>
      <div className=''>
        {showChatModal&&<ChatModal buttonRef={buttonRef} modalRef={modalRef} setShowChatModal={setShowChatModal}/>}
      </div>
    </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<User/>} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
    </>
  )
}
