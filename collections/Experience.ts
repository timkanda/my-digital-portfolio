import type { CollectionConfig } from "payload"

export const Experience: CollectionConfig = {
  slug: "experience",
  admin: {
    useAsTitle: "position",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "current",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "technologies",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
        },
      ],
    },
  ],
}
