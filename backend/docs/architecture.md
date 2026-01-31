# MVP version 1

## Users and actors 
Clients -> Client that chats with us or our system
Business owner or app manager -> Chief of operation, controls everything. Can change prices, etc.
operator -> Only can resolve tickets 
system -> System as a core or auxiliar

## Use cases
Chat with the system -> 
1. Simple questions: Return an answer with verified information and "I dont know answer" if it doesn´t know. If I don´t know answer triggers an alert to admin to comunicate with that person.
2. Questions to perform actions or solve problems: The system can create,modify,delete tickets and perform actions in db but only with a human in the loop for critical actions.


## Requirements:
* Multi-tenant
* Security in information from client and companies using the llm

## Modules 
1. Auth 
2. User
3. Chat 
4. Core 
5. Analytics 

## Endpoints contracts
### AI

### Chat:
post /message
get /message

### Ingestion
post /document or documents
get /document or documents
delete /document or documents


## DB Tables
### Message
- id
- sender_user_id: Optional if is not ia -> connected to table
- tenant_id -> connected to table
- conversation_id -> connected to table
- message
- created_at
- sender_type : ai or client or operator

### Conversations
- id
- tenant_id
- customer_user_id
- status: open, waiting_for_human, closed
- created_at
- closed_at

### Tenants
- id
- company_name

### Users
- id
- name
- email
- hashed_password
- rol
- tenant_id



### Cloud Architecture Options:

Opcion 1:
ECS+Fargate para Backend, AI calls,jobs, etc.

Opcion 2: 
AWS Batch para RAG Ingestion,ETL
Lambda + APIGATEWAY para endpoints

