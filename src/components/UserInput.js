import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { getGitHubAccount } from '../gitHubService';
import ValidationMessage from './ValidationMessage';
import { addUser } from '../actionCreator';
import { USERS } from '../constants/paths';

class UserInput extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {
                name: "",
                sex: "",
                number: "",
                email: "",
                hasGitHub: false,
                gitHubAccount: ""
            },
            errors: {},
            isSubmitted: false
        }
        this.regExp = {
            number: new RegExp(/^(\+38)?[ ]?(\(([0-9]{3})\)|([0-9]{3}))[- ]?([0-9]{3})[- ]?([0-9]{4})$/),
            email: new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
        }
    }

    static propTypes = {
        addUser: PropTypes.func
    };

    addUser = (form) => {
        const { user } = this.state;
        const { addUser, history } = this.props;

        user.id = `${user.name}${(new Date()).getTime()}`
        addUser(user);
        form.reset();
        history.push(USERS)
    };

    checkRequiredValidation = (name) => {
        const error = 'Заповніть поле, щоб продовжити';
        const { user } = this.state;

        return user[name] ? null : error;
    }

    checkRegExpValidation = (name) => {
        const error = 'Невірний формат';
        const { user } = this.state;

        const valRes = user[name] && this.regExp[name].test(user[name]);
        return  valRes ? null : error;
    }

    checkValidation = (validationFunction, name, errors) => {
        var result = validationFunction(name);
        errors[name] = result;
        return !result;
    }

    handleValidation = (event) => {
        const user = this.state.user;
        const form = event.currentTarget;
        const errors = {};

        if (!
            (this.checkValidation(this.checkRequiredValidation, 'name', errors) &
                this.checkValidation(this.checkRequiredValidation, 'sex', errors) &
                (this.checkValidation(this.checkRequiredValidation, 'email', errors) 
                    && this.checkValidation(this.checkRegExpValidation, 'email', errors))  &
                (this.checkValidation(this.checkRequiredValidation, 'number', errors)
                    && this.checkValidation(this.checkRegExpValidation, 'number', errors)) &
                (!user.hasGitHub || this.checkValidation(this.checkRequiredValidation, 'gitHubAccount', errors)))) {
            this.setState({ errors: errors })
            return;
        }

        if (user.hasGitHub) {
            getGitHubAccount(user.gitHubAccount).then((data) => {
                user.icon = data.avatar_url
                this.addUser(form)
            }, (error) => {
                const { errors } = this.state;
                errors.gitHubAccount = 'Некоректний акаунт';
                this.setState({ errors: errors });
            });

        } else {
            this.addUser(form);
        }

    }

    submitForm = (event) => {
        event.preventDefault();
        this.handleValidation(event);
        this.setState({ isSubmitted: true })

    };

    handleChange = event => {
        let user = this.state.user;

        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleGitHubCBChange = event => {
        const user = this.state.user;

        user[event.target.name] = event.target.checked;
        if (!event.target.checked) {
            user.gitHubAccount = "";
        }
        this.setState({ user });
    }

    render() {
        const { errors, user, isSubmitted } = this.state;
        return (
                <form name="userForm" noValidate onSubmit={this.submitForm}>
                    <legend>Заповніть дані</legend>

                    <div className="form-group ">
                        <label htmlFor="name">Акаунт:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={this.handleChange}
                            value={user.name}
                            className="form-control"
                        />
                        <ValidationMessage show={isSubmitted} error={this.checkRequiredValidation('name')} />
                    </div>

                    <div className="form-group">
                        <label>Стать:</label>
                        <select
                            onChange={this.handleChange}
                            name="sex"
                            className="form-control"
                            value={user.sex}
                        >
                            <option value="" disabled hidden></option>
                            <option value="male">Чоловіча</option>
                            <option value="female">Жіноча</option>
                        </select>
                        <ValidationMessage show={isSubmitted} error={this.checkRequiredValidation('sex')} />
                    </div>

                    <div className="form-group">
                        <label>Номер телефону:</label>
                        <input
                            className="form-control"
                            name="number"
                            type="text"
                            onChange={this.handleChange}
                            value={user.phone}
                        />
                        <ValidationMessage
                            show={isSubmitted}
                            error={(this.checkRequiredValidation('number') || this.checkRegExpValidation('number'))} />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" name="email" type="text" onChange={this.handleChange} value={user.email} />
                        <ValidationMessage show={isSubmitted}
                            error={(this.checkRequiredValidation('email') || this.checkRegExpValidation('email'))} />
                    </div>

                    <div className="form-group form-check">
                        <input type="checkbox" name="hasGitHub" className="form-check-input" value={user.hasGitHub} onChange={this.handleGitHubCBChange} />
                        <label className="form-check-label">У мене є Github!</label>
                    </div>
                    {
                        user.hasGitHub ?
                            <div className="form-group">
                                <label>Github акаунт</label>
                                <input className="form-control" name="gitHubAccount" type="text" onChange={this.handleChange} value={user.gitHubAccount} />
                                <ValidationMessage show={isSubmitted} error={errors.gitHubAccount || this.checkRequiredValidation('gitHubAccount')} />
                            </div>
                            : null
                    }

                    <button type="submit">Додати користувача</button>
                </form>

        )
    }
}

export default connect(
    null,
    { addUser }
)(UserInput)