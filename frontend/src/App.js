import "./App.css";
import { Route } from "react-router-dom";
import homePage from "./Pages/homePage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={homePage} exact />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
