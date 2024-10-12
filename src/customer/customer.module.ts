import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
    imports: [SequelizeModule.forFeature([Customer])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule { }
