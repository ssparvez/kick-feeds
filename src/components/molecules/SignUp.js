import React from 'react';
import { useLocation } from "react-router-dom";
import SignUpForm from './forms/SignUpForm';
import { SignUpEmailSent } from './SignUpEmailSent';

export const SignUp = () => {
  const query = new URLSearchParams(useLocation().search);
  console.log(query.get('email-sent'));

  if (query.get('email-sent') === 'true') {
    return <SignUpEmailSent />
  } else {
    return <SignUpForm />
  }
}