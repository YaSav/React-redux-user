import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Provider } from 'react-redux';

import PhotoG from './PhotoG/PhotoG';
import UserInput from './UserInput';
import UserList from './UserList';
import UserDetail from './UserDetail';
import { USERS, ADD_USERS, USER_DETAIL } from '../constants/paths';
import store from '../store';

class AppRouter extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <nav className="navbar navbar-light bg-light">
                            <span className="navbar-brand">
                                <Link to={ADD_USERS} >Додати користувачів</Link>
                            </span>
                            <span className="navbar-brand">
                                <Link to={USERS}>Користувачі</Link>
                            </span>
                        </nav>

                        <main className="content">
                            <Switch>
                                <Route path="/" exact component={PhotoG} />
                                <Route path={ADD_USERS} exact component={UserInput} />} />
                                <Route path={USERS} exact component={UserList} />
                                <Route path={USER_DETAIL()}  component={UserDetail} />
                            </Switch>
                        </main>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default AppRouter;