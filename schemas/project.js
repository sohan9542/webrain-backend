import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    {
      name: 'view',
      type: 'string',
      title: 'View Description',
    },
    {
      name: 'desc',
      type: 'string',
      title: 'Description',
    },
    {
      name: 'live',
      type: 'string',
      title: 'Live Link',
    },
  ],
})
