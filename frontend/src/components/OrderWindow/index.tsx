import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { useSelector } from 'react-redux';
import { cartSelector } from '../../redux/slices/cartSlice';
import { pizzaTypes, pizzaSizes } from '../PizzaBlock';

import styles from './OrderWindow.module.scss'

type OrderInfo={
    description: string;
    name: string;
    phone: string;
    address: string;
    comment: string;
    price: number;
    paymentType: string;
}


const OrderWindow: React.FC<any> = ({setFormVisibility}) => {
    //Typization??????
    const [payMethod, setPayMethod] = React.useState<string>("card");
    const {totalPrice, items} = useSelector(cartSelector);

    const sendOrder = createAsyncThunk<OrderInfo, OrderInfo>('orders/createOrder', async (orderParams) =>{
        const {name, phone, address, comment, paymentType, price, description} = orderParams;
    
        const {data} = await axios.post<OrderInfo>(`http://localhost:8080/orders`,
        {params: {
            description,
            name,
            phone,
            address,
            comment,
            price,
            paymentType
        }});
        return data;
    });

    const createDescription = () =>{
        let description = ""
        description += items.map((item) => {
            return `{Название: ${item.title}, Тип: ${pizzaTypes[item.types]}, Размер: ${pizzaSizes[item.sizes]}, Количество: ${item.count}}, `
        })

        return description
    }

    React.useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {document.body.style.overflow = ''}
    },  [])

    const [form, setForm] = React.useState<OrderInfo>({
        description: createDescription(),
        name: "",
        phone: "",
        address: "",
        comment: "",
        price: totalPrice,
        paymentType: ""
    });


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const changePayMethod = (method: string) => {
        setPayMethod(method)
        setForm({...form, paymentType: method})
    }


    const createOrder = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        alert(JSON.stringify(form))
        try {
            await sendOrder(form)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    

  return (
    <>
        <div className={styles.container} onClick={() => setFormVisibility(false)}>
            <form className={styles.wrapper} onClick={(event) => event.stopPropagation()} onSubmit={(event) => createOrder(event)}>
                <h2 className={styles.caption}>Заполните данные</h2>
                <ul className={styles.fields}>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Ваше имя *</div>
                        <input id="name" type="text" className={styles.fieldInput} placeholder="Егор" onChange={(event)=>handleChange(event)}/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Номер телефона *</div>
                        <input id="phone" className={styles.fieldInput} type="text" placeholder='+375(XX)123-45-67' onChange={(event)=>handleChange(event)}/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Адрес доставки *</div>
                        <textarea id="address" className={styles.address} placeholder='улица Сурганова 37/2, кв. 12' onChange={(event)=>handleChange(event)}/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Комментарии к заказу</div>
                        <textarea id="comment" className={styles.comment} placeholder="Побольше салфеток и побыстрее!" onChange={(event)=>handleChange(event)}/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Выберите способ оплаты</div>
                        <ul className={styles.payments}>
                            <li className={payMethod === "card" ? styles.selected : styles.paymentType} onClick={() => changePayMethod("card")}>Картой курьеру</li>
                            <li className={payMethod === "cash" ? styles.selected : styles.paymentType} onClick={() => changePayMethod("cash")}>Наличными курьеру</li>
                        </ul>
                    </li>
                </ul>
                <div className={styles.bottom}>
                    <div className={styles.orderPrice}>Сумма заказа: <span>{totalPrice}</span> ₽</div>
                    <button type='submit' className={styles.button}>Заказать</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default OrderWindow
