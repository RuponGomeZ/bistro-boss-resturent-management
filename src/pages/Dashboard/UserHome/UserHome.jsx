import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const { user } = useAuth()
    console.log(user);
    return (
        <div>
            <h2 className="text-3xl flex gap-2">Hi, Welcome back!
                <div className='text-blue-400'>
                    {
                        user?.displayName ? user.displayName : user.email.split("@")[0]
                    }
                </div>
            </h2>
        </div>
    );
};

export default UserHome;