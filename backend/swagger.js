export default {
    "openapi": "3.0.1",
    "info": {
        "version": "2.0.0",
        "title": "Project Manager API docs",
        "description": "API documentation. [Backend github repository](https://github.com/OlehCharupa/project-react-node/tree/dev/backend)",
    },
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "servers": [
        { "url": "https://bc24.herokuapp.com" },
    ],
    "tags": [
        {
            "name": "Auth",
            "description": "Authorization endpoints"
        },
        {
            "name": "Project",
            "description": "Projects endpoints"
        },
        {
            "name": "Sprint",
            "description": "Sprints endpoints"
        },
        {
            "name": "Task",
            "description": "Tasks endpoints"
        }
    ],
    "paths": {
        "/auth/register": {
            "post": {
                "tags": ["Auth"],
                "summary": "User registration",
                "parameters": [],
                "requestBody": {
                    "description": "Registration's object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RegistrationRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegistrationResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body)",
                        "content": {}
                    },
                    "409": {
                        "description": "Provided email already exists",
                        "content": {}
                    }
                }
            }
        },
        "/auth/login": {
            "post": {
                "tags": ["Auth"],
                "summary": "User authentication",
                "parameters": [],
                "requestBody": {
                    "description": "Authentication's object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/LoginRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LoginResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body)",
                        "content": {}
                    },
                    "403": {
                        "description": "Email doesn't exist / Password is wrong",
                        "content": {}
                    }
                }
            }
        },
        "/auth/logout": {
            "post": {
                "tags": ["Auth"],
                "summary": "Logout",
                "security": [{ "Bearer": [] }],
                "parameters": [],
                "responses": {
                    "204": {
                        "description": "Successful operation",
                        "content": {}
                    },
                    "400": {
                        "description": "No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/auth/refresh": {
            "post": {
                "tags": ["Auth"],
                "summary": "Get new pair of tokens (use Bearer {refreshToken} instead of accessToken)",
                "security": [{ "Bearer": [] }],
                "parameters": [],
                "requestBody": {
                    "description": "Object with session's id",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RefreshTokensRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RefreshTokensResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid request body / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid refresh token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/project": {
            "post": {
                "tags": ["Project"],
                "summary": "Add a project",
                "security": [{ "Bearer": [] }],
                "parameters": [],
                "requestBody": {
                    "description": "Project's object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/ProjectRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProjectResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Invalid user / Invalid session",
                        "content": {}
                    }
                }
            },
            "get": {
                "tags": ["Project"],
                "summary": "Get user's project",
                "security": [{ "Bearer": [] }],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Successful operation (or no projects found)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Projects"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/project/contributor/{projectId}": {
            "post": {
                "tags": ["Project"],
                "summary": "Add members to a project",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "projectId",
                        "in": "path",
                        "required": true,
                        "description": "Project's id",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Object with contributor's email",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Email"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/NewMembers"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body) / No token provided / Contributor already in project",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/project/title/{projectId}": {
            "patch": {
                "tags": ["Project"],
                "summary": "Change project's title",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "projectId",
                        "in": "path",
                        "required": true,
                        "description": "Project's id",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Object with new title",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/NewTitle"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/NewTitleResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body or id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Project not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/project/{projectId}": {
            "delete": {
                "tags": ["Project"],
                "summary": "Delete project",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "projectId",
                        "in": "path",
                        "required": true,
                        "description": "Project's id",
                        "type": "string"
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Successful operation",
                        "content": {}
                    },
                    "400": {
                        "description": "Bad request (invalid id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Project not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/sprint/{projectId}": {
            "post": {
                "tags": ["Sprint"],
                "summary": "Add a sprint",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "projectId",
                        "in": "path",
                        "required": true,
                        "description": "Project's id",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Sprint's object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/SprintRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SprintResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body or id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Project not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            },
            "get": {
                "tags": ["Sprint"],
                "summary": "Get project's sprints",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "projectId",
                        "in": "path",
                        "required": true,
                        "description": "Project's id",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation / No tasks found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Sprints"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Project not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/sprint/title/{sprintId}": {
            "patch": {
                "tags": ["Sprint"],
                "summary": "Change sprint's title",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "sprintId",
                        "in": "path",
                        "required": true,
                        "description": "Sprint's id",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Object with new title",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/NewTitle"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/NewTitleResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body or id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Sprint not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/sprint/{sprindId}": {
            "delete": {
                "tags": ["Sprint"],
                "summary": "Delete sprint",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "sprintId",
                        "in": "path",
                        "required": true,
                        "description": "Sprint's id",
                        "type": "string"
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Successful operation",
                        "content": {}
                    },
                    "400": {
                        "description": "Bad request (invalid id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Sprint not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/task/{sprintId}": {
            "post": {
                "tags": ["Task"],
                "summary": "Add a task",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "sprintId",
                        "in": "path",
                        "required": true,
                        "description": "Sprint's id",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Task's object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/TaskRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/TaskResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body or id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Sprint not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            },
            "get": {
                "tags": ["Task"],
                "summary": "Get sprint's tasks",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "sprintId",
                        "in": "path",
                        "required": true,
                        "description": "Sprint's id",
                        "type": "string"
                    },
                    {
                        "name": "search",
                        "in": "query",
                        "required": false,
                        "description": "Find tasks by query (if no query is provided, than all sprint's tasks are loaded)",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation / No tasks found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Tasks"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Sprint not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        },
        "/task/{taskId}": {
            "patch": {
                "tags": ["Task"],
                "summary": "Change task's day hours",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "taskId",
                        "in": "path",
                        "required": true,
                        "description": "Task's id",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Object with new wasted hours",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/NewHours"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful operation / Can't set the same hours",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/NewHoursResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body or id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Task not found / Day not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            },
            "delete": {
                "tags": ["Task"],
                "summary": "Delete task",
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "taskId",
                        "in": "path",
                        "required": true,
                        "description": "Task's id",
                        "type": "string"
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Successful operation",
                        "content": {}
                    },
                    "400": {
                        "description": "Bad request (invalid id) / No token provided",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized (invalid access token)",
                        "content": {}
                    },
                    "404": {
                        "description": "Sprint not found / Invalid user / Invalid session",
                        "content": {}
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "RegistrationRequest": {
                "required": ["email", "password"],
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "password": {
                        "type": "string",
                        "description": "User's password",
                        "example": "qwerty123"
                    }
                }
            },
            "RegistrationResponse": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "id": {
                        "type": "string",
                        "description": "User's id",
                        "example": "507f1f77bcf86cd799439011"
                    }
                }
            },
            "LoginRequest": {
                "required": ["email", "password"],
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "password": {
                        "type": "string",
                        "description": "User's password",
                        "example": "qwerty123"
                    }
                }
            },
            "LoginResponse": {
                "type": "object",
                "properties": {
                    "accessToken": {
                        "type": "string",
                        "description": "Session's access token (needed for all requests)",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXA"
                    },
                    "refreshToken": {
                        "type": "string",
                        "description": "Session's refresh token (needed for /auth/refresh)",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXB"
                    },
                    "sid": {
                        "type": "string",
                        "description": "Session's id (needed for /auth/refresh)",
                        "example": "507f1f77bcf86cd799439011"
                    },
                    "data": {
                        "type": "object",
                        "properties": {
                            "email": {
                                "type": "string",
                                "description": "User's email",
                                "format": "email"
                            },
                            "id": {
                                "type": "string",
                                "description": "User's id",
                                "example": "507f1f77bcf86cd799439012"
                            },
                            "projects": {
                                "type": "array",
                                "description": "User's projects",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "description": "Project's title",
                                            "example": "Project 1"
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "Project's description",
                                            "example": "Project 1 description"
                                        },
                                        "members": {
                                            "type": "array",
                                            "description": "Project's members",
                                            "items": {
                                                "type": "string",
                                                "description": "Project's member",
                                                "example": "user@example.com"
                                            }
                                        },
                                        "sprints": {
                                            "type": "array",
                                            "description": "Project's sprints",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "title": {
                                                        "type": "string",
                                                        "description": "Sprint's title",
                                                        "example": "Sprint 1"
                                                    },
                                                    "duration": {
                                                        "type": "integer",
                                                        "description": "Sprint's duration",
                                                        "minimum": 1,
                                                        "example": 1
                                                    },
                                                    "startDate": {
                                                        "type": "string",
                                                        "description": "Sprint's start date",
                                                        "example": "2020-12-31"
                                                    },
                                                    "endDate": {
                                                        "type": "string",
                                                        "description": "Sprint's end date",
                                                        "example": "2021-1-1"
                                                    },
                                                    "tasks": {
                                                        "type": "array",
                                                        "description": "Sprint's tasks",
                                                        "items": {
                                                            "type": "object",
                                                            "properties": {
                                                                "title": {
                                                                    "type": "string",
                                                                    "description": "Task's title",
                                                                    "example": "Task 1"
                                                                },
                                                                "hoursPlanned": {
                                                                    "type": "integer",
                                                                    "description": "Task's amount of planned hours",
                                                                    "minimum": 1,
                                                                    "example": 1
                                                                },
                                                                "hoursWasted": {
                                                                    "type": "integer",
                                                                    "description": "Task's amount of wasted hours",
                                                                    "minimum": 0,
                                                                    "example": 0
                                                                },
                                                                "hoursWastedPerDay": {
                                                                    "type": "array",
                                                                    "description": "Task's days",
                                                                    "items": {
                                                                        "type": "object",
                                                                        "description": "Task's day",
                                                                        "properties": {
                                                                            "currentDay": {
                                                                                "type": "string",
                                                                                "description": "Day's date",
                                                                                "example": "2020-12-31"
                                                                            },
                                                                            "singleHoursWasted": {
                                                                                "type": "integer",
                                                                                "description": "Amount of hours wasted on this day",
                                                                                "minimum": 0,
                                                                                "example": 0
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "_id": {
                                                        "type": "string",
                                                        "description": "Sprint's id",
                                                        "example": "507f1f77bcf86cd799439011"
                                                    },
                                                    "__v": {
                                                        "type": "integer",
                                                        "description": "MongoDB document service versionKey (ignore)"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "RefreshTokensRequest": {
                "type": "object",
                "properties": {
                    "sid": {
                        "type": "string",
                        "description": "Session's ('sid' field after authentication)",
                        "example": "507f1f77bcf86cd799439011"
                    }
                }
            },
            "RefreshTokensResponse": {
                "type": "object",
                "properties": {
                    "accessToken": {
                        "type": "string",
                        "description": "Access token",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXA"
                    },
                    "refreshToken": {
                        "type": "string",
                        "description": "Refresh token",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXB"
                    },
                    "newSid": {
                        "type": "string",
                        "description": "New session's id",
                        "example": "507f1f77bcf86cd799439011"
                    }
                }
            },
            "GetUserInfo": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "username": {
                        "type": "string",
                        "description": "User's name",
                        "example": "Adam"
                    },
                    "id": {
                        "type": "string",
                        "description": "User's id",
                        "example": "507f1f77bcf86cd799439012"
                    },

                    "children": {
                        "type": "array",
                        "description": "User's children",
                        "items": {
                            "type": "object",
                            "properties": {
                                "rewards": {
                                    "type": "integer",
                                    "description": "Child's rewards"
                                },
                                "habits": {
                                    "type": "array",
                                    "description": "Child's habits",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "days": {
                                                "type": "array",
                                                "description": "Habit days",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "date": {
                                                            "type": "string",
                                                            "description": "Day's date",
                                                            "example": "2020-12-31"
                                                        },
                                                        "isCompleted": {
                                                            "type": "string",
                                                            "description": "Day's status",
                                                            "enum": ["unknown", "confirmed", "canceled"]
                                                        }
                                                    }
                                                }
                                            },
                                            "_id": {
                                                "type": "string",
                                                "description": "Habit's id",
                                                "example": "507f1f77bcf86cd799439011"
                                            },
                                            "name": {
                                                "type": "string",
                                                "description": "Habit's name",
                                                "example": "Name of the habit"
                                            },
                                            "rewardPerDay": {
                                                "type": "integer",
                                                "description": "Habit's reward for a single day",
                                                "minimum": 1,
                                                "example": 1
                                            },
                                            "childId": {
                                                "type": "string",
                                                "description": "Id of the child whose habit it is",
                                                "example": "507f1f77bcf86cd799439011"
                                            },
                                            "__v": {
                                                "type": "integer",
                                                "description": "MongoDB document service versionKey (ignore)"
                                            }
                                        }
                                    }
                                },
                                "tasks": {
                                    "type": "array",
                                    "description": "Child's tasks",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string",
                                                "description": "Task's id",
                                                "example": "507f1f77bcf86cd799439011"
                                            },
                                            "name": {
                                                "type": "string",
                                                "description": "Task's name",
                                                "example": "Name of the task"
                                            },
                                            "reward": {
                                                "type": "string",
                                                "description": "Task's reward",
                                                "minimum": 1,
                                                "example": 1
                                            },
                                            "isCompleted": {
                                                "type": "string",
                                                "description": "Task's status",
                                                "enum": ["unknown", "confirmed", "canceled"]
                                            },
                                            "childId": {
                                                "type": "string",
                                                "description": "Id of the child whose task it is",
                                                "example": "507f1f77bcf86cd799439011"
                                            },
                                            "__v": {
                                                "type": "integer",
                                                "description": "MongoDB document service versionKey (ignore)"
                                            }
                                        }
                                    }
                                },
                                "gifts": {
                                    "type": "array",
                                    "description": "Child's gifts",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string",
                                                "description": "Gift's id",
                                                "example": "507f1f77bcf86cd799439011"
                                            },
                                            "name": {
                                                "type": "string",
                                                "description": "Gift's name",
                                                "example": "Name of the gift"
                                            },
                                            "price": {
                                                "type": "integer",
                                                "description": "Gift's price",
                                                "minimum": 1,
                                                "example": 1
                                            },
                                            "isPurchased": {
                                                "type": "boolean",
                                                "description": "Gift's status"
                                            },
                                            "imageUrl": {
                                                "type": "string",
                                                "description": "Gift's image url (created if 'file' field was provided while adding new gift)"
                                            },
                                            "childId": {
                                                "type": "string",
                                                "description": "Id of the child this gift was created for",
                                                "example": "507f1f77bcf86cd799439011"
                                            },
                                            "__v": {
                                                "type": "integer",
                                                "description": "MongoDB document service versionKey (ignore)"
                                            }
                                        }
                                    }
                                },
                                "_id": {
                                    "type": "string",
                                    "description": "Child's id",
                                    "example": "507f1f77bcf86cd799439011"
                                },
                                "name": {
                                    "type": "string",
                                    "description": "Child's name",
                                    "example": "Adam"
                                },
                                "gender": {
                                    "type": "string",
                                    "description": "Child's gender",
                                    "enum": ["male", "female"]
                                },
                                "__v": {
                                    "type": "integer",
                                    "description": "MongoDB document service versionKey (ignore)"
                                }
                            }
                        }
                    }
                }
            },
            "ProjectRequest": {
                "required": ["title", "description"],
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Project's title",
                        "example": "Project 1"
                    },
                    "description": {
                        "type": "string",
                        "description": "Project's description",
                        "example": "Project 1 description"
                    }
                }
            },
            "ProjectResponse": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Project's title",
                        "example": "Project 1"
                    },
                    "description": {
                        "type": "string",
                        "description": "Project's description",
                        "example": "Project 1 description"
                    },
                    "members": {
                        "type": "array",
                        "description": "Members of this project",
                        "items": {
                            "type": "string",
                            "description": "Contributor's email",
                            "example": "test@email.com"
                        }
                    },
                    "id": {
                        "type": "string",
                        "description": "Project's id",
                        "example": "507f1f77bcf86cd799439011"
                    }
                }
            },
            "Email": {
                "type": "object",
                "required": ["email"],
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "Future contributor's email"
                    }
                }
            },
            "NewMembers": {
                "type": "object",
                "properties": {
                    "newMembers": {
                        "type": "array",
                        "description": "Array of new members",
                        "items": {
                            "type": "string",
                            "description": "Email of the contributor",
                            "example": "test@email.com"
                        }
                    }
                }
            },
            "Projects": {
                "type": "array",
                "items": {
                    "type": "object",
                    "description": "User's project",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "Project's title",
                            "example": "Project 1"
                        },
                        "description": {
                            "type": "string",
                            "description": "Project's description",
                            "example": "Project 1 description"
                        },
                        "members": {
                            "type": "array",
                            "description": "Members of this project",
                            "items": {
                                "type": "string",
                                "description": "Contributor's email",
                                "example": "test@email.com"
                            }
                        },
                        "sprints": {
                            "type": "array",
                            "description": "Id's of sprints of this project",
                            "items": {
                                "type": "string",
                                "description": "Sprint's id",
                                "example": "507f1f77bcf86cd799439012"
                            }
                        },
                        "_id": {
                            "type": "string",
                            "description": "Project's id",
                            "example": "507f1f77bcf86cd799439011"
                        },
                        "__v": {
                            "type": "integer",
                            "description": "MongoDB document service versionKey (ignore)"
                        }
                    }
                }
            },
            "NewTitle": {
                "type": "object",
                "required": ["title"],
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Project's/Sprint's new title",
                        "example": "New title"
                    }
                }
            },
            "NewTitleResponse": {
                "type": "object",
                "properties": {
                    "newTitle": {
                        "type": "string",
                        "description": "Project's/Sprint's new title",
                        "example": "New title"
                    }
                }
            },
            "SprintRequest": {
                "required": ["title", "endDate", "duration"],
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Sprint's title",
                        "example": "Sprint 1"
                    },
                    "endDate": {
                        "type": "string",
                        "description": "Sprint's end date",
                        "example": "2020-12-31"
                    },
                    "duration": {
                        "type": "integer",
                        "description": "Sprint's duration",
                        "example": 1,
                        "minimum": 1
                    }
                }
            },
            "SprintResponse": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Sprint's title",
                        "example": "Sprint 1"
                    },
                    "startDate": {
                        "type": "string",
                        "description": "Sprint's start date",
                        "example": "2020-12-30"
                    },
                    "endDate": {
                        "type": "string",
                        "description": "Sprint's end date",
                        "example": "2020-12-31"
                    },
                    "duration": {
                        "type": "integer",
                        "description": "Sprint's duration",
                        "example": 1,
                        "minimum": 1
                    },
                    "id": {
                        "type": "string",
                        "description": "Sprint's id",
                        "example": "507f1f77bcf86cd799439011"
                    }
                }
            },
            "Sprints": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "Sprint's title",
                            "example": "Sprint 1"
                        },
                        "startDate": {
                            "type": "string",
                            "description": "Sprint's start date",
                            "example": "2020-12-30"
                        },
                        "endDate": {
                            "type": "string",
                            "description": "Sprint's end date",
                            "example": "2020-12-31"
                        },
                        "duration": {
                            "type": "integer",
                            "description": "Sprint's duration",
                            "example": 1,
                            "minimum": 1
                        },
                        "tasks": {
                            "type": "array",
                            "description": "Sprint's tasks",
                            "items": {
                                "type": "string",
                                "description": "Task's id",
                                "example": "507f1f77bcf86cd799439011"
                            }
                        },
                        "projectId": {
                            "type": "string",
                            "description": "Project's id",
                            "example": "507f1f77bcf86cd799439012"
                        },
                        "_id": {
                            "type": "string",
                            "description": "Sprint's id",
                            "example": "507f1f77bcf86cd799439013"
                        },
                        "__v": {
                            "type": "integer",
                            "description": "MongoDB document service versionKey (ignore)"
                        }
                    }
                }
            },
            "TaskRequest": {
                "required": ["title", "hoursPlanned"],
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Tasks's title",
                        "example": "Task 1"
                    },
                    "hoursPlanned": {
                        "type": "integer",
                        "description": "Amount of hours planned for this task",
                        "example": 1,
                        "minimum": 1,
                        "maximum": 8
                    }
                }
            },
            "TaskResponse": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Task's title",
                        "example": "Task 1"
                    },
                    "hoursPlanned": {
                        "type": "integer",
                        "description": "Amount of hours planned for this task",
                        "example": 1,
                        "minimum": 1,
                        "maximum": 8
                    },
                    "hoursWasted": {
                        "type": "integer",
                        "description": "Task's hours wasted (always 0 after creation)"
                    },
                    "hoursWastedPerDay": {
                        "type": "array",
                        "description": "Array of task's days",
                        "items": {
                            "type": "object",
                            "description": "Day's object",
                            "properties": {
                                "currentDay": {
                                    "type": "string",
                                    "description": "Day's date",
                                    "example": "2020-12-31"
                                },
                                "singleHoursWasted": {
                                    "type": "integer",
                                    "description": "Amount of hours spent on this task on this particular day"
                                }
                            }
                        }
                    },
                    "id": {
                        "type": "string",
                        "description": "Task's id",
                        "example": "507f1f77bcf86cd799439011"
                    }
                }
            },
            "Tasks": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "Task's title",
                            "example": "Task 1"
                        },
                        "hoursPlanned": {
                            "type": "integer",
                            "description": "Amount of hours planned for this task",
                            "example": 1,
                            "minimum": 1,
                            "maximum": 8
                        },
                        "hoursWasted": {
                            "type": "integer",
                            "description": "Task's hours wasted (always 0 after creation)"
                        },
                        "hoursWastedPerDay": {
                            "type": "array",
                            "description": "Array of task's days",
                            "items": {
                                "type": "object",
                                "description": "Day's object",
                                "properties": {
                                    "currentDay": {
                                        "type": "string",
                                        "description": "Day's date",
                                        "example": "2020-12-31"
                                    },
                                    "singleHoursWasted": {
                                        "type": "integer",
                                        "description": "Amount of hours spent on this task on this particular day"
                                    }
                                }
                            }
                        },
                        "_id": {
                            "type": "string",
                            "description": "Task's id",
                            "example": "507f1f77bcf86cd799439011"
                        },
                        "__v": {
                            "type": "integer",
                            "description": "MongoDB document service versionKey (ignore)"
                        }
                    }
                }
            },
            "NewHours": {
                "type": "object",
                "required": ["date", "hours"],
                "properties": {
                    "date": {
                        "type": "string",
                        "description": "Day's date",
                        "example": "2020-12-31"
                    },
                    "hours": {
                        "type": "integer",
                        "description": "New hours",
                        "example": 5,
                        "minimum": 1,
                        "maximum": 8
                    }
                }
            },
            "NewHoursResponse": {
                "type": "object",
                "properties": {
                    "day": {
                        "type": "object",
                        "description": "Day's object",
                        "properties": {
                            "currentDay": {
                                "type": "string",
                                "description": "Day's date",
                                "example": "2020-12-31"
                            },
                            "singleHoursWasted": {
                                "type": "integer",
                                "description": "Day's new hours",
                                "example": 5,
                                "minimum": 1,
                                "maximum": 8
                            }
                        }
                    },
                    "newWastedHours": {
                        "type": "integer",
                        "description": "New wasted hours",
                        "example": 20
                    }
                }
            }
        },
        "securitySchemes": {
            "Bearer": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    }
}
