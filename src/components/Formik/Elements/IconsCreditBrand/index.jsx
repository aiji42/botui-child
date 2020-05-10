import React from 'react';
import amex from './amex.gif';
import diners from './diners.gif';
import jcb from './jcb.gif';
import mastercard from './mastercard.gif';
import visa from './visa.gif';

export const Amex = (props) => <img src={amex} {...props} />;
export const Diners = (props) => <img src={diners} {...props} />;
export const Jcb = (props) => <img src={jcb} {...props} />;
export const Mastercard = (props) => <img src={mastercard} {...props} />;
export const Visa = (props) => <img src={visa} {...props} />;
