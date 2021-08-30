import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfilePage(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        }
        else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Password and Comfirm Password Are Not Matched');
        }
        else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                { loading ? <LoadingBox></LoadingBox> : 
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                <>
                    { loadingUpdate && (<LoadingBox></LoadingBox>) }
                    { errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>) }
                    { successUpdate && (<MessageBox variant="success">Profile Update Successfully</MessageBox>) }
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                            id="name" 
                            placeholder="Enter Name" 
                            value={name} 
                            onChange={ (e) => setName(e.target.value) }>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                            id="email" 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={ (e) => setEmail(e.target.value) }>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="pasword">Password</label>
                        <input type="password" 
                            id="password" 
                            placeholder="Enter Password"
                            onChange={ (e) => setPassword(e.target.value) }>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" 
                            id="confirmPassword" 
                            placeholder="Enter Confirm Password"
                            onChange={ (e) => setConfirmPassword(e.target.value) }>
                        </input>
                    </div>
                    <div>
                        <label></label>
                        <button className="primary" type="submit">
                            Update & Save
                        </button>
                    </div>
                </>
                }
            </form>
        </div>
    );
}