
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


function Main() {

  return (
   <main>

    <ToastContainer position='top-center' autoClose={2000} />
    <Outlet/>
  </main>

  )
}

export default Main
