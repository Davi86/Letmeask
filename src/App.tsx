//Switch serve para ter somente uma rota ao mesmo tempo na página
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import { AuthContextProvider } from './contexts/AuthContexts'


//Função principal App.
function App() {
  return (
    //Parte onde fica todas as rotas do app
    <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/rooms/new" component={NewRoom}/>
            <Route path="/rooms/:id" component={Room}/>
            <Route path="/admin/rooms/:id" component={AdminRoom}/>
          </Switch>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
 