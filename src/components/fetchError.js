import React from 'react';
import { FormHelperText } from '@material-ui/core';

export const FetchError = ({ message }) => (
    <div>
        <FormHelperText error children={`Could not fetch user. ${message}`} />
    </div>
);