import React from 'react';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';

const UserRoute = ({ children }) => {
    const { role } = useRole();


    if (role !== 'user') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default UserRoute;