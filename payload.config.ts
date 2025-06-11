import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { Posts } from './collections/posts'
import { Media } from './collections/media'
import { About } from './collections/About'
import { Projects } from './collections/Projects'
import { Experience } from './collections/Experience'
//import AboutPage from './app/(frontend)/about/page'
//import HomePage from './app/(frontend)/page'


export default buildConfig({
  editor: lexicalEditor(),

  collections: [ Posts, Media, About, Projects, Experience
    // Add your collections here
  ],

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  
  sharp,

  cors: [
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    'https://my-digital-portfolio-3jj5.vercel.app/',
  ],
  csrf:[
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    'https://my-digital-portfolio-3jj5.vercel.app/',
  ],
});
