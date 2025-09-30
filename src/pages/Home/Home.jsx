// import React, { useEffect, useState } from 'react';
import Featured from '../Featured/Featured';
import DynamicTitle from '../Shared/DynamicTitle/DynamicTitle';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import PopularMenu from './PopularManu/PopularMenu';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {

    return (
        <div>
            <DynamicTitle title={" Home"}></DynamicTitle>

            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;