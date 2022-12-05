//          Libs
import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

//       Components
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton"
import Pagination from '../components/Pagination';

//       Constants
//import { sorts } from '../components/Sort';

//       Contexts
//import { SearchContext } from '../components/Main';

//       Redux
import { useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, filterSelector } from '../redux/slices/filterSlice'; //setFilterParams
import { fetchPizzas, PizzaItemSlice, pizzasSelector } from '../redux/slices/pizzasSlice';
import NotFoundBlock from '../components/NotFoundBlock';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () =>{
    //          Redux
    const { items, status } = useSelector(pizzasSelector);
    const {categoryId, sort, currentPage, searchValue} = useSelector(filterSelector);
    const dispatch = useAppDispatch();
    
    //          States
    //const [pizzas, setPizzas] = React.useState([]);

    //          Contexts
    // const {searchValue} = React.useContext(SearchContext);

    //          Constants
    const itemsSkeletons = [...new Array(10)].map((_, index) => <PizzaSkeleton key={index}/>);
    
    const navigate = useNavigate();

    //          Funcs
    const onChangePage = (num: number) =>{
        dispatch(setCurrentPage(num));
    }

    const getPizzas = async() =>{
        dispatch(fetchPizzas({categoryId, searchValue, sortType: sort.sortType, currentPage}));
    }



    React.useEffect(() => {
        getPizzas();
        
        window.scrollTo(0, 100);
    }, [categoryId, sort.sortType, searchValue, currentPage]);
    




    React.useEffect(() => {
        const query = qs.stringify({
            sortType: sort.sortType,
            categoryId,
            currentPage
        });
        
        navigate(`?${query}`);

    }, [categoryId, sort.sortType, searchValue, currentPage]);
    


    const errorText = "Упс... Не удалось загрузить товары. Попробуйте позже!)"
    const notFoundText = "Упс... Такое не готовим("

    return (
        <div className='container'>
            <div className="content__top">
                <Categories activeId={categoryId} onCategoryClick={(activeIndex: number) => dispatch(setCategoryId(activeIndex))}/>
                <Sort />
            </div>
            
            <h2 className="content__title">Все пиццы</h2>
            {   
                status === "error" ? (<NotFoundBlock errorMessage={errorText}/>) : (<><div className="content__items">
                {
                    status === "loading" ? itemsSkeletons : items.map((pizza: PizzaItemSlice) => <PizzaBlock key={pizza.id} {...pizza}/>)
                }
                </div>
                {
                    items.length === 0 && (<NotFoundBlock errorMessage={notFoundText}/>)
                }
                <Pagination currentPage={currentPage} onChangePage={onChangePage}/></>)
            }
        </div>
    )
}

export default Home;