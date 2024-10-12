import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';

@Controller('api/foods')
export class FoodController {
    constructor(private readonly foodService: FoodService) { }

    @Get('/all')
    getFoods(){
        return this.foodService.getFoods();
    }

    @Get()
    getAllFoods(@Query() query) {
        return this.foodService.getAllFoods(query);
    }

    @Post()
    createFood(@Body() createFoodDto: CreateFoodDto) {
        return this.foodService.createFood(createFoodDto);
    }

    @Put(':id')
    updateFood(@Param('id') id: number, @Body() updateData) {
        return this.foodService.updateFood(id, updateData);
    }

    @Delete(':id')
    deleteFood(@Param('id') id: number) {
        return this.foodService.deleteFood(id);
    }
}
