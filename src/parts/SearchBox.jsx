import React, { useState, useRef, useEffect } from "react";
import productApi from "../api/productApi";
import appUrl from "../api/appUrl";
import { useNavigate } from "react-router-dom";

function SearchBox() {
    const isSearchResultPage = window.location.pathname.includes("ket-qua-tim-kiem");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [resSearch, setResSearch] = useState([]);
  const [query, setQuery] = useState('');
  const searchBoxRef = useRef(null);
  const handleSubmit = () => {
    navigate("ket-qua-tim-kiem",{state:{query:query}});
}
function highlightQuery(text, query) {
    const regex = new RegExp(query, 'gi');
    return text.replace(regex, match => `<span style="color: black;">${match}</span>`);
  }
  const handleSearchOnChange = async (value) => {
    setResSearch([]);
    setQuery(value);
    if (value.length > 1) {
      try {
        setLoading(true);
        const data = {
          query: value,
        };
        const response = await productApi.getSearch(data);
        console.log(response);
        if (response.status === 200) {
          setResSearch(response.data.items);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setResSearch([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div ref={searchBoxRef} className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
      <div className="header-search-wrapper">
        <input
          type="search"
          className="form-control"
          onChange={(e) => handleSearchOnChange(e.target.value)}
          onClick={(e) => handleSearchOnChange(e.target.value)}
          name="q"
          id="q"
          placeholder="Tìm kiếm..."
          required
          onKeyDown={handleKeyDown}
        />
        {!loading ? (
          <button className="btn icon-magnifier p-0" title="Tìm" onClick={handleSubmit}/>
        ) : (
          <button className="btn p-0" title="Đang tìm">
            {" "}
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "1rem", color: 'black' }}
            ></i>
          </button>
        )}
      </div>
      {resSearch.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: "whitesmoke", maxHeight: "250px", width: "90%", position: "absolute", zIndex: 999, marginTop: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            {resSearch.map((item, index) => (
              <div key={index} className="row" style={{
                cursor: 'pointer',
                backgroundColor: hoveredIndex === index ? '#eeeeee' : 'transparent'
              }}
                onClick={() => navigate("/san-pham/" + item.slug)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div className="col-3 p-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img style={{ width: "50%", borderRadius: "50%" }} src={appUrl.imageURL + item.galleries[0].imagePath} />
                </div>
                <div className="col-6" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <p style={{ color:"#7c7c7c" }} dangerouslySetInnerHTML={{ __html: highlightQuery(item.name, query) }}></p>
                </div>
                <div className="col-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p>{item.salePrice.toLocaleString()} VND</p>
                </div>
                <div className="col-12">
                  {index < resSearch.length - 1 && <hr className="mt-0 m-b-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
