import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModule } from './customer/customer.module';
import { FoodModule } from './food/food.module';
import { TransactionModule } from './transaction/transaction.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    CustomerModule,
    FoodModule,
    TransactionModule,
  ],
})
export class AppModule { }
