import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Users } from "./data/users"; 

import Nav from './components/nav';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import NotFoundPage from './pages/notfound';
import UserPage from './pages/user';
import SignUpPage from './pages/signup';
import GolfClubPage from './pages/golfclub';
import GolfPartyPage from './pages/golfparty';
import FAQPage from './pages/faq';

function App() {
  if (JSON.parse(localStorage.getItem("golfPartyActive")) === true) {
    const partyData = JSON.parse(localStorage.getItem("golfParty"));

    partyData.invited.forEach(invited => {
      const user = Users.find(user => user.id === invited.id);

      if (user) user.invited = true;
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <LoginPage/> }/>
        <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/signup" element={ <SignUpPage/> }/>

        <Route path="/" element={ <Nav/> }>
          <Route path="/home" element={ <HomePage/> }/>
          <Route path="/user/:userId" element={ <UserPage/> }/>
          <Route path="/golfclub" element={ <GolfClubPage/> }/>
          <Route path="/golfparty" element={ <GolfPartyPage/> }/>
          <Route path="/faq" element={ <FAQPage/> }/>
          <Route path="*" element={ <NotFoundPage/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
