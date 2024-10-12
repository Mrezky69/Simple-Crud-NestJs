import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './customer.model';
import { Op } from 'sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer) private customerModel: typeof Customer) { }

    async getCustomers() {
        const res = await this.customerModel.findAll();
        return {
            message: "success",
            data: res,
        };        
    }

    async getAllCustomers(query) {
        const { search, page = '1', limit = '10' } = query;

        const whereClause = search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { phone: { [Op.like]: `%${search}%` } },
                    { address: { [Op.like]: `%${search}%` } },
                ],
            }
            : {};

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const { count, rows } = await this.customerModel.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: offset,
        });

        return {
            totalItems: count,
            totalPages: Math.ceil(count / parseInt(limit)),
            currentPage: parseInt(page),
            data: rows,
        };
    }

    async createCustomer(createCustomerDto: CreateCustomerDto) {
        return this.customerModel.create({
            ...createCustomerDto,
        } as any);
    }

    async updateCustomer(id: number, updateData) {
        const [updated] = await this.customerModel.update(updateData, {
            where: { customer_id: id },
        });

        if (updated) {
            return this.customerModel.findOne({ where: { customer_id: id } });
        }

        return null;
    }

    async deleteCustomer(id: number) {
        const deleted = await this.customerModel.destroy({
            where: { customer_id: id },
        });

        return deleted;
    }
}
