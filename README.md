#teamwall

An open source software used to build a wall of picture for your team

## Contents

- [Prerequisites](#prerequisites)
- [Running](#running)
- [API](#api)
    - [Login](#login)
        - [Path & Verb](#path-verb)
        - [Parameters](#parameters)
        - [Response](#response)
        - [Status](#status)
    - [Get team members](#get-team-members)
        - [Path & Verb](#path-verb)
        - [Parameters](#parameters)
        - [Response](#response)
        - [Status](#status)
    - [Upload a new photo](#upload-a-new-photo)
        - [Path & Verb](#path-verb)
        - [Parameters](#parameters)
        - [Response](#response)
        - [Status](#status)
- [License](#license)

<!-- end toc -->

## Prerequisites

You will need [Leiningen][1] 2.0.0 or above installed.

You will also need [Mongo][2] database running.

[1]: https://github.com/technomancy/leiningen
[2]: http://www.mongodb.org/

## Running

To start a web server for the application, run:

    lein ring server
    
The web server should be reachable at `localhost:3000`.

## API

### Login

First step is to login to retrieve an API token which will be used for every other request.

#### Path & Verb

To login, a **GET** request needs to be done against the path:

    /login

#### Parameters
    
| Params | Type | Description|
--------|--------|--------
| email | url param | the email address used to register|
| password | url param | the password used to register|

cURL example:

    $ curl "localhost:3000/login?email=email&password=password"

#### Response

A JSON string representing a literal object with two keys:

* token: a string representing the unique API token
* ttl: the token time-to-live

Example:

~~~json
{
	"token" : "JSzvjh_Qq0zGjLu7pL-9tvGrl84DwgMNT4vZ_F4IxC",
	"ttl"   : "3600000"
}
~~~

Note: _ttl_ is in milliseconds, `3600000` is one hour.

#### Status

| Cause | Status |
--------|--------
| Success | 200 OK |
| Error | 403 Forbidden |

### Get team members

The route is used to provided information about the members of the team the logged user belongs to.
The team is bound by a shared email domain.

#### Path & Verb

To login, a **GET** request needs to be done against the path:

    /team-members

#### Parameters
    
| Params | Type | Description|
--------|--------|--------
| token | url param | the API token received during the login |

cURL example:

    $ curl "localhost:3000/team-members?token=JSzvjh_Qq0zGjLu7pL-9tvGrl84DwgMNT4vZ_F4IxC"


#### Response

A JSON string representing an array of literal objects.
Each object has two keys:

* username
* email

Example:

~~~json
[ {
  "username" : "User 1",
  "email" : "user1@mycompany.com"
}, {
  "username" : "User 2",
  "email" : "user2@mycompany.com"
} ]
~~~

#### Status

| Cause | Status |
--------|--------
| Success | 200 OK |
| field _token_ missing or invalid | 404 Not Found |

### Upload a new photo

Route used to upload a new photo for the user linked to the provided token.

#### Path & Verb

To login, a **POST** request needs to be done against the path:

    /new-photo

#### Parameters
    
| Params | Type | Description|
--------|--------|---------
| token | url param | the API token received during the login |
| photo | multipart/form-data | the new photo to upload |

cURL example:

    $ curl --form photo=@photo.png "localhost:3000/new-photo?token=JSzvjh_Qq0zGjLu7pL-9tvGrl84DwgMNT4vZ_F4IxC"


#### Response

No response.

#### Status

| Cause | Status |
--------|--------
| Success | 200 OK |
| field _token_ missing or invalid | 404 Not Found |
| field _photo_ missing | 400 Bad Request |


## License

Copyright © 2014 Benjamin Van Ryseghem <benjamin [dot] vanryseghem [at] gmail [dot] com>
