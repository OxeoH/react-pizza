import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import FullPizza from './FullPizza';
import Cart from '../pages/Cart';

import '../scss/app.scss';
import MainLayout from '../layouts/MainLayout';

//export const SearchContext = React.createContext();

const Main: React.FC = () =>{
    //const [searchValue, setSearchValue] = React.useState('');
    const errorMessage = "Упс...Ничего не найдено!";

    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<Home/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='pizza/:id' element={<FullPizza/>}/>
                <Route path='*' element={<NotFound errorMessage={errorMessage}/>}/>
            </Route>
        </Routes>
    )
}

export default Main;
