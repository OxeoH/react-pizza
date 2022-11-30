import React from 'react'
import NotFoundBlock from '../components/NotFoundBlock/index'


type ErrorMessage ={
    errorMessage: string;
}

const NotFound: React.FC<ErrorMessage> = ({errorMessage}) => {
    return (
        <NotFoundBlock errorMessage={errorMessage}/>
    )
}

export default NotFound;