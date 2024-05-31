import React, { useEffect, useState } from 'react'
import menuApi from '../api/menuApi'
import { Link, useLocation } from 'react-router-dom'
import SubMenuHeader from './SubMenuHeader';

function MenuHeader() {
    const [menuData,setMenuData]=useState([])
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
    const lastSegment = pathSegments.length === 0 ? '/' : pathSegments[pathSegments.length - 1];
    console.log("iiiiiii",lastSegment)
    useEffect(()=>{
        const fecth=async()=>{
            try {
              const response=await menuApi.getAllHeader()
              console.log(response)  
              if(response.status===200){
                setMenuData(response.data)
              }
            } catch (error) {
                
            }
        }
        fecth()
    },[])
  return (
    <div className="container">
          <nav className="main-nav w-100">
            <ul className="menu">
                {menuData.length>0&&menuData.map((item)=>(
                    <li className={item.link==lastSegment?"active":""}>
                    <Link  to={item.link}>{item.name}</Link>
                    <SubMenuHeader menuId={item.id}/>
                  </li>
                ))}
              
              
            </ul>
          </nav>
        </div>
  )
}

export default MenuHeader
