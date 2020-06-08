import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'


class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (<Field key={name} label={label} type="text" name={name} component={SurveyField} />);
        }
        );
    }

    //no parentheses in this.props.onSurveySubmit(no "this.props.onSurveySubmit()") to call  this function(or javascript interpreter) and not the callback function
    //we want to only call the function after the user submitted or attemps to dismiss the form. And to call  the second
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                    <i className="material-icons right">done</i>
                    </button>
                </form>

            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || ''); //empty string to avoid error (cannot read property split of undefined)

    _.each(formFields, ({ name, noValueErrorMessage }) => {
        if (!values[name]) {
            errors[name] = noValueErrorMessage;
        }
    });


    return errors;
}

//initialize survey
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false //the form with its entered inputs are not deleted when  they are not displayed in the web browser. 
    //In this case, when go back to surveys/new after clicking on the back button(cf. SurveyFormReview.js), 
    //the entered values (and the form) are still in the survey fields. 
    //With "true", form is destroyed  and not displayed after clicking on the back button
})(SurveyForm);