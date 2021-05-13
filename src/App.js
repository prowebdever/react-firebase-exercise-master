import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import SignInForm from './pages/signin'
import Train from './pages/train'

const theme = createMuiTheme({
  palette: {
      primary: {
          main: purple[500],
      },
      secondary: {
          main: green[500]
      }
  }
})

const App = (props) => {
  const authState = useSelector( state => state.sign.get('auth'));
  const firebase = props.firebase;

  useEffect(() => {
      console.log(authState);
  }, [authState]);

  return (
      <Router>
        <ThemeProvider theme={theme}>
        <div>
          <Switch>
            <Route exact path="/">
              {authState? <Redirect to="/train"/> : <Redirect to="/signin"/>}
            </Route>
            <Route path='/signin' component={() => <SignInForm firebase={firebase} />}/>
            <Route exact path="/train" component={() => <Train firebase={firebase} />}></Route>
            <Route path="/*"><Redirect to="/"></Redirect></Route>
          </Switch>
        </div>
        </ThemeProvider>      
      </Router>
  );
}

export default App;
