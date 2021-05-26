import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
