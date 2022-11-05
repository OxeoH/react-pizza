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
import { fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice';
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

    // //          Effects
    // React.useEffect(() => {
    //     if(window.location.search){
    //         const filterParams = qs.parse(window.location.search.substring(1));
    //         const sortObj = sorts.find(sort => sort.sortType === filterParams.sortType);
    //         //dispatch(setFilterParams(...filterParams, sortObj));
    //     }
    // }, []);

    const getPizzas = async() =>{
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        
        dispatch(fetchPizzas({category, search, sortType: sort.sortType, currentPage}));
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

    return (
        <div className='container'>
            <div className="content__top">
                <Categories activeId={categoryId} onCategoryClick={(activeIndex: number) => dispatch(setCategoryId(activeIndex))}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (<NotFoundBlock errorMessage={errorText}/>) : (<><div className="content__items">
                {
                    status === "loading" ? itemsSkeletons : items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza}/>)
                }
            </div><Pagination currentPage={currentPage} onChangePage={onChangePage}/></>)}
            
        </div>
    )
}

export default Home;