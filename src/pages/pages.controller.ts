import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PagesService } from './pages.service';
// import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { CreatePageDto } from './dto/create-page.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  public async create(@Res() res: any, @Body() createPageDto: CreatePageDto) {
    try {
      const page = await this.pagesService.create(createPageDto);
      return res.status(HttpStatus.OK).json({
        message: 'Page has been created successfully',
        page,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Page not created!',
        status: 400,
      });
    }
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Patch(':id')
  public async update(
    @Res() res: any,
    @Param('id') id: number,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    try {
      const page = await this.pagesService.update(id, updatePageDto);
      if (!page) {
        throw new NotFoundException('Page does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Page has been successfully updated',
        page,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Page not updated!',
        status: 400,
      });
    }
  }

  @Delete(':id')
  public async remove(@Res() res: any, @Param('id') id: number) {
    if (!id) {
      throw new NotFoundException('Page ID does not exist');
    }

    const page = await this.pagesService.remove(id);

    return res.status(HttpStatus.OK).json({
      message: 'Page has been deleted',
      page,
    });
  }
}
