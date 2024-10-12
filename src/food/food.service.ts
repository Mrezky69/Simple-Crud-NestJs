import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Food } from './food.model';
import { Op } from 'sequelize';
import { CreateFoodDto } from './dto/create-food.dto';

@Injectable()
export class FoodService {
    constructor(@InjectModel(Food) private foodModel: typeof Food) { }

    async getFoods(){
        const res = await this.foodModel.findAll();
        return {
            message: "success",
            data: res,
        };        
    }

    async getAllFoods(query) {
        const { search, page = '1', limit = '10' } = query;
        const searchNumber = parseFloat(search);
        const whereClause = search
            ? {
                [Op.or]: [
                    { food_name: { [Op.like]: `%${search}%` } },
                    ...(isNaN(searchNumber)
                        ? []
                        : [
                            { price: { [Op.eq]: searchNumber } },
                            { stock: { [Op.eq]: searchNumber } },
                        ]),
                ],
            }
            : {};

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const { count, rows } = await this.foodModel.findAndCountAll({
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


    async createFood(createFoodDto: CreateFoodDto) {
        return this.foodModel.create({
            ...createFoodDto,
        } as any);
    }

    async updateFood(id: number, updateData) {
        const [updated] = await this.foodModel.update(updateData, {
            where: { food_id: id },
        });

        if (updated) {
            return this.foodModel.findOne({ where: { food_id: id } });
        }

        return null;
    }

    async deleteFood(id: number) {
        const deleted = await this.foodModel.destroy({
            where: { food_id: id },
        });

        return deleted;
    }
}
