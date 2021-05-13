import React, {Component} from 'react';

export const FirebaseContext = React.createContext(null);

export const withFirebase = (props) => {
    return (
        <FirebaseContext.Consumer>
            {firebase => <Component {...props} firebase={firebase}/>}
        </FirebaseContext.Consumer>
    )
}

export default FirebaseContext;