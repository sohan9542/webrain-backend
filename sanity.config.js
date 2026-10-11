import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

/**
 * Sanity Studio config for Webrain content.
 * Project ID and dataset default to the production Webrain project; override via env for local forks.
 */
export default defineConfig({
  name: 'default',
  title: 'Webrain',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'rkvjq0qa',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
