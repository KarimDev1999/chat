import { useContext } from 'react';
import { Login, Register, Room, RoomSearch } from './components';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import './scss/app.scss';

function App() {
  const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => user ? <Redirect to='room-search' /> : <Redirect to='/login' />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
        <Route path='/room-search' render={() => user ? <RoomSearch /> : <Redirect to='/login' />} />
        <Route path='/room/:roomId' render={() => user ? <Room /> : <Redirect to='/login' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
