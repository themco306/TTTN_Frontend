
import { useEffect } from 'react';
import { userApi } from './api/userApi';
import Footer from './parts/Footer';
import Header from './parts/Header';
import Main from './parts/Main';
import InnitData from './utils/InnitData';
import { useDispatch } from 'react-redux';
import { authActions } from './state/actions/authActions';

// import '../public/assets/js/main.min.js'; // Import JavaScript
function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    const user =localStorage.getItem("userCustomer")!==undefined? JSON.parse(localStorage.getItem("userCustomer")):null;
    const fetchUserData = async () => {
      if (user!==null) {
        try {
          const response = await userApi.get(user.id);
          if (response.status === 200) {
            localStorage.setItem(
              "userCustomer",
              JSON.stringify(response?.data)
            );
            dispatch(authActions.login(response?.data))
          } else {
            console.error("Failed to fetch user data from backend");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="page-wrapper">
        <Header/>
        <Main/>
        <a id="scroll-top" href="#top" title="Top" role="button"><i className="icon-angle-up"></i></a>
        <Footer/>
      </div>
  );
}

export default App;
