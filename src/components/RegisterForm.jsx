import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';

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

    doSubmit = () => {
        console.log("registered");
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
 

