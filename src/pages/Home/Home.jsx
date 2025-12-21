import React from 'react';
import Banner from './Banner';
import PopularContest from './PopularContest';
import Winner from './Winner';

const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularContest/>
            <Winner/>
        </div>
    );
};

export default Home;