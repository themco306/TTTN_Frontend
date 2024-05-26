import React, { useEffect, useState } from "react";
import menuApi from "../api/menuApi";
import { Link } from "react-router-dom";

function SubMenuHeader({ menuId }) {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await menuApi.getSubMenu(menuId);
        console.log(response);
        if (response.status === 200) {
          setMenuData(response.data);
        }
      } catch (error) {}
    };
    fecth();
  }, [menuId]);
  return (
    <>
    {menuData.length>0&&(
      <ul>
      {menuData.map((item) => (
          <li>
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
    </ul>
    )}
    </>

  );
}

export default SubMenuHeader;
