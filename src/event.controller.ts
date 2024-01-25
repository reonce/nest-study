import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { Event } from './event.entity'
import { Repository } from 'typeorm';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];
  constructor(
    private readonly respository: Repository<Event>
  ) {}

  @Get()
  findAll() { 
    return this.events
  }
  @Get(':id')
  findOne(@Param('id') id) {
    const event = this.events.find(event => event.id === +id)
    return event
  }
  @Post()
  create(@Body() input: Event) { 
    const event = {
      ...input,
      when: new Date(),
      id: this.events.length + 1
    }
    this.events.push(event)
    return event
  }
  @Patch(':id') 
  update(@Param('id') id, @Body() input: Event) { 
    const index = this.events.findIndex(event => event.id === +input.id)
    this.events[index] = {
      ...this.events[index],
      ...input,
      when: new Date(),
    }
    return this.events[index]
  }
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) { 
    this.events = this.events.filter(event => event.id === +id);
  }
}
