import React from 'react';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';

const AdminRoute = ({ children }) => {
    const { role } = useRole();


    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;