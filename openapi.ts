
import { stringify } from "jsr:@std/yaml";

const parameters = {
  user: {
    name: 'name',
    in: 'path',
    description: 'The user-name',
    required: true,
    schema: {
      type: 'string'
    }
  },
  topic: {
    name: 'topic',
    in: 'path',
    description: 'The topic-name',
    required: true,
    schema: {
      type: 'string'
    }
  },
  role: {
    name: 'role',
    in: 'path',
    description: 'The role-name',
    required: true,
    schema: {
      type: 'string'
    }
  },
  human: {
    name: 'human',
    in: 'query',
    description: 'Should dates be presented in human readable formats?',
    required: false,
    schema: {
      type: 'boolean'
    }
  }
}

const responses = {
  error: {
    type: 'object',
    properties: {
      error: {
        type: 'string'
      }
    }
  },
  usersGet: {
    type: 'object',
  },
  userGet: {
    type: 'object',
  },
  userPost: {
    type: 'object',
  },
  feedGet: {
    type: 'object',
  },
  subscriptionPost: {
    type: 'object',
  },
  subscriptionGet: {
    type: 'object'
  },
  roleGet: {
    type: 'object',
  },
  rolePost: {
    type: 'object',
  },
  contentGetJson: {
    type: 'array',
    items: {
      anyOf: [
        { type: 'string' },
        { type: 'integer' },
        { type: 'object' }
      ]
    }
  },
  contentGetJsonNd: {
    type: 'string',
  },
  contentPost: {
    type: 'object',
    properties: {
      batch: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          status: {
            type: 'string',
            enum: ['open', 'closed']
          }
        }
      },
      topic: {
        type: 'string'
      },
      stats: {
        type: 'object',
        properties: {
          count: {
            type: 'number'
          },
          lastUpdated: {
            type: 'number'
          }
        }
      }
    }
  },
  topicGet: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      created: {
        type: 'string'
      }
    }
  },
  topicDelete: {
    type: 'object',
    properties: {
      existed: {
        type: 'boolean'
      }
    }
  },
  topicPost: {
    type: 'object',
    properties: {
      existed: {
        type: 'boolean'
      }
    }
  }
}

const examples = {
  error: {
    error: "Error message"
  },
  usersGet: [
    {
      name: 'notes_read',
      role: 'notes_read_role',
      created: 1600000000000
    }
  ],
  userGet: {
    name: 'notes_read',
    role: 'notes_read_role',
    created: 1600000000000
  },
  feedGet: {
    description: "My personal common-storage server",
    title: "Common Storage",
    version: "v0.1",
    topics: [
      {
        topic: "snippets",
        description: "Short unstructured text-notes for sharing links, quotes, reminders, etc.",
        stats: {
          count: 1,
          lastUpdated: 1600000000000
        }
      }
    ],
    subscriptions: {},
    apiOverview: {
      users: {
        "GET /user": "Get information about registered users",
        "GET /user/:name": "Get user information",
        "POST /user/:name": "Add a user"
      },
      subscriptions: {
        "POST /subscription/:topic": "Subscribe to a common-storage topic"
      },
      role: {
        "GET /role/:role": "Get permission details about a role",
        "POST /role/:role": "Create a new permissions role"
      },
      feed: {
        "GET /feed": "Retrieve general information about this server"
      },
      content: {
        "GET /content/:topic": "Retrieve a collection of content from a topic",
        "POST /content/:topic": "Add content to a topic"
      },
      topic: {
        "GET /topic/:topic": "Get metadata about a topic",
        "POST /topic/:topic": "Add a topic to the server",
        "DELETE /topic/:topic": "Delete a topic from the server"
      }
    }
  },
  userPost: {
    existed: false
  },
  subscriptionPost: {

  },
  subscriptionGet: {

  },
  roleGet: {
    name: 'notes_admin_role',
    create: 1600000000000,
    permissions: [
      {
        topics: ["notes"],
        routes: "ALL"
      }
    ]
  },
  rolePost: {
    existed: false
  },
  contentPost: {
    batch: {
      id: 'test-batch',
      status: 'open'
    },
    topic: 'notes',
    stats: {

    }
  },
  contentGetJson: [
    {
      id: "my-note-0",
      text: "an arbitrary note"
    },
    {
      id: "my-note-1",
      text: "another arbitrary note"
    }
  ],
  contentGetJsonNd: `
    {"id": "my-note-0", "text": "an arbitrary note"}
    {"id": "my-note-1", "text": "another arbitrary note"}
  `,
  topicGet: {
    name: 'notes',
    description: 'notes stored in common-storage',
    created: 1600000000000
  },
  topicPost: {
    existed: false
  },
  topicDelete: {
    existed: true
  }
}

const responseCodes = {
  '400': {
    description: 'Failed JSON parse',
    content: {
      'application/json': {
        schema: responses.error,
        example: examples.error
      }
    }
  },
  '422': {
    description: 'Invalid request details',
    content: {
      'application/json': {
        schema: responses.error,
        example: examples.error
      }
    }
  },
  '500': {
    description: 'Internal server error',
    content: {
      'application/json': {
        schema: responses.error,
        example: examples.error
      }
    }
  },
}

