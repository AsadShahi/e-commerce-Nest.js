import { Injectable, UploadedFile } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { ApiOperation } from '@nestjs/swagger';
import { StoryStatus } from './enum/storyStatusEnum';

@Injectable()
export class StoriesService {

  constructor(
    @InjectRepository(Story)
    private readonly serviceStory: Repository<Story>
  ){}

  async create(createStoryDto: CreateStoryDto, sellerId: number, image: any) {
    // Check if image exists
    if (!image) {
        throw new Error('Image file is missing');
    }

    
    // Create the story entity
    const story = this.serviceStory.create({
        ...createStoryDto,
        sellerId,
        imageUrl: `http://localhost:5000/public/uploads/story/${image.filename}`, // Construct image URL
        status: StoryStatus.PENDING,
    });

    // Save the story entity to the database
    const savedStory = await this.serviceStory.save(story);

   

    // Return the saved story
    return savedStory;
}
  
  
 async findAll() {
  return  await  this.serviceStory.find()
   
  }

  
  async getAllApprovedStories(): Promise<Story[]> {
    return await this.serviceStory.find({ where: { status: StoryStatus.APPROVED }, relations: ['seller'] });
  }


  async getPendingStories(): Promise<Story[]> {
    return await this.serviceStory.find({ where: { status: StoryStatus.PENDING }, relations: ['seller'] });
  }

 async approveStory(id: number): Promise<Story> {
    const story = await this.serviceStory.findOne({ where: { id } });
    if (!story) throw new Error('Story not found');
    story.status = StoryStatus.APPROVED;
    return await this.serviceStory.save(story);
  }

  
  findOne(id: number) {

    return this.serviceStory.find()
    
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
