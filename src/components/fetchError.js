import React from 'react';

export const FetchError = ({ message }) => (
    <div>
        <p>Could not fetch user. {message}</p>
    </div>
);