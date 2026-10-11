import author from './author'
import blockContent from './blockContent'
import category from './category'
import post from './post'
import projects from './projects'
import reviews from './reviews'

/**
 * Registered Sanity schema types for the Webrain content studio.
 * Document `_type` values must stay stable — the Next.js frontend queries them by name.
 *
 * @type {import('sanity').SchemaTypeDefinition[]}
 */
export const schemaTypes = [post, author, category, blockContent, projects, reviews]
