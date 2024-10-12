import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'customers', timestamps: false })
export class Customer extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    customer_id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING })
    phone: string;

    @Column({ type: DataType.STRING })
    address: string;
}
