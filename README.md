#teamwall

An open source software used to build a wall of picture for your team

## Contents

- [Prerequisites](#prerequisites)
- [Running](#running)
- [API](#api)
    - [Login](#login)
        - [Path & Verb](#path-verb)
        - [Parameters](#parameters)
        - [Respond](#respond)
        - [Status](#status)
    - [Get team members](#get-team-members)
        - [Path & Verb](#path-verb)
        - [Parameters](#parameters)
        - [Respond](#respond)
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
    
| Params | Description|
--------|--------
| email | the email address used to register|
| password | the password used to register|

cURL example:

    $ curl "localhost:3000/login?email=email&password=password"

#### Respond

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

| Repond | Status |
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
    
| Params | Description|
--------|--------
| token | the API token received during the login |

cURL example:

    $ curl "localhost:3000/team-members?token=JSzvjh_Qq0zGjLu7pL-9tvGrl84DwgMNT4vZ_F4IxC"


#### Respond

A JSON string representing an array of literal objects.
Each object has two keys:

* username
* eamil

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

| Repond | Status |
--------|--------
| Success | 200 OK |
| Error | 404 Not Found |


## License

Copyright © 2014 Benjamin Van Ryseghem <benjamin [dot] vanryseghem [at] gmail [dot] com>
