import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('api/transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get()
    getAllTransactions(@Query() query) {
        return this.transactionService.getAllTransactions(query);
    }

    @Post()
    createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.createTransaction(createTransactionDto);
    }

    @Put(':id')
    updateTransaction(@Param('id') id: number, @Body() updateData) {
        return this.transactionService.updateTransaction(id, updateData);
    }

    @Delete(':id')
    deleteTransaction(@Param('id') id: number) {
        return this.transactionService.deleteTransaction(id);
    }
}
