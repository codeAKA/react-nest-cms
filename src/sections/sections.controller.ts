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
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  public async create(
    @Res() res: any,
    @Body() createSectionDto: CreateSectionDto,
  ) {
    try {
      const customer = await this.sectionsService.create(createSectionDto);
      return res.status(HttpStatus.OK).json({
        message: 'Section has been created successfully',
        customer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Section not created!',
        status: 400,
      });
    }
  }

  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  // @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Res() res: any,
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    try {
      const section = await this.sectionsService.update(id, updateSectionDto);
      if (!section) {
        throw new NotFoundException('Section does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Section has been successfully updated',
        section,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Section not updated!',
        status: 400,
      });
    }
  }

  @Delete(':id')
  public async remove(@Res() res: any, @Param('id') id: string) {
    if (!id) {
      throw new NotFoundException('Section ID does not exist');
    }

    const section = await this.sectionsService.remove(id);

    return res.status(HttpStatus.OK).json({
      message: 'Section has been deleted',
      section,
    });
  }
}
