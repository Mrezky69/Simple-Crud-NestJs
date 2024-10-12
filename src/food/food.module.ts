import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './food.model';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';

@Module({
    imports: [SequelizeModule.forFeature([Food])],
    controllers: [FoodController],
    providers: [FoodService],
})
export class FoodModule { }
