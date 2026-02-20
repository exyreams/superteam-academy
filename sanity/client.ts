import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-me-123',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-20', // Use the current date for the latest API version
  useCdn: process.env.NODE_ENV === 'production', // Use edge cache in production
})

// Common GROQ Queries
export const ALL_COURSES_QUERY = `
  *[_type == "course"] {
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    difficulty,
    track_id,
    track_level,
    xp_per_lesson,
    "moduleCount": count(modules)
  }
`

export const COURSE_BY_SLUG_QUERY = `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    difficulty,
    track_id,
    track_level,
    xp_per_lesson,
    creator_reward_xp,
    min_completions_for_reward,
    modules[]-> {
      _id,
      title,
      order,
      lessons[]-> {
        _id,
        title,
        type,
        content
      }
    }
  }
`
