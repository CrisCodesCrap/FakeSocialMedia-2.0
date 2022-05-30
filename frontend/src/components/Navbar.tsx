import { useState,useEffect, useRef } from 'react'
import {FaHome, FaComment, FaBell, FaSearch, FaPlus} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import UserIcon from './UserIcon'

interface NavbarProps {
    showDropdown: boolean
    setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>
    dropdownRef: React.MutableRefObject<any>
    showChatModal: boolean
    setShowChatModal: React.Dispatch<React.SetStateAction<boolean>>
    buttonRef: React.MutableRefObject<any>
    closedCreatePostModal: boolean
    setCloseCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({ closedCreatePostModal, setCloseCreatePostModal,showDropdown, setShowDropDown, dropdownRef, showChatModal, setShowChatModal, buttonRef}:NavbarProps) {
    
    const notificationsButton = useRef<any>(null)
    const searchButton = useRef<any>(null)

    function handleOusideClick(e:any){
        if(dropdownRef.current === null) return
         if(!notificationsButton.current.contains(e.target) && !searchButton.current.contains(e.target) && !dropdownRef.current.contains(e.target)){
            setShowDropDown(false)
        }
    }
    useEffect(
        ()=>{
        document.addEventListener('click',(e:any)=>handleOusideClick(e),true)
        return () => document.removeEventListener('click',(e:any)=>handleOusideClick(e),true)
    },[])

    return ( 
            <div className="w-16 bg-gradient-to-tr from-sky-500 to-blue-600 h-screen">
                <div className="flex justify-start items-center h-screen flex-col">
                    <UserIcon/>
                    <Icon useType={1} tooltip={'Home'} icon={<FaHome className='w-6 h-6'/>}/>
                    <Icon useType={2} showDropdown={showDropdown} setShowDropDown={setShowDropDown} refName={notificationsButton} tooltip={'Notifications'} icon={<FaBell className='w-5 h-5'/>}/>
                    <Icon useType={3} setCloseCreatePostModal={setCloseCreatePostModal} closedCreatePostModal={closedCreatePostModal} tooltip={'Add a post'} icon={<FaPlus className='w-5 h-5'/>}/>
                    <Icon useType={4} showChatModal={showChatModal} setShowChatModal={setShowChatModal} refName={buttonRef} tooltip={'Messages'} icon={<FaComment className='w-5 h-5'/>}/>
                    <Icon useType={2} showDropdown={showDropdown} setShowDropDown={setShowDropDown} refName={searchButton} tooltip={'Search for a user or a post'} icon={<FaSearch className='w-5 h-5'/>}/>
                    <div className='flex justify-end items-center flex-col cursor-pointer'>
                    </div>
                </div>
            </div>
     )
}