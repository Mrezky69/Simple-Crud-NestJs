export class CreateTransactionDto {
    customer_id: number;
    food_id: number;
    qty: number;
    total_price: number;
    transaction_date: Date;
}
