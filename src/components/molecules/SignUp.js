import React from 'react';
import { useLocation } from "react-router-dom";
import SignUpForm from './forms/SignUpForm';
import { SignUpEmailSent } from './SignUpEmailSent';

export const SignUp = () => {
  const query = new URLSearchParams(useLocation().search);

  if (query.get('email-sent') === 'true') {
    return <SignUpEmailSent />
  } else {
    return <SignUpForm />
  }
}