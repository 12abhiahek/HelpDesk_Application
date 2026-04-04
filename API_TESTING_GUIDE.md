# API Testing Guide & Examples

Complete guide with cURL examples for testing all Help Desk Application endpoints.

## Prerequisites

- Application running on `http://localhost:8080`
- `curl` or similar HTTP client installed
- Database populated with sample data

## Base URL

```
http://localhost:8080/api/v1
```

---

## Ticket Endpoints

### 1. Create Ticket

**Endpoint**: `POST /tickets`

**Request**:
```bash
curl -X POST http://localhost:8080/api/v1/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Network Connectivity Issue",
    "description": "Unable to connect to company VPN from home office",
    "priority": "HIGH",
    "username": "john.doe"
  }'
```

**Success Response (201 Created)**:
```json
{
  "statusCode": 201,
  "success": true,
  "message": "Ticket created successfully",
  "data": {
    "ticketId": 1,
    "title": "Network Connectivity Issue",
    "description": "Unable to connect to company VPN from home office",
    "status": "OPEN",
    "priority": "HIGH",
    "assignedTo": "Unassigned",
    "username": "john.doe",
    "createdDate": "2026-04-04",
    "updatedDateTime": "2026-04-04T12:00:00",
    "endTime": null
  },
  "timestamp": "2026-04-04T12:00:00"
}
```

**Validation Error (400 Bad Request)**:
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation failed",
  "error": "{title=Title must be between 5 and 200 characters}",
  "timestamp": "2026-04-04T12:00:00"
}
```

### 2. Get All Tickets

**Endpoint**: `GET /tickets`

**Request**:
```bash
curl -X GET http://localhost:8080/api/v1/tickets \
  -H "Content-Type: application/json"
```

**Response (200 OK)**:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "All tickets retrieved successfully",
  "data": [
    {
      "ticketId": 1,
      "title": "Network Connectivity Issue",
      "description": "Unable to connect to company VPN from home office",
      "status": "OPEN",
      "priority": "HIGH",
      "assignedTo": "Unassigned",
      "username": "john.doe",
      "createdDate": "2026-04-04",
      "updatedDateTime": "2026-04-04T12:00:00",
      "endTime": null
    }
  ],
  "timestamp": "2026-04-04T12:00:00"
}
```

### 3. Get Ticket by ID

**Endpoint**: `GET /tickets/{ticketId}`

**Request**:
```bash
curl -X GET http://localhost:8080/api/v1/tickets/1 \
  -H "Content-Type: application/json"
```

**Success Response (200 OK)**:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ticket retrieved successfully",
  "data": {
    "ticketId": 1,
    "title": "Network Connectivity Issue",
    "description": "Unable to connect to company VPN from home office",
    "status": "OPEN",
    "priority": "HIGH",
    "assignedTo": "Unassigned",
    "username": "john.doe",
    "createdDate": "2026-04-04",
    "updatedDateTime": "2026-04-04T12:00:00",
    "endTime": null
  },
  "timestamp": "2026-04-04T12:00:00"
}
```

**Not Found (404)**:
```json
{
  "statusCode": 404,
  "success": false,
  "message": "Resource not found",
  "error": "Ticket not found with ID: 999",
  "timestamp": "2026-04-04T12:00:00"
}
```

### 4. Get Ticket by Username

**Endpoint**: `GET /tickets/user/{username}`

**Request**:
```bash
curl -X GET http://localhost:8080/api/v1/tickets/user/john.doe \
  -H "Content-Type: application/json"
```

**Response (200 OK)**: Same as Get by ID

### 5. Update Ticket

**Endpoint**: `PUT /tickets/{ticketId}`

**Request**:
```bash
curl -X PUT http://localhost:8080/api/v1/tickets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Network Issue - Updated",
    "description": "Unable to connect to company VPN from home office - escalated to network team",
    "priority": "HIGH",
    "username": "john.doe"
  }'
```

**Response (200 OK)**: Updated ticket object

### 6. Delete Ticket

**Endpoint**: `DELETE /tickets/{ticketId}`

**Request**:
```bash
curl -X DELETE http://localhost:8080/api/v1/tickets/1 \
  -H "Content-Type: application/json"
```

**Success Response (200 OK)**:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Ticket deleted successfully",
  "timestamp": "2026-04-04T12:00:00"
}
```

---

## AI Endpoints

### 1. Chat with AI

**Endpoint**: `POST /ai/chat`

**Request**:
```bash
curl -X POST http://localhost:8080/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I reset my password in Windows?"
  }'
```

**Response (200 OK)**:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "AI response generated successfully",
  "data": "To reset your password in Windows:\n\n1. Click on the Windows Start button and select Settings\n2. Go to Accounts\n3. Select Sign-in options\n4. Click Change under Password section\n5. Click Next and answer your security questions\n6. Enter your new password twice\n7. Click Next and then Finish",
  "timestamp": "2026-04-04T12:00:00"
}
```

**Validation Error**:
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation failed",
  "error": "{message=Message cannot be empty}",
  "timestamp": "2026-04-04T12:00:00"
}
```

