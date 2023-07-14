import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser } from '../features/users/usersSlice';

const UserDetails = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.users);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // getting user by id if user with same id is not available on the state
    useEffect(() => {
        if (id && user?._id !== id) {
            dispatch(fetchUser(id));
        };
    }, [id]);

    // navigating back to home
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className='container'>
            <h2>User Details</h2>
            {user ? (
                <table className="view-table">
                    <tbody>
                        <tr>
                            <th>ID:</th>
                            <td>{user._id}</td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th>Phone:</th>
                            <td>{user.phone}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading user details...</p>
            )}
            <button className="" onClick={handleBack}>
                Back
            </button>
        </div>
    );
};

export default UserDetails;
