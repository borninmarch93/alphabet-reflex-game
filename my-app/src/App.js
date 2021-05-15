import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartGamePage from "./pages/StartGamePage";
import GameLevelPage from "./pages/GameLevelPage";
import GamePage from "./pages/GamePage";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={StartGamePage}/>
                <Route path="/choose-level" component={GameLevelPage}/>
                <Route path="/game" component={GamePage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
