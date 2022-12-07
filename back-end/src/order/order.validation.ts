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

    public validatePhone(phone: string){
        let counter = 0
        for(let mask in this.phoneMasks){
            if(phone.indexOf(this.phoneMasks[mask]) !== -1){
                counter++
            }
        }

        return counter > 0 ? true : false
    }

    public validatePaymentType(type: string){
        return (type === payMethods.byCard || type === payMethods.byCash) ? true : false
    }

    public validateStringLength(text: string){
        return text.length >= 20 ? true : false
    }

    public validateIsNotEmpty({...values}){
        let counter = 0
        for(let value in values){
            if(value !== "" && value.length > 0){
                counter++
            }
        }
        return counter === Object.keys(values).length ? true : false
    }
}

export default OrderValidator
