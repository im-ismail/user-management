import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, fetchUser } from '../features/users/usersSlice';

const UserForm = () => {

    const { id } = useParams();
    const { user } = useSelector(state => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const { name, email, phone } = userData;

    // handling user input
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // adding and updating user
    const handleSubmit = e => {
        e.preventDefault();
        if (id) {
            dispatch(updateUser({ id, userData }));
        } else {
            dispatch(createUser(userData));
        };
        navigate('/');
    };

    // getting user by id if user with same id is not available on the state
    useEffect(() => {
        if (id && id !== user?._id) {
            dispatch(fetchUser(id));
        }
    }, [id]);

    // setting user details to local state for updating
    useEffect(() => {
        if (user && id) {
            setUserData({
                name: user.name,
                email: user.email,
                phone: user.phone
            })
        };
    }, [user]);

    return (
        <div className='container'>
            <div className='form-container'>
                <h2 className='form-heading'>{id ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="text"
                            className="form-control"
                            name='phone'
                            value={phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='button'>
                        <button type="submit" className="btn btn-primary">
                            {id ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
