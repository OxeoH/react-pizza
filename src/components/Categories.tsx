import React from "react";


type CategoryProps ={
    activeId: number, 
    onCategoryClick: any
}

const Categories: React.FC<CategoryProps> = ({activeId, onCategoryClick}) =>{
    let categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

    return(
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => onCategoryClick(index)} className={activeId === index ? "active" : ""}>{category}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;