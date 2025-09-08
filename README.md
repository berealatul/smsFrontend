# SMS - Student Monitoring System

## Authentication API Endpoints

### Security Features

- JWT authentication with custom implementation
- bcrypt password hashing
- Rate limiting (60 requests per minute per IP)
- Input validation and sanitization
- CORS configured for React frontend
- Security headers (XSS protection, content sniffing prevention)
- Request logging

### API Endpoints

#### POST /api/auth/login

**Request:**

```json
{
  "email": "admin@gmail.com",
  "password": "adminpass"
}
```

**Response:**

```json
{
  "token": "jwt_token_here"
}
```

#### GET /api/auth/me

**Headers:** `Authorization: Bearer {token}`
**Response:**

```json
{
  "user_type": "ADMIN",
  "department_id": null,
  "full_name": "System Admin",
  "email": "admin@gmail.com"
}
```

#### PUT /api/auth/me

**Headers:** `Authorization: Bearer {token}`
**Request (all fields optional):**

```json
{
  "full_name": "Updated Name",
  "email": "newemail@gmail.com",
  "current_password": "oldpassword",
  "new_password": "newpassword123"
}
```

**Response:**

```json
{
  "message": "Profile updated successfully"
}
```

### Department Management (Admin Only)

#### GET /api/departments

**Headers:** `Authorization: Bearer {token}` (Admin only)
**Response:**

```json
[
  {
    "department_id": 1,
    "department_code": "CSE",
    "department_name": "Computer Science and Engineering",
    "hod_name": "CSE HOD",
    "hod_email": "hod.cse@gmail.com"
  }
]
```

#### POST /api/departments

**Headers:** `Authorization: Bearer {token}` (Admin only)
**Request:**

```json
{
  "department_code": "EEE",
  "department_name": "Electrical and Electronic Engineering",
  "hod_email": "hod.eee@gmail.com"
}
```

**Response:**

```json
{
  "message": "Department created successfully",
  "department_id": 3,
  "department_code": "EEE",
  "department_name": "Electrical and Electronic Engineering",
  "hod_email": "hod.eee@gmail.com"
}
```

#### GET /api/departments/{id}

**Headers:** `Authorization: Bearer {token}` (Admin only)
**Response:**

```json
{
  "department_id": 1,
  "department_code": "CSE",
  "department_name": "Computer Science and Engineering",
  "hod_name": "CSE HOD",
  "hod_email": "hod.cse@gmail.com"
}
```

#### PUT /api/departments/{id}

**Headers:** `Authorization: Bearer {token}` (Admin only)
**Request (all fields optional):**

```json
{
  "department_code": "CS",
  "department_name": "Computer Science",
  "hod_email": "newhod.cs@gmail.com"
}
```

**Response:**

```json
{
  "message": "Department updated successfully"
}
```

#### DELETE /api/departments/{id}

**Headers:** `Authorization: Bearer {token}` (Admin only)
**Response:**

```json
{
  "message": "Department deleted successfully"
}
```

### User Management (HOD Only)

#### GET /api/users

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Response:**

```json
[
  {
    "user_id": 3,
    "user_type": "FACULTY",
    "full_name": "John Doe",
    "email": "john.doe@gmail.com",
    "is_active": true
  }
]
```

#### POST /api/users

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "user_type": "FACULTY",
  "email": "new.faculty@gmail.com"
}
```

#### POST /api/users/bulk

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "users": [
    { "user_type": "STUDENT", "email": "student1@gmail.com" },
    { "user_type": "FACULTY", "email": "faculty1@gmail.com" }
  ]
}
```

#### PUT /api/users/{id}

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "full_name": "Updated Name",
  "user_type": "STAFF"
}
```

#### DELETE /api/users/{id}

**Headers:** `Authorization: Bearer {token}` (HOD only)

#### PUT /api/users/activate

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "user_ids": [5, 6, 7]
}
```

### Programme Management (HOD Only)

#### GET /api/programmes

**Headers:** `Authorization: Bearer {token}` (HOD only)

#### POST /api/programmes

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "programme_name": "PhD Computer Science",
  "degree_level_id": 3,
  "minimum_duration_years": 3,
  "maximum_duration_years": 6
}
```

#### PUT /api/programmes/{id}

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "is_active": false
}
```

#### DELETE /api/programmes/{id}

**Headers:** `Authorization: Bearer {token}` (HOD only)

### Batch Management (HOD Only)

#### GET /api/batches

**Headers:** `Authorization: Bearer {token}` (HOD only)

#### POST /api/batches

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "programme_id": 1,
  "batch_name": "2024 Autumn Batch",
  "start_year": 2024,
  "start_semester": "AUTUMN"
}
```

#### PUT /api/batches/{id}

**Headers:** `Authorization: Bearer {token}` (HOD only)
**Request:**

```json
{
  "is_active": false
}
```

#### DELETE /api/batches/{id}

**Headers:** `Authorization: Bearer {token}` (HOD only)

### Test Users (from schema.sql)

- **Admin:** admin@gmail.com / password (No department)
- **HOD:** hod.cse@gmail.com / password (CSE Department)
- **Faculty:** faculty.cse@gmail.com / password (CSE Department)
- **Staff:** staff.cse@gmail.com / password (CSE Department)
- **Student:** student.cse@gmail.com / password (CSE Department)

### Architecture

- **Modular Design:** Separate controllers, middleware, services, and utilities
- **Security First:** Input validation, rate limiting, proper error handling
- **Database:** Singleton pattern with prepared statements
- **JWT:** Custom implementation without external dependencies
- **SOLID Principles:** Single responsibility, dependency injection ready
