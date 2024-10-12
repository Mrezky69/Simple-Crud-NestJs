import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'foods', timestamps: false })
export class Food extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    food_id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    food_name: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    stock: number;
}
