import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import { loginWithJwt } from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: {email: '', password: '', name:''},
        errors: {}
    }

    schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
        password: Joi.string().required().min(5).error(errors => {
            return {
                message: "Your password must contain at least 5 characters."
            }
        }),
        name: Joi.string().required().max(50).label('Name')
    }

    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        } catch(ex) {
            if(ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() { 
        return (<div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'Email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton("Register")}
            </form>
        </div>);
    }
}
 
export default RegisterForm;
 

