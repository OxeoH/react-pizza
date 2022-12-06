import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux';
import { cartSelector } from '../../redux/slices/cartSlice';
import styles from './OrderWindow.module.scss'



const OrderWindow: React.FC<any> = ({setFormVisibility}) => {
    //Typization??????
    const [payMethod, setPayMethod] = React.useState<string>("card");
    const {totalPrice, items} = useSelector(cartSelector);

    const sendOrder = async () => {
        alert("Order Send")
    }

    React.useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {document.body.style.overflow = ''}
    },  [])

  return (
    <>
        <div className={styles.container} onClick={() => setFormVisibility(false)}>
            <div className={styles.wrapper} onClick={(event) => event.stopPropagation()}>
                <h2 className={styles.caption}>Заполните данные</h2>
                <ul className={styles.fields}>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Ваше имя</div>
                        <input type="text" className={styles.fieldInput} placeholder="Егор"/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Номер телефона</div>
                        <input className={styles.fieldInput} type="text" placeholder='+375(XX)123-45-67'/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Адрес доставки</div>
                        <textarea className={styles.address} placeholder='улица Сурганова 37/2, кв. 12'/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Комментарии к заказу</div>
                        <textarea className={styles.comment} placeholder="Побольше салфеток и побыстрее!"/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Выберите способ оплаты</div>
                        <ul className={styles.payments}>
                            <li className={payMethod === "card" ? styles.selected : styles.paymentType} onClick={() => setPayMethod("card")}>Картой курьеру</li>
                            <li className={payMethod === "cash" ? styles.selected : styles.paymentType} onClick={() => setPayMethod("cash")}>Наличными курьеру</li>
                        </ul>
                    </li>
                </ul>
                <div className={styles.bottom}>
                    <div className={styles.orderPrice}>Сумма заказа: <span>{totalPrice}</span> ₽</div>
                    <button className={styles.button} onClick={() => sendOrder()}>Заказать</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default OrderWindow
