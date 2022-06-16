import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/articles/schemas/article.schema';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section, SectionDocument } from './schema/section.schema';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name)
    private readonly sectionModel: Model<SectionDocument>,
  ) {}

  public async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const section = await this.sectionModel.create(createSectionDto);
    // const section = new this.sectionModel(createSectionDto);
    // section.populate('articles');
    return section;
  }

  public async findAll(): Promise<Section[]> {
    // return this.sectionModel.find();
    return await this.sectionModel.find();
  }
  // Cannot populate path `article` because it is not in your schema. Set the `strictPopulate` option to false to override.
  public async findOne(id: string): Promise<Section> {
    const section = await this.sectionModel
      .findById({ _id: id })
      .populate('articles')
      .exec();

    if (!section) {
      throw new NotFoundException(`Section #${id} not found`);
    }

    return section;
  }

  public async update(id: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.sectionModel.findByIdAndUpdate(
      { _id: id },
      updateSectionDto,
    );

    if (!section) {
      throw new NotFoundException(`Section #${id} not found`);
    }

    return section;
  }

  public async remove(id: string): Promise<any> {
    const deletedSection = await this.sectionModel.findByIdAndRemove(id);
    return deletedSection;
  }
}
