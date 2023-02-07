# EcoCatch Tours - 95545
 Kanban style boat management system that allows drag and drop of boat card between docked, inbound, outbound and maintenance swim lanes. 
 
 The sytem aims to solve the following two user stories:
 
 - As a user, they can view a list of boat statuses so they know at a glance what status each boat is in
 - As a boat operator, be able to create boat card to describe the status and be able to move them between swim lanes
 
 # Backend
 
 The backend is built with Node.JS + Express.JS and follows a RESTful API approach. The endpoints are used using a versioned approach, for example `/boats/v1/`
 
 The following endpoints are available once deployed
 
 ## GET All
 
| Property | Description |
| --- | --- |
| Endpoint | GET /boats/v1 |
| Purpose | Retrieve all boats stored in the database |
| Request parameters | None |
| Response | A list of all boats stored in the database |
| Error handling | If there is an error during the retrieval operation, a "500 Internal Server Error" message will be sent in the response |

## GET One

The endpoint is currently not used by the frontend. It was implemented for full and future functionality.

| Property | Description |
| --- | --- |
| Endpoint | GET /boats/v1/:id |
| Purpose | Retrieve a single boat from the database by its id |
| Request parameters | `id` - the id of the boat to retrieve |
| Response | The boat with the specified `id` |
| Error handling | 404 - If the boat with the given id is not found in the database, a "Boat not found" message will be sent in the response. 
| Error handling | 500 - If there is an error during the retrieval operation, a "500 Internal Server Error" message will be sent in the response. |

## POST

| Property | Description |
| --- | --- |
| Endpoint | POST /boats/v1 |
| Purpose | Create a new boat |
| Request parameters | `operator` and `boat name` - the operator and name for the new boat |
| Response | The inserted `id` of the new boat |
| Error handling | 400 - If the operator or boat name is missing in the request body, a "Bad Request" message will be sent in the response. 
| Error handling | 500 - If there is an error during the creation operation, a "500 Internal Server Error" message will be sent in the response. |


 ## PUT
 
 | Property | Description |
| --- | --- |
| Endpoint | PUT /boats/v1/:id |
| Purpose | Update a boat's information |
| Request parameters | `id` - the id of the boat to update; `name`, `operator`, `status` - the new information for the boat |
| Response | The `id` of the updated boat |
| Error handling | 400 - If either name, operator, or status is not provided in the request body, a "Bad Request" message will be sent in the response. 
| Error handling | 500 - If there is an error during the update operation, a "500 Internal Server Error" message will be sent in the response. |

## DELETE

| Property | Description |
| --- | --- |
| Endpoint | DELETE /boats/v1/:id |
| Purpose | Delete a boat |
| Request parameters | `id` - the id of the boat to delete |
| Response | The `id` of the deleted boat |
| Error handling | 400 - If the boat failed to delete, a "Bad Request" message will be sent in the response.
| Error handling | 404 - If the boat with the given id is not found in the database, a "Boat not found" message will be sent in the response.
| Error handling | 500 - If there is an error during the deletion operation, a "500 Internal Server Error" message will be sent in the response. |


 
