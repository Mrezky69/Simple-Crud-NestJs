import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { Customer } from '../customer/customer.model';
import { Food } from '../food/food.model';
import { Op } from 'sequelize';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction) private transactionModel: typeof Transaction) { }

    async getAllTransactions(query) {
        const { search, page = '1', limit = '10', customer_id, food_id, transaction_date } = query;

        let whereClause = {};

        if (customer_id) whereClause['customer_id'] = customer_id;
        if (food_id) whereClause['food_id'] = food_id;
        if (transaction_date) {
            whereClause['transaction_date'] = {
                [Op.eq]: new Date(transaction_date),
            };
        }

        if (search) {
            const searchNumber = parseFloat(search);
            if (!isNaN(searchNumber)) {
                whereClause = {
                    ...whereClause,
                    [Op.or]: [
                        { total_price: { [Op.eq]: searchNumber } },
                        { qty: { [Op.eq]: searchNumber } },
                    ],
                };
            } else {
                whereClause = {
                    ...whereClause,
                    [Op.or]: [
                        { '$customer.name$': { [Op.like]: `%${search}%` } },
                        { '$food.food_name$': { [Op.like]: `%${search}%` } },
                    ],
                };
            }
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const { count, rows } = await this.transactionModel.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: offset,
            include: [
                {
                    model: Customer,
                    attributes: ['name'],
                    as: 'customer',
                },
                {
                    model: Food,
                    attributes: ['food_name'],
                    as: 'food',
                },
            ],
        });

        return {
            totalItems: count,
            totalPages: Math.ceil(count / parseInt(limit)),
            currentPage: parseInt(page),
            data: rows,
        };
    }

    async createTransaction(createTransactionDto: CreateTransactionDto) {
        const food = await Food.findByPk(createTransactionDto.food_id);
        if (!food) {
            throw new Error('Food not found');
        }

        if (food.stock < createTransactionDto.qty) {
            throw new Error('Not enough stock');
        }

        food.stock -= createTransactionDto.qty;
        await food.save();

        return this.transactionModel.create({
            ...createTransactionDto,
        } as any);
    }

    async updateTransaction(id: number, updateData) {
        const transaction = await this.transactionModel.findByPk(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        const food = await Food.findByPk(transaction.food_id);
        if (!food) {
            throw new Error('Food not found');
        }

        food.stock += transaction.qty;  // restore stock
        await food.save();

        if (updateData.food_id && updateData.food_id !== transaction.food_id) {
            const newFood = await Food.findByPk(updateData.food_id);
            if (!newFood) {
                throw new Error('New food not found');
            }

            if (newFood.stock < updateData.qty) {
                throw new Error('Not enough stock for new food');
            }

            newFood.stock -= updateData.qty;
            await newFood.save();
        } else {
            if (food.stock < updateData.qty) {
                throw new Error('Not enough stock');
            }

            food.stock -= updateData.qty;
            await food.save();
        }

        await transaction.update(updateData);
        return transaction;
    }

    async deleteTransaction(id: number) {
        const transaction = await this.transactionModel.findByPk(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        const food = await Food.findByPk(transaction.food_id);
        if (!food) {
            throw new Error('Food not found');
        }

        food.stock += transaction.qty;
        await food.save();

        return this.transactionModel.destroy({ where: { transaction_id: id } });
    }
}
