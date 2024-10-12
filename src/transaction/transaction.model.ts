import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from '../customer/customer.model';
import { Food } from '../food/food.model';

@Table({ tableName: 'transactions', timestamps: false })
export class Transaction extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    transaction_id: number;

    @ForeignKey(() => Customer)
    @Column({ type: DataType.INTEGER, allowNull: false })
    customer_id: number;

    @ForeignKey(() => Food)
    @Column({ type: DataType.INTEGER, allowNull: false })
    food_id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    qty: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    total_price: number;

    @Column({ type: DataType.DATE, allowNull: false })
    transaction_date: Date;

    @BelongsTo(() => Customer, { as: 'customer' })
    customer: Customer;

    @BelongsTo(() => Food, { as: 'food' })
    food: Food;
}
