import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Customer } from '../customer/customer.model';
import { Food } from '../food/food.model';

@Module({
    imports: [SequelizeModule.forFeature([Transaction, Customer, Food])],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule { }
