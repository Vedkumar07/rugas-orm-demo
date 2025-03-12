import './App.css'
import {BrowserRouter,Routes,Route,Outlet} from 'react-router-dom'
import { NavBar } from './Component/NavBar' 
import { AuthPage } from './page/AuthPage'
import { ProductPage } from './page/ProductPage'
import { ProductListed } from './Component/ProductListed'
import { UserPage } from './page/UserPage' 
import { UserListed } from './Component/UserListed'
import { Purchese } from './Component/Purchese'


function App() {
  function Layout(out){
    return<div className="flex flex-col h-screen bg-black text-white">
    {/* Sidebar Navbar */}
    <nav className="bg-gray-900 p-4 flex items-center justify-between shadow-md">
    <h1 className="text-xl font-semibold">RUGAS</h1>
    <NavBar /> 
  </nav>


    <div className="flex-1 p-6 overflow-y-auto">
      <Outlet />
    </div>
  </div>
  
  }

  return(
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout />} > 
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route path="/ProductListed" element={<ProductListed />} />
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/UserListed" element={<UserListed />} />
            <Route path="/Purchese" element={<Purchese />} />
           </Route> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
