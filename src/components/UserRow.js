import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux'

import { deleteUser } from '../actionCreator'
import { USER_DETAIL } from '../constants/paths'

class UserRow extends React.Component {

    //12*
    static propTypes = {
        deleteUser: PropTypes.func,
        user: PropTypes.object
    };

    render() {
        const { deleteUser, user } = this.props;

        return (
            <div className="user-row info-block">
                <div className="item">                    
                    <Link to={ USER_DETAIL(user.id) }>
                        {user.name}
                    </Link>
                </div>
                <div className="item item-with-icon">
                    <i className={`fas fa-${user.sex}`}></i>
                </div>
                <div className="item right-side">
                    {
                        user.gitHubAccount && (
                            <div>
                                <a href={`https://github.com/${user.gitHubAccount}`}>
                                    {user.gitHubAccount}
                                </a>
                                <img src={user.icon} alt="Account" />
                            </div>
                        )
                    }
                </div>
                <div className="item item-with-icon">
                    <i className="fas fa-times-circle delete-user" onClick={() => deleteUser(user)} />
                </div>

            </div>
        )
    }
}

export default connect(
    null,
    { deleteUser }
  )(UserRow)