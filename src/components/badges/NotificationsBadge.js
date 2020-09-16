import React, { useState } from 'react'

export default function NotificationsBadge() {
  const notifications = [
    { title: '1 task finished', detail: 1 },
    { title: '2 task stopped', detail: 2 },
    { title: '1 new message', detail: 1 },
    { title: '5 new followers', detail: 5 },
  ]
  const [showWindow, setShowWindow] = useState(false)
  const handleShowWindow = () => {
    setShowWindow(!showWindow)
    setTimeout(() => {
      setShowWindow(false)
    }, 60000)
  }

  return (
    <button onClick={handleShowWindow} className={`flex shadow bg-invert items-center justify-center border-2 border-transparent w-8 h-8 hover:shadow-outline cursor-pointer rounded-full  ${notifications.length === 0 && 'text-gray-500'}  focus:outline-none transition duration-150 ease-in-out relative`} aria-label="Notifications">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {notifications.length > 0 && <div className='w-3 h-3 -m-1 bg-red-500 rounded-full absolute top-0 right-0 animate-pulse'></div>}
      {showWindow && <NotificationsWindow notifications={notifications}/>}
    </button>
  )
}


const NotificationsWindow = ({notifications}) => {
  
  return <div className='bg-invert text-sm rounded-lg shadow-lg p-4 top-0 absolute mt-12 text-left w-48 z-30 '>
    <figure className='absolute w-3 h-3 bg-invert absolute top-0 left-0 right-0 mx-auto transform -mt-1 rotate-45'></figure>
    <ul>
      {notifications.map((notification, index) =>
        <li key={index} className='flex justify-between items-center my-1'>
          {notification.title}
          <span className='text-red-500  rounded-full font-bold text-sm'>{notification.detail}</span>
        </li>
      )}
    </ul>
  </div>
}