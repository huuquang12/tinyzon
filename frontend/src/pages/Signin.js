import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
 

export default function Signin(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const redirect = props.location.search ? 
        props.location.search.split('=')[1] : 
        '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }


    return (
        <div className="form-signin"> 
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h1>Sign in</h1>
                    </li>
                    <li>
                        { loading && <LoadingBox></LoadingBox>} 
                        { error && <MessageBox variant="danger">{error}</MessageBox> }
                    </li>
                    <li>
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter email" 
                            required
                            onChange={ (e) => setEmail(e.target.value) }
                        ></input>
                     </li>
                     <li>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter password" 
                            required
                            onChange={ (e) => setPassword(e.target.value) }
                        ></input>
                    </li>
                    <li>
                    <label />
                        <button 
                            className="primary button" 
                            type="submit">
                                Sign in
                        </button>
                    </li>
                    <div>
                        <label />
                        <div>
                            New customer? { ' ' }
                            <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                        </div>
                    </div>
                </ul>
            </form>
        </div>
    )
}