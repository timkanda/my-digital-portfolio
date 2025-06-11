import type { CollectionConfig } from "payload"

export const About: CollectionConfig = {
  slug: "about",
  admin: {
    useAsTitle: "section",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "section",
      type: "select",
      options: [
        { label: "Hero Section", value: "hero" },
        { label: "Bio", value: "bio" },
        { label: "Skills", value: "skills" },
        { label: "Experience", value: "experience" },
        { label: "Education", value: "education" },
      ],
      required: true,
      unique: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
}
