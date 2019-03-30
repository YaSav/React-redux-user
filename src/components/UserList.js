import React from 'react';
import { connect } from 'react-redux'

import UserRow from './UserRow';

class UserList extends React.Component {

    render() {
        const { users } = this.props;

        return (
            <>
                {
                    users.length ?
                        users.map(user => (
                            <UserRow
                                user={user}
                                key={user.id}
                                index={user.id}
                            >
                            </UserRow>

                        ))
                        : <div>У системі немає користувачів</div>
                }
            </>
        )
    }
}

const mapStateToProps = state => { return { users: state.users } }

export default connect(mapStateToProps)(UserList)


//до кінця тижня зроби зауваження, ну будь нормальна, плз
//і залий на гітХаб - Назар хоче то побачити вживу
//вихідні собі хоче спортити