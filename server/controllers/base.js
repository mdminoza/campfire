export const getBase = async (req, res, next) => {
  try {
    const baseData = {
      namespace: "api",
      routes: {
        '/api/campfires': {
          methods: [
            'GET',
            'POST',
          ],
          endpoints: [
            {
              method: 'GET',
              args: {},
            },
            {
              method: 'POST',
              args: {
                topic: {
                  type: 'string',
                  required: true,
                },
                altTopic: {
                  type: 'string',
                  required: true,
                },
                duration: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                  required: true,
                },
                creatorId: {
                  type: 'string',
                  ref: 'User',
                  required: true,
                },
                hidden: Boolean,
                isDeleted: Boolean,
                scheduleToStart: {
                  type: Date,
                  default: new Date(),
                },
                openTo: {
                  type: 'string',
                  default: 'Everyone',
                },
              },
            },
          ],
          link: 'https://staging-campfire-api.azurewebsites.net/api/campfires',
        },
        '/api/campfires/:id': {
          methods: [
            'GET',
            'PATCH',
            'DELETE',
          ],
          endpoints: [
            {
              method: 'GET',
              args: {},
            },
            {
              method: 'PATCH',
              args: {
                topic: {
                  type: 'string',
                  required: true,
                },
                altTopic: {
                  type: 'string',
                  required: true,
                },
                duration: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                  required: true,
                },
                hidden: Boolean,
                isDeleted: Boolean,
                scheduleToStart: {
                  type: Date,
                  default: new Date(),
                },
                openTo: {
                  type: 'string',
                  default: 'Everyone',
                },
              },
            },
            {
              method: 'DELETE',
              args: {},
            },
          ],
          link: 'https://staging-campfire-api.azurewebsites.net/api/campfires/:id',
        },
        '/api/campfires/:id/members': {
          methods: [
            'GET',
          ],
          endpoints: [
            {
              method: 'GET',
              args: {},
            },
          ],
          link: 'https://staging-campfire-api.azurewebsites.net/api/campfires/:id/members',
        },
        '/api/member': {
          methods: [
            'POST',
          ],
          endpoints: [
            {
              method: 'POST',
              args: {
                profileUrl: {
                  type: 'string',
                  required: true,
                },
                name: {
                  type: 'string',
                  required: true,
                },
                status: {
                  type: 'string',
                  default: 'pending'
                },
                role: {
                  type: 'string',
                  default: 'audience'
                },
                campfire: {
                  type: 'string',
                  ref: 'Campfire',
                  required: true,
                },
              },
            },
          ],
          link: 'https://staging-campfire-api.azurewebsites.net/api/member',
        },
        '/api/member/:id': {
          methods: [
            'GET',
            'PATCH',
            'DELETE'
          ],
          endpoints: [
            {
              method: 'GET',
              args: {},
            },
            {
              method: 'PATCH',
              args: {
                status: {
                  type: 'string',
                  default: 'pending'
                },
                role: {
                  type: 'string',
                  default: 'audience'
                },
                campfire: {
                  type: 'string',
                  ref: 'Campfire',
                  required: true,
                },
              },
            },
            {
              method: 'DELETE',
              args: {},
            },
          ],
          link: 'https://staging-campfire-api.azurewebsites.net/api/member/:id',
        },
      },
    };

    res.status(200).json(baseData);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};