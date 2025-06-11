import { CollectionConfig } from 'payload';

const Home: CollectionConfig = {
  slug: 'home',
  admin: {
    useAsTitle: 'section_title',
  },
  fields: [
    {
      name: 'section_title',
      type: 'text',
      required: true,
    },
    {
      name: 'hero_text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'cta_label',
      type: 'text',
    },
    {
      name: 'cta_url',
      type: 'text',
    },
  ],
};