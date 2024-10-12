import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('api/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('/all')
    getCustomers() {
        return this.customerService.getCustomers();
    }

    @Get()
    getAllCustomers(@Query() query) {
        return this.customerService.getAllCustomers(query);
    }

    @Post()
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @Put(':id')
    updateCustomer(@Param('id') id: number, @Body() updateData) {
        return this.customerService.updateCustomer(id, updateData);
    }

    @Delete(':id')
    deleteCustomer(@Param('id') id: number) {
        return this.customerService.deleteCustomer(id);
    }
}
