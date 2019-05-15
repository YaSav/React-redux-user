import React from 'react';
import { connect } from 'react-redux'

import UserRow from './UserRow';

const UserList = ({ users }) => (
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

const mapStateToProps = state => { return { users: state.users } }

export default connect(mapStateToProps)(UserList)