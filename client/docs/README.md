
# Campfire API

**Base URL:** Staging: https://staging-campfire-api.azurewebsites.net/api

## Campfires

### **Get Campfires**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires

#### *Response*

**200: OK**

    {   
        success: true,
        data: [
            {
                updatedAt: Date,
                createdAt: Date,
                scheduleToStart: Date,
                openTo: string,
                _id: string,
                topic: string,
                altTopic: string,
                duration: string,
                description: string,
                hidden: boolean,
                isDeleted: boolean,
                creatorId: string,
            },
            { ... },
            { ... },
        ]
    }

### **Get Campfire**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/:id

#### *Response*

**200: OK**

    {   
        updatedAt: Date,
        createdAt: Date,
        scheduleToStart: Date,
        openTo: string,
        _id: string,
        topic: string,
        altTopic: string,
        duration: string,
        description: string,
        hidden: boolean,
        isDeleted: boolean,
        creatorId: string,
    }

### **Get Campfire Members**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/:id/members

#### *Response*

**200: OK**

    [
        {
            status: number,
            role: string,
            _id: string,
            profileUrl: string,
            name: string,
            campfire: string,
            updatedAt: date,
            createdAt: date,
        }
        { ... },
        { ... },
    ]

### **Add Campfire**

[POST] https://staging-campfire-api.azurewebsites.net/api/campfires

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| topic | string | true |
| altTopic | string | true |
| duration | string | optional |
| description | string | true |
| creatorId | string | true |
| hidden | boolean | optional |
| isDeleted | boolean | optional |
| scheduleToStart | Date | optional |
| openTo | string | optional |

#### *Response*

**201: Created**

    {   
        updatedAt: Date,
        createdAt: Date,
        scheduleToStart: Date,
        openTo: string,
        _id: string,
        topic: string,
        altTopic: string,
        duration: string,
        description: string,
        hidden: boolean,
        isDeleted: boolean,
        creatorId: string,
    }

### **Update Campfire**

[PATCH] https://staging-campfire-api.azurewebsites.net/api/campfires/:id

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| topic | string | true |
| altTopic | string | true |
| duration | string | optional |
| description | string | true |
| hidden | boolean | optional |
| isDeleted | boolean | optional |
| scheduleToStart | Date | optional |
| openTo | string | optional |

#### *Response*

**200: OK**

    {   
        updatedAt: Date,
        createdAt: Date,
        scheduleToStart: Date,
        openTo: string,
        _id: string,
        topic: string,
        altTopic: string,
        duration: string,
        description: string,
        hidden: boolean,
        isDeleted: boolean,
        creatorId: string,
    }

### **Delete Campfire**

[DELETE] https://staging-campfire-api.azurewebsites.net/api/campfires/:id

#### *Response*

**200: OK**

    {   
        message: "Campfire deleted successfully!"
    }

## Members

### **Get member**

[GET] https://staging-campfire-api.azurewebsites.net/api/member/:id

#### *Response*

**200: OK**

    {
        status: string,
        role: string,
        _id: string,
        profileUrl: string,
        name: string,
        campfire: string,
        updatedAt: date,
        createdAt: date,
    }

### **Add member**

[POST] https://staging-campfire-api.azurewebsites.net/api/member

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| profileUrl | string | true |
| name | string | true |
| status | string | optional |
| role | string | optional |
| campfire | string | true |

#### *Response*

**201: Created**

    {
        status: string,
        role: string,
        _id: string,
        profileUrl: string,
        name: string,
        campfire: string,
        updatedAt: date,
        createdAt: date,
    }

### **Update member**

[PATCH] https://staging-campfire-api.azurewebsites.net/api/member/:id

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| profileUrl | string | true |
| name | string | true |
| status | string | optional |
| role | string | optional |
| campfire | string | true |

#### *Response*

**200: OK**

    {
        status: string,
        role: string,
        _id: string,
        profileUrl: string,
        name: string,
        campfire: string,
        updatedAt: date,
        createdAt: date,
    }

### **Delete member**

[DELETE] https://staging-campfire-api.azurewebsites.net/api/member/:id

#### *Response*

**200: OK**

    {
        message: 'Member removed successfully!'
    }
