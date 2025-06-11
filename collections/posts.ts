import { CollectionConfig } from "payload"



export const Posts: CollectionConfig = {
  slug: "blog_posts",
    admin: {
        group: "Posts",
        useAsTitle: "title",
    },
    fields: [
        {
        name: "title",
        type: "text",
        required: true,
        },
        /*
        {
        name: "content",
        type: "richText",
        required: true,
        },
        {
        name: "author",
        type: "relationship",
        relationTo: "users", // Assuming you have a users collection
        required: true,
        },
        */

        {
        name: "publishedDate",
        type: "date",
        required: true,
        },
    ],
}