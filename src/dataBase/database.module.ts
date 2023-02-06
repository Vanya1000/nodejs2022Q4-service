import { Global, Module } from '@nestjs/common';
import DB from 'src/utils/DB/DB';

@Global()
@Module({
  exports: [DB],
  controllers: [],
  providers: [DB],
})
export class DataBaseModule {}
