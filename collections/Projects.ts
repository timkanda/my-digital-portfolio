import type { CollectionConfig } from "payload"

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "featured", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
    {
      name: "technologies",
      type: "array",
      required: true,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "category",
          type: "select",
          options: [
            { label: "Frontend", value: "frontend" },
            { label: "Backend", value: "backend" },
            { label: "Database", value: "database" },
            { label: "DevOps", value: "devops" },
            { label: "Design", value: "design" },
          ],
        },
      ],
    },
    {
      name: "links",
      type: "group",
      fields: [
        {
          name: "live",
          type: "text",
        },
        {
          name: "github",
          type: "text",
        },
        {
          name: "caseStudy",
          type: "text",
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Web Application", value: "web-app" },
        { label: "Mobile App", value: "mobile" },
        { label: "API/Backend", value: "backend" },
        { label: "Open Source", value: "open-source" },
        { label: "Client Work", value: "client" },
      ],
      required: true,
    },
  ],
}
