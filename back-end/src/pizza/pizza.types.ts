

export interface PizzaParams{
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}

export type RequestProps = {
    page: string,
    limit: string,
    category: string,
    search: string,
    order: string,
    sortBy: string
}