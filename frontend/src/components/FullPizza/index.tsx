import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./FullPizza.module.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotFoundBlock from '../NotFoundBlock/';

interface IFullPizza{
    imageUrl: string,
    title: string,
    price: number,
}

const FullPizza: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [fullPizza, setFullPizza] = React.useState<IFullPizza>();
    const errorMessage = "Ошибка 404: Не удалось загрузить информацию!";

    React.useEffect(() => {
        async function getFullPizza(){
            try{
                const {data} = await axios.get(`https://6348936e0b382d796c73f4b1.mockapi.io/pizzas/${params.id}`)
                setFullPizza(data);
            }catch(error){
                setTimeout(() => navigate('/'), 3000);
            }
        }
        

        getFullPizza();
    }, [])

  return !fullPizza ? (<NotFoundBlock errorMessage={errorMessage}></NotFoundBlock>) : (
    <div className='container'>
        <ul className={styles.root}>
            <li className={styles.rootChild}>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src={fullPizza.imageUrl} alt="Pizza Image" />
                </div>
            </li>
            <li className={styles.rootChild}>
                <h2 className={styles.title}>{fullPizza.title}</h2>
            </li>
            <li className={styles.rootChild}>
                <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nihil non illum placeat reprehenderit nobis consequatur at dolor nam? Quo nisi itaque tempore facere nihil voluptatibus facilis debitis exercitationem earum.</div>
            </li>
            <li className={styles.rootChild}>
                <div className={styles.price}>Цена: от <strong>{fullPizza.price}</strong> ₽</div>
            </li>
            <li className={styles.rootChild}>
                <Link to="/" className="button button--black">
                    <span>Вернуться назад</span>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default FullPizza