import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GroceriesApp from "./GroceriesApp";
import LoginForm from "./LoginForm";
import NotFound from "./NotFound"


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<LoginForm />}/>

        <Route path="*" element={<NotFound/>}/>
              <Route path="/main" element={<GroceriesApp />}/>
      </Routes>
    </BrowserRouter>

      
      
    </>
  );
}

export default App;
