import {defineField, defineType} from 'sanity'

/**
 * Portfolio projects for the Webrain agency site.
 * Type name is `projects` (plural) to match existing documents and GROQ queries.
 *
 * @type {import('sanity').SchemaTypeDefinition}
 */
export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'view',
      title: 'View Description',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'live',
      title: 'Live Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'view',
      media: 'mainImage',
    },
  },
})
