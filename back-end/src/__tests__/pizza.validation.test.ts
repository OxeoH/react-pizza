import PizzaValidator from "../pizza/pizza.validation"

const pizzaValidator = new PizzaValidator();

const goodPizzaParams = {
    id: 1,
    imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg",
    title: "Пепперони Фреш с перцем",
    types: [
     0,
     1
    ],
    sizes: [
     26,
     30,
     40
    ],
    price: 803,
    category: 1,
    rating: 4
   }

const badPizzaParams = {
    id: 1,
    imageUrl: "",
    title: "",
    types: [
        0,
        1,
        2,
        3,
        4
    ],
    sizes: [
        50,
        15,
        23
    ],
    price: 80808,
    category: 9999,
    rating: 20
}

describe("All params validation", () => {
    test("validatePizzaParams goodParams test", () => {
        expect(pizzaValidator.validatePizzaParams(goodPizzaParams)).toBeTruthy()
    })

    test("validatePizzaParams badParams test", () => {
        expect(pizzaValidator.validatePizzaParams(badPizzaParams)).toBeFalsy()
    })

})

describe("Testing pizza params length validators", () => {
    test("Testing price more that can be", () => {
        expect(pizzaValidator.validatePriceLength(badPizzaParams.price)).toBeFalsy()
    })

    test("Testing good price", () => {
        expect(pizzaValidator.validatePriceLength(goodPizzaParams.price)).toBeTruthy()
    })

    test("Testing title length in range", () => {
        expect(pizzaValidator.validateTitleLength(goodPizzaParams.title)).toBeTruthy()
    })

    test("Testing title out of range", () => {
        expect(pizzaValidator.validateTitleLength(badPizzaParams.title)).toBeFalsy()
    })
})

describe("Testing pizza params values range validator", () => {
    test("Value in range", () => {
        expect(pizzaValidator.validateRange(10, 10, 20)).toBeTruthy()
        expect(pizzaValidator.validateRange(15, 10, 20)).toBeTruthy()
        expect(pizzaValidator.validateRange(20, 10, 20)).toBeTruthy()
    })

    test("Value out of range", () => {
        expect(pizzaValidator.validateRange(9, 10, 20)).toBeFalsy()
        expect(pizzaValidator.validateRange(-1, 10, 20)).toBeFalsy()
        expect(pizzaValidator.validateRange(21, 10, 20)).toBeFalsy()
    })
})

describe("Testing isNotEmpty pizza validator", () => {
    test("Testing params with empty fields", () => {
        expect(pizzaValidator.validateIsNotEmpty(badPizzaParams)).toBeFalsy()
    })

    test("Testing fullfilled params", () => {
        expect(pizzaValidator.validateIsNotEmpty(goodPizzaParams)).toBeTruthy()
    })
})

describe("Testing array from pizza params validator", () => {
    test("Testing array validation with bad array", () => {
        expect(pizzaValidator.validatePizzasParamsArray([4, 0, 4], [1,2,3])).toBeFalsy()
    })

    test("Testing array validation with good array different sizes", () => {
        expect(pizzaValidator.validatePizzasParamsArray([5, 8], [1, 2, 3])).toBeFalsy()
    })

    test("Testing array validation with good array", () => {
        expect(pizzaValidator.validatePizzasParamsArray([1, 2], [1, 2, 3])).toBeTruthy()
    })

    test("Testing array validation with good array different sizes", () => {
        expect(pizzaValidator.validatePizzasParamsArray([1, 2], [1, 2, 3])).toBeTruthy()
    })
})

describe("Testing pizza params strings mask validator", () => {
    test("Testing url string without .com", () => {
        expect(pizzaValidator.validateImageUrl("https://hello-world", ".com")).toBeFalsy()
    })

    test("Testing bad string validation by searching one symbol", () => {
        expect(pizzaValidator.validateImageUrl("egor#gmail.com", "@")).toBeFalsy()
    })

    test("Testing good string validation by searching one symbol", () => {
        expect(pizzaValidator.validateImageUrl("egor@gmail.com", "@")).toBeTruthy()
    })

    test("Testing good string for pattern", () => {
        expect(pizzaValidator.validateImageUrl("/Pizza/BigSize/id=7", "/Pizza/BigSize/")).toBeTruthy()
    })
})