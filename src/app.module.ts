import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { SectionsModule } from './sections/sections.module';
import { ArticlesModule } from './articles/articles.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PagesModule,
    SectionsModule,
    ArticlesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-api'),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
