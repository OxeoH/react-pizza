import { CreateOrderParams } from "./order.types";

enum payMethods{
    byCard = "card",
    byCash = "cash"
}

class OrderValidator{
    phoneMasks: string[]

    constructor(){
        this.phoneMasks = ["37529", "37533"]
    }

    public validateOrderParams(params:CreateOrderParams) {
        const {name, phone, address, description, paymentType} = params

        return (this.validatePhone(phone) && this.validatePaymentType(paymentType)
        && this.validateStringLength(address) && this.validateStringLength(description) 
        && this.validateIsNotEmpty({name, phone, address, description})) ? true : false
    }

    public validatePhone(phone: string){//
        let counter = 0
        for(let mask in this.phoneMasks){
            if(phone.indexOf(this.phoneMasks[mask]) !== -1){
                counter++
            }
        }

        return counter > 0 ? true : false
    }

    public validatePaymentType(type: string){//
        return (type.toLowerCase() === payMethods.byCard || type.toLowerCase() === payMethods.byCash) ? true : false
    }

    public validateStringLength(text: string){//
        return text.length >= 20 ? true : false
    }

    public validateIsNotEmpty({...fields}){//
        let counter = 0
        for(let prop in fields){
            if(fields[prop] !== "" && fields[prop].toString().length > 0) counter++
        }
        return counter === Object.keys(fields).length ? true : false
    }
}

export default OrderValidator