const paths = {
  usersGet: {
    summary: "Get information about registered users",
    description: "List information about all registered users on this server",
    parameters: [parameters.human],
    responses: {
      '200': {
        description: 'Get information about all-users registered on this server',
        content: {
          'application/json': {
            schema: responses.usersGet,
            example: examples.usersGet
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  userGet: {
    summary: "Get user information",
    description: "Get information about a particular user, by name",
    parameters: [
      parameters.user,
      parameters.human
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.userGet,
            example: examples.userGet
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  userPost: {
    summary: "Add a user",
    description: "Register a user associated with a particular role to the server",
    parameters: [
      parameters.user
    ],
    responses: {
      '200': {
        description: 'User successfully added',
        content: {
          'application/json': {
            schema: responses.userPost,
            example: examples.userPost
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  feedGet: {
    summary: "Retrieve general information about this server",
    description: "/feed publically describes the topics available on a particular server, as well as statistics about how recently topics have been updated. It also lists subscriptions the server currently holds",
    parameters: [parameters.human],
    responses: {
      '200': {
        description: 'Feed retrieved successfully',
        content: {
          'application/json': {
            schema: responses.feedGet,
            example: examples.feedGet
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  subscriptionGet: {
    summary: "Get details about a subscription",
    description: "Common-storage servers can retrieve information from other server's topic via a subscription",
    parameters: [
      parameters.topic,
      parameters.human
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.subscriptionGet,
            example: examples.subscriptionGet
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  subscriptionPost: {
    summary: "Subscribe to a common-storage topic",
    description: "Subscribe to a remote server",
    parameters: [
      parameters.topic
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.subscriptionPost,
            example: examples.subscriptionPost
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  roleGet: {
    summary: "Get details about a role",
    description: "Roles describe what a user can and cannot do when interacting with a common-storage server",
    parameters: [
      parameters.role,
      parameters.human
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.roleGet,
            example: examples.roleGet
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  rolePost: {
    summary: "Create a new permissions role",
    description: [
      "Post a role that defined the permissions that a particular role has. Permissions are defined at two levels; route level and topic level. Available route-level permissions are:",
      "- ALL",
      "- GET /content",
      "- POST /content",
      "- GET /topic",
      "- POST /topic",
      "- DELETE /topic",
      "",
      "These permissions apply to topics, with the possible values:",
      "- ALL",
      "- USER_CREATED",
      "- An array of topic names"
    ].join('\n'),
    parameters: [
      parameters.role
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.rolePost,
            example: examples.rolePost
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  contentGet: {
    summary: "Retrieve a collection of content from a topic",
    description: "Content can be retrieved using paginated GET requests, or as streaming JSON",
    parameters: [
      parameters.topic
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.contentGetJson,
            example: examples.contentGetJson
          },
          'application/x-ndjson': {
            schema: responses.contentGetJsonNd,
            example: examples.contentGetJsonNd
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  contentPost: {
    summary: "Add content to a topic",
    description: "Add a list of content to a particular topic. Optionally, use a batch id to avoid partial writes. Batches are closed by posting an empty list to that ID. Content must be valid according the the schema associated with the topic, if one exists.",
    parameters: [
      parameters.topic
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.contentPost,
            example: examples.contentPost
          }
        }
      }
    }
  },
  topicGet: {
    summary: "Get metadata about a topic",
    description: "Topics are logical grouping of content, like notes, bookmarks, events",
    parameters: [
      parameters.topic
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.topicGet,
            example: examples.topicGet
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  topicPost: {
    summary: "Add a topic to the server",
    description: "Add a topic if not all ready present. Topics may have a schema constraining content that is added to this topic.",
    parameters: [
      parameters.topic
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.topicPost,
            example: examples.topicPost
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  },
  topicDelete: {
    summary: "Delete a topic from the server",
    description: "Deletes a topic. As of this version, it does not delete the content associated with that topic, but it does make it inaccessible by the API",
    parameters: [
      parameters.topic
    ],
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: responses.topicDelete,
            example: examples.topicDelete
          }
        }
      },
      '400': responseCodes['400'],
      '422': responseCodes['422'],
      '500': responseCodes['500'],
    }
  }
}

console.log(JSON.stringify({
  openapi: '3.0.0',
  info: {
    title: 'Common Storage',
    description: [
      'Common Storage is a backend-agnostic federated personal data-store. It is protected by RBAC, and allows arbitrary (or constrained) events to be written to the server. Content can be synced between servers by setting up a subscription to a topic. It can serve as a relay between websites that publish notes, bookmarks, and other data and a locally hosted data-store.',
      '',
      'Common-storage data is accessible using basic-authenticated HTTP requests, with support for more rapid retrieval of content from a topic using streaming JSON.'].join('\n'),
    version: '1.0.0'
  },
  components: {
    securitySchemes: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic'
      }
    }
  },
  security: [
    {
      BasicAuth: []
    }
  ],
  servers: [{
    url: 'https://common-storage.rgrannell.xyz'
  }],
  paths: {
    '/feed': {
      get: paths.feedGet
    },
    '/user': {
      get: paths.usersGet
    },
    '/user/{name}': {
      get: paths.userGet,
      post: paths.userPost
    },
    '/subscription/{topic}': {
      get: paths.subscriptionGet,
      post: paths.subscriptionPost
    },
    '/role/{role}': {
      get: paths.roleGet,
      post: paths.rolePost,
    },
    '/content/{topic}': {
      get: paths.contentGet,
      post: paths.contentPost,
    },
    '/topic/{topic}': {
      get: paths.topicGet,
      post: paths.topicPost,
      delete: paths.topicDelete,
    }
  }
}));
