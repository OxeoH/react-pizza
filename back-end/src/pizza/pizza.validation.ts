import { PizzaParams} from "./pizza.types";

enum payMethods{
    byCard = "card",
    byCash = "cash"
}

class PizzaValidator{
    urlMask: string
    typesMask: number[]
    sizesMask: number[]

    constructor(){
        this.urlMask = 'https://dodopizza.azureedge.net/'
        this.sizesMask = [26, 30, 40]
        this.typesMask = [0, 1] 
    }

    public validatePizzaParams(params:PizzaParams) {
        const {imageUrl, title, types, sizes, price, category, rating} = params
        
        return (
            this.validateIsNotEmpty(params) 
            && this.validateImageUrl(imageUrl, this.urlMask)  
            && this.validateTitleLength(title) 
            && this.validatePizzasParamsArray(types, this.typesMask)  
            && this.validatePizzasParamsArray(sizes, this.sizesMask)  
            && this.validatePriceLength(price)  
            && this.validateRange(category, 0, 5)
            && this.validateRange(rating, 1, 10)
            ) ? true : false
    }

    public validateRange(category: number, start: number, finish: number){
        return category >= start && category <= finish ? true : false
    }

    public validatePizzasParamsArray(array: number[], maskArray: number[]){
        let counter = 0
        for(let value in array){
            if(maskArray.includes(+array[value])) counter++
        }

        return counter === array.length ? true : false
    }

    public validateImageUrl(img: string, mask: string){
        return img.indexOf(mask) !== -1 ? true : false
    }

    public validatePriceLength(value: number){
        return value.toString().length >= 3 && value.toString().length <= 4 ? true : false
    }

    public validateIsNotEmpty({...fields}){
        let counter = 0
        for(let prop in fields){
            if(fields[prop] !== "" && fields[prop].toString().length > 0) counter++
        }
        return counter === Object.keys(fields).length ? true : false
    }
    public validateTitleLength(title: string){
        return title.length >= 5 && title.length <= 30 ? true : false
    }
}

export default PizzaValidator