import React from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import featuredImg from '../../assets/home/featured.jpg';
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item pt-8 my-20 bg-fixed'>
            <SectionTitle subHeading="Check it out" heading="Featured item"></SectionTitle>
            <div className='md:flex justify-center items-center bg-slate-500 bg-opacity-20 pb-20 pt-12 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className=' md:ml-10'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'> Where can i get Some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure possimus repellat quas, modi fugit corrupti delectus ipsum a laboriosam nisi consequuntur quam? Fugiat eligendi, iste perferendis, nam reiciendis nisi consectetur cupiditate adipisci quam cumque quia dolore blanditiis quibusdam in asperiores perspiciatis repellat amet fuga illum? Maxime ipsam provident nesciunt odio!</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>

                </div>
            </div>
        </div>
    );
};

export default Featured;