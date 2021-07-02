# Class Management System API

This is a project about REST API for a class management system

## Features

- Independent instructors can conduct class 
- Authentication endpoints - Register, Login, Logout
- CRUD endpoints for instructors to manage their classes
- CRUD endpoints for instructor to manage student participating in the class
- Studentts can see the list of classes they have registered for and corresponding instructors
- Authorization of api endpoints by middleware authentication
- Roles/Permissions for instructors and students


## Response Codes

- 200 : success
- 400 : Bad request
- 401 : Unauthorized
- 404 : Cannont be found
- 50x : Server error


## Register endpoint : "/register"

You send your registration details

```sh
Request : POST
Accept : application/json
Content-type : application/json

{
    "fname" : "fname",
    "lname" : "lname",
    "email" : "example@exam.com",
    "password" : "*****",
    "role" : "instructor/student"
}


Successful Response : 201 Created
"User Registerd Successfully"

Failed Response : 400 Bad Request
"User already exist"
or
500 Server Error
Error

```


## Login endpoint : "/login"

Send your credentials and Authentication-Token will be automatically stored for access other endpoints
```sh
Request : POST
Accept : application/json
Content-type : application/json

{
    "email" : "example@exam.com",
    "password" : "*****"
}

Successful Response : 200 OK
"Looged in Succesfully"

Failed Response : 500 Server Error
Error


```


## Instructors endpoint : "/instructors"

Instructors get their own data 

```sh
Request : GET
Accept : application/json
Content-type : application/json

{
    "fname" : "fname",
    "lname" : "lname",
    "email" : "example@exam.com",
    "password" : "*****",
    "role" : "instructor",
    ....
}

Successful Response : 200 OK
get user data

Failed Response : 401 Unauthorized
"Unauthenticated user"
```

Instructors can schadule their classees

```sh
Request : POST
Accept : application/json
Content-type : application/json

{
    "instructorName" : "Your Name"
    "title" : "Python",
    "date" : "xx/xx/xxxx",
    "time" : "10:00 AM"
}

Successful Response : 200 OK
"Class Created Successfully"

Failed Response : 500 Server Error
Error
```

Instructors can modify their schaduled classees by sending classId and modified info

```sh
Request : PATCH
Accept : application/json
Content-type : application/json

get this data from client side
{
    "classId" : "fhhj4rj3ju3jdi..."
    "title" : "JavaScript",
    ......
}

Successful Response : 200 OK
"Update Successfully"

Failed Response : 500 Server Error
Error
```

Instructors can delete their schaduled classees by sending classId

```sh
Request : DELETE
Accept : application/json
Content-type : application/json

get this data from client side
{
    "classId" : "fhhj4rj3ju3jdi..."
}

Successful Response : 200 OK
"Deleted Successfully"

Failed Response : 500 Server Error
Error
```


## Classes endpoint : "/classes"

Get all the schaduled classes

```sh
Request : GET
Accept : application/json
Content-type : application/json

{
    {
        "title": "Python",
        .....
    }
     {
        "title": "JavaScript",
        .....
    }
}

Successful Response : 200 OK
get classes

Failed Response : 500 Server Error
Error
or
401 Unauthorized
"Unauthenticated User"
```

Students can do registration in any class by sending "studentId" and "classId"

```sh
Request : POST
Accept : application/json
Content-type : application/json

{
    "studentId" : "fw4f4748yrr....",
    "classId" : "bd378y82hd...."
}

Successful Response : 200 OK
"Registerd For Class Successfully"

Failed Response : 500 Server Error
Error
```


## Student endpoint : "/student"

Students get all the classes for which they had registered

```sh
Request : GET
Accept : application/json
Content-type : application/json

{
    {
        "title": "Python",
        .....
    },
    .....
}

Successful Response : 200 OK
get registered classes

Failed Response : 500 Server Error
Error
or
401 Unauthorized
"Unauthenticated User"
```


## Instructor endpoint : "/instructor"

Instructor get all the classes they have scheduled

```sh
Request : GET
Accept : application/json
Content-type : application/json

{
    {
        "title": "Python",
        .....
    },
    .....
}

Successful Response : 200 OK
get schaduled classes

Failed Response : 500 Server Error
Error
or
401 Unauthorized
"Unauthenticated User"
```

Instructors can remove students from their schaduled classees by sending "classId" and "studentId"

```sh
Request : DELETE
Accept : application/json
Content-type : application/json

get this data from client side
{
    "classId" : "fhhj4rj3ju3jdi...."
    "studentId" : "b63td83j2q9...."
}

Successful Response : 200 OK
"Participant Removed Successfully"

Failed Response : 500 Server Error
Error
```


## Logout endpoint : "/logout"

User authentication removed from endpoints

```sh
Request : POST
Accept : application/json
Content-type : application/json

Successful Response : 200 OK
"logged out"
```

