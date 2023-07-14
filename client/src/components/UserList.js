import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, fetchUsers } from '../features/users/usersSlice';

const UserList = () => {

    const dispatch = useDispatch();
    const { users } = useSelector(state => state.users);

    // getting all, user
    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        };
    }, []);

    // confirmation before deleting user
    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        };
    };

    return (
        <div className='container'>
            <div>
                <Link to="/add" className="add-btn">
                    Add User
                </Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const { _id, name } = user;

                        return <tr key={_id}>
                            <td>{_id}</td>
                            <td>{name}</td>
                            <td>
                                <button>
                                    <Link to={`/details/${_id}`} className="link">
                                        View
                                    </Link>
                                </button>
                                <button>
                                    <Link to={`/edit/${_id}`} className="link">
                                        Edit
                                    </Link>
                                </button>
                                <button className='delete-btn' onClick={() => handleDelete(_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
