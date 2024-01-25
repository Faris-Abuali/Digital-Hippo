import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailSubject: ({ token }) => 'Verify your email',
            generateEmailHTML: ({ token }) => {
                return '<p>Hello, please verify</p>'
            },   
        }
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'user',
            required: true,
            // admin: {
            //     // condition: ({ req }) => req.user.role === 'admin',
            //     condition: () => false, // hide from the admin UI 
            // },
            type: 'select',
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'User',
                    value: 'user',
                },
            ],
        },
    ],
};