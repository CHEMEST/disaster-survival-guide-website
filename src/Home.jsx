import React from 'react';
import { useNavigate  } from 'react-router-dom';


function Home({ setActiveId }) {
    const navigate = useNavigate();

    const goToGuide = () => {
        setActiveId(2);
        navigate('/guide');
    };

    return (
        <div>
            <p>asdf</p>
        </div>
    )
}

export default Home;