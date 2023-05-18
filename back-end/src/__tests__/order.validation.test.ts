import { CreateOrderParams } from '../order/order.types';
import OrderValidator from '../order/order.validation'
import PizzaValidator from '../pizza/pizza.validation';

const orderValidator = new OrderValidator();
const pizzaValidator = new PizzaValidator();

const goodOrderParams: CreateOrderParams = {
    name: "Egor",
    phone: "+375331234567",
    address: "Minsk, Surhanova 37/2, floor 5",
    description: "{Название: Пепперони, Тип: традиционная, Размер: 26, Количество: 1}",
    price: 400,
    paymentType: "card",
    comment: 'Побыстрее'
}

const badOrderParams: CreateOrderParams = {
    name: "Egor",
    phone: "+77777777",
    address: "Nikuda",
    description: "",
    price: -1000,
    paymentType: "money",
    comment: ""
}

describe("All order params validation", () => {
    test("Validate goodOrderParams test", () => {
        expect(orderValidator.validateOrderParams(goodOrderParams)).toBeTruthy()
    })

    test("Validate badOrderParams test", () => {
        expect(orderValidator.validateOrderParams(goodOrderParams)).toBeFalsy()
    })

})

describe("Testing order params string length validator", () => {
    test("Testing bad order description", () => {
        expect(orderValidator.validateStringLength(badOrderParams.description)).toBeFalsy()
    })

    test("Testing good order description", () => {
        expect(orderValidator.validateStringLength(goodOrderParams.description)).toBeTruthy()
    })

    test("Testing bad order address", () => {
        expect(orderValidator.validateStringLength(badOrderParams.address)).toBeFalsy()
    })

    test("Testing good order address", () => {
        expect(orderValidator.validateStringLength(goodOrderParams.address)).toBeTruthy()
    })
})

describe("Testing isNotEmpty order validator", () => {
    test("Testing order params with empty fields", () => {
        expect(orderValidator.validateIsNotEmpty(badOrderParams)).toBeFalsy()
    })

    test("Testing fullfilled order params", () => {
        expect(orderValidator.validateIsNotEmpty(goodOrderParams)).toBeTruthy()
    })
})

describe("Testing order pay methods", () => {
    test("Testing bad lowercase pay method", () => {
        expect(orderValidator.validatePaymentType(badOrderParams.paymentType)).toBeFalsy()
    })

    test("Testing bad uppercase pay method", () => {
        expect(orderValidator.validatePaymentType(badOrderParams.paymentType.toUpperCase())).toBeFalsy()
    })

    test("Testing good lowercase pay method", () => {
        expect(orderValidator.validatePaymentType(goodOrderParams.paymentType)).toBeTruthy()
    })

    test("Testing good uppercase pay method", () => {
        expect(orderValidator.validatePaymentType(goodOrderParams.paymentType.toUpperCase())).toBeTruthy()
    })
})

describe("Testing order phones mask validator", () => {
    test("Testing phone string with mess", () => {
        expect(orderValidator.validatePhone("https://hello-world")).toBeFalsy()
    })

    test("Testing phone string with unknown mask", () => {
        expect(orderValidator.validatePhone("+712312322")).toBeFalsy()
    })

    test("Testing phone string with +37529 mask", () => {
        expect(orderValidator.validatePhone("+375291234567")).toBeTruthy()
    })

    test("Testing phone string with +37533 mask", () => {
        expect(orderValidator.validatePhone("+375331234567")).toBeTruthy()
    })
})

describe("Integration tests", () => {
    const goodTestUrl = "https://www.google.com/"
    const badTestUrl = "https://"

    test("Testing good url for mask by PizzaValidator then for length by OrderValidator", () => {
        expect(orderValidator.validateStringLength(pizzaValidator.validateImageUrl(goodTestUrl, "https://") ? goodTestUrl : "")).toBeTruthy()
    })

    test("Testing bad url for mask by PizzaValidator then for length by OrderValidator", () => {
        expect(orderValidator.validateStringLength(pizzaValidator.validateImageUrl(badTestUrl, "https://") ? badTestUrl : "")).toBeFalsy()
    })
})