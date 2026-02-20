import { defineField, defineType } from 'sanity'

export const lessonType = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Lesson Title', type: 'string' }),
    defineField({ 
      name: 'type', 
      title: 'Lesson Type', 
      type: 'string', 
      options: { list: ['reading', 'challenge'] } 
    }),
    defineField({ 
      name: 'content', 
      title: 'Curriculum Content', 
      type: 'array', 
      of: [
        { type: 'block' },
        { 
          type: 'image',
          fields: [{ type: 'string', name: 'alt', title: 'Alt text' }]
        },
      ] 
    }),
  ]
})
