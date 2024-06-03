import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';

import Navbar from './Pages/Navbar'
import TopBar from './Pages/TopBar'
import Overview from './Pages/Overview'
import NotFound from './Pages/NotFound'
import TotalStores from './Pages/Stores/TotalStores'
import NewStoresThisMonth from './Pages/Stores/NewStoresThisMonth'
import NewStoresLastMonth from './Pages/Stores/NewStoresLastMonth'
import NewtoresByMonth from './Pages/Stores/NewtoresByMonth'
import Custmer from './Pages/Customer/Custmer'
import SalesHistory from './Pages/Sales/SalesHistory'
import SalesByStore from './Pages/Sales/SalesByStore'
import Performance from './Pages/Sales/Performance'
import Revenue from './Pages/Revenue/Revenue'
import RevenueHistory from './Pages/Revenue/RevenueHistory'
import SocialReach from './Pages/Social/SocialReach'
import SocialPlatform from './Pages/Social/SocialPlatform'
import PromoSetup from './Pages/Promo/PromoSetup'
import FAQ from './Pages/Support/FAQ'
import CustomerSupport from './Pages/Support/CustomerSupport'
import FAQ_editor from './Pages/Support/FAQ_editor'
import Login from './Pages/Login/Login'
import ForgotPassword from './Pages/Login/ForgotPassword';
import UpdatePassword from './Pages/Login/UpdatePassword';
const process =  import.meta.env




function App() {


  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)

  function verifyTheToken() {
    try {
      fetch(`${process.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          // mode: "no-cors",
          body: JSON.stringify({
            "email": emailRef.current.value,
            "password": passwordRef.current.value
          })
        })
        .then(resp => {
          console.log("resp  ", resp)
          return resp.json()
        })
        .then((result) => {

          if (result?.accessToken.length > 10) {
            if (rememberME.current.checked) {
              console.log("rememberME  ", result)
              localStorage.setItem("admin_login_token", result.accessToken)
            } else {
              sessionStorage.setItem("admin_login_token", result.accessToken)
              console.log("!rememberME ", result)
            }
          }
        })
        .catch(
          passwordRef.current.value = "",
          document.querySelector(".error").classList.add("animate")
        )
    } catch {

      document.querySelector(".error").classList.add("animate")
      // passwordRef.current.value = "",
    }
  }


  async function checkLogedIn() {

    const rememberME = localStorage.getItem("admin_login_token")
    const DrememberME = sessionStorage.getItem("admin_login_token")
    if (rememberME || DrememberME) {

      let token = ""
      rememberME?.length > 20 ? token = rememberME : token = DrememberME
      try {
        const data = await fetch(`${process.VITE_BASE_URL}/api/auth/verifytoken`,
          {
            method: "Get",
            headers: {
              'Content-Type': 'application/json',
              'token': token
            }
          })

        if (data.ok) {
          const resp = await data.json()

          if (resp.accessToken == token) {
            setLoggedIn(true)
            navigate("/overview")
          }
        }
        else {
          localStorage.removeItem("admin_login_token")
          sessionStorage.removeItem("admin_login_token")
          navigate("/login")
          // location.pathname = "/login"
        }

      } catch (err) {
        localStorage.removeItem("admin_login_token")
        sessionStorage.removeItem("admin_login_token")
        navigate("/login")
        console.log("err")
      }
    }
    else {
      localStorage.removeItem("admin_login_token")
      sessionStorage.removeItem("admin_login_token")
      // location.pathname = "/login"
      navigate("/login")
    }
  }

  useEffect(() => {
    checkLogedIn()
  }, [])

  return (

    <div id="app">
      <main className="tabs">
        {
          !loggedIn ?
            // <h1>Loading</h1>
            <>
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/user/reset" element={<ForgotPassword />} />
                <Route exact path="/user/update" element={<UpdatePassword />} />
              </Routes>
            </>
            :
            <div className='container'>
              <Navbar />
              <div className="right_side">
                <TopBar />
                <div className='dataContainer'>
                  <Routes>
                    <Route exact path="/overview" element={<Overview />} />

                    <Route exact path='/stores/totalstores' element={<TotalStores />} />
                    <Route exact path='/stores/newthismonth' element={<NewStoresThisMonth />} />
                    <Route exact path='/stores/lastmonth' element={<NewStoresLastMonth />} />
                    <Route exact path='/stores/bymonth' element={<NewtoresByMonth />} />

                    <Route exact path='/customer' element={<Custmer />} />

                    <Route exact path='/sales/history' element={<SalesHistory />} />
                    <Route exact path='/sales/bystore' element={<SalesByStore />} />
                    <Route exact path='/sales/performance' element={<Performance />} />

                    <Route exact path='/revenue/total' element={<Revenue />} />
                    <Route exact path='/revenue/history' element={<RevenueHistory />} />

                    <Route exact path='/social/reach' element={<SocialReach />} />
                    <Route exact path='/social/platforms' element={<SocialPlatform />} />

                    <Route exact path='/support/customersupport' element={<CustomerSupport />} />
                    <Route exact path='/support/faq' element={<FAQ />} />
                    <Route exact path='/support/faq_editor/:id' element={<FAQ_editor />} />

                    <Route exact path='/promo/setup' element={<PromoSetup />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </div>
        }

      </main>
    </div>
  )
}

export default App