### 2. Summarize Text

**Endpoint**: `POST /ai/summarize`

**Request**:
```bash
curl -X POST http://localhost:8080/api/v1/ai/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "message": "User reported that they cannot access email since this morning. They tried restarting their computer and clearing cache but issue persists. Tried different browser but same issue. Likely email server issue or network connectivity problem from users end."
  }'
```

**Response (200 OK)**:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Text summarized successfully",
  "data": "User unable to access email across browsers after restart and cache clear. Suspected server or network issue requiring investigation.",
  "timestamp": "2026-04-04T12:00:00"
}
```

### 3. Get Assistant Response

**Endpoint**: `POST /ai/assistant`

**Request**:
```bash
curl -X POST http://localhost:8080/api/v1/ai/assistant \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the common causes of printer not working?"
  }'
```

**Response (200 OK)**:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Assistant response generated successfully",
  "data": "Common causes of printer not working include:\n\n1. Paper jam - Clear the paper tray\n2. No ink/toner - Replace cartridge\n3. Network disconnection - Check network connection\n4. Driver issues - Reinstall or update printer drivers\n5. Printer offline - Check printer status\n6. Queue stuck - Clear print queue\n7. Power issue - Check if printer is powered on\n8. USB cable disconnected - Verify connections",
  "timestamp": "2026-04-04T12:00:00"
}
```

---

## Health Check

**Endpoint**: `GET /actuator/health`

**Request**:
```bash
curl -X GET http://localhost:8080/actuator/health
```

**Response**:
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "MySQL",
        "validationQuery": "isValid()"
      }
    }
  }
}
```

---

## Testing Scenarios

### Scenario 1: Complete Ticket Lifecycle

```bash
# 1. Create a ticket
TICKET_RESPONSE=$(curl -s -X POST http://localhost:8080/api/v1/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Ticket",
    "description": "This is a test ticket for complete lifecycle",
    "priority": "MEDIUM",
    "username": "testuser"
  }')

# Extract ticket ID (manual or use jq)
TICKET_ID=1

# 2. Get the ticket
curl -X GET http://localhost:8080/api/v1/tickets/$TICKET_ID

# 3. Update the ticket
curl -X PUT http://localhost:8080/api/v1/tickets/$TICKET_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Ticket - Updated",
    "description": "Updated description",
    "priority": "HIGH",
    "username": "testuser"
  }'

# 4. Delete the ticket
curl -X DELETE http://localhost:8080/api/v1/tickets/$TICKET_ID
```

### Scenario 2: Error Handling Test

```bash
# Test with invalid ticket ID
curl -X GET http://localhost:8080/api/v1/tickets/99999

# Test with invalid request body
curl -X POST http://localhost:8080/api/v1/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "X",
    "description": "Too short",
    "priority": "INVALID",
    "username": "test"
  }'

# Test with empty message
curl -X POST http://localhost:8080/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": ""}'
```

---

## Testing with Postman

### Import Collection

1. Open Postman
2. Create new collection: "Help Desk API"
3. Create folders: "Tickets", "AI"
4. Add requests with examples above
5. Set environment variable: `base_url` = `http://localhost:8080/api/v1`

### Pre-request Script Example

```javascript
// Auto-generate headers
pm.request.headers.add({key: 'Content-Type', value: 'application/json'});
```

### Test Script Example

```javascript
// Verify status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Verify response structure
pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.equal(true);
});

// Verify data field exists
pm.test("Response has data field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
});
```

---

## Testing with Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Copy examples from above
4. Save to collection
5. Run tests

---

## Performance Testing

### Load Test Example (using Apache JMeter or k6)

```bash
# Simple load test with 100 concurrent users
# Using Apache Bench
ab -n 1000 -c 100 http://localhost:8080/api/v1/tickets
```

### Expected Response Times

- GET /tickets: <100ms
- GET /tickets/{id}: <50ms
- POST /tickets: <200ms
- POST /ai/chat: <2000ms (depends on AI response)

---

## Common Response Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input or validation error |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## Troubleshooting

### Connection Refused
```bash
# Check if application is running
curl http://localhost:8080/actuator/health
```

### Invalid JSON Response
```bash
# Enable verbose output
curl -v http://localhost:8080/api/v1/tickets
```

### Database Error
```bash
# Check if database is running
mysql -u root -p help_desk -e "SELECT 1;"
```

### Timeout Issues
```bash
# Increase timeout for long-running requests
curl --max-time 30 http://localhost:8080/api/v1/ai/chat
```

---

## Additional Resources

- **Postman Collection**: Import from repository
- **API Documentation**: See JavaDoc in code
- **Error Codes**: See GlobalExceptionHandler.java
- **Validation Rules**: See DTOs in dto package

---

For more information, see `PRODUCTION_README.md`

