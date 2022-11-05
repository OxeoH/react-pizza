import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { filterSortSelector, setActiveSort } from "../redux/slices/filterSlice"


import { SortItem } from "../redux/slices/filterSlice";

export const sorts: SortItem[] = [{name: "популярности", sortType: "rating"},
{name: "цене", sortType: "price"},
{name: "алфавиту", sortType: "title"}];

const Sort: React.FC = () => {
    const [listVisibility, setListVisibility] = React.useState<Boolean>(false);

    const activeSortObj: SortItem = useSelector(filterSortSelector);
    const dispatch = useDispatch();
    
    const onSortChoose = (obj: SortItem) =>{
        dispatch(setActiveSort(obj));
        setListVisibility(false);
    }
    const sortRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const onOutsideClick = (event: any) =>{
            if(!event.composedPath().includes(sortRef.current)){
                setListVisibility(false);
            }
        };

        document.body.addEventListener('click', onOutsideClick);

        return () => document.body.removeEventListener('click', onOutsideClick);
    }, []);
    
    return(
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setListVisibility(!listVisibility)}>{activeSortObj.name}</span>
            </div>
            {listVisibility && (
            <div className="sort__popup">
                <ul>
                    {sorts.map((sortObj, index) => 
                    (<li key={index} onClick={() => onSortChoose(sortObj)} className={activeSortObj.sortType === sortObj.sortType ? 'active' : ''}>{sortObj.name}</li>))}
                </ul>
            </div>)}
            
        </div>
    )
}

export default Sort;