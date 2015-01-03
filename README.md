#teamwall

| Branch | Status |
--------|--------
| Master | [[![Build Status](https://travis-ci.org/teamwall/teamwall.svg?branch=master)](https://travis-ci.org/teamwall/teamwall)](https://travis-ci.org/teamwall/teamwall) |
| Develop | [[![Build Status](https://travis-ci.org/teamwall/teamwall.svg?branch=develop)](https://travis-ci.org/teamwall/teamwall)](https://travis-ci.org/teamwall/teamwall)|

An open source software used to build a wall of picture for your team

## Contents

- [Prerequisites](#prerequisites)
- [Running](#running)
- [Server configuration](#server-configuration)
    - [config subcommand](#config-subcommand)
    - [CLI arguments](#cli-arguments)
- [API](#api)
    - [Login](#login)
        - [Path & Verb](#path-verb)
        - [Parameters](#parameters)
        - [Response](#response)
        - [Status](#status)
    - [Get current user](#get-current-user)
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
    - [Get last photo of a user](#get-last-photo-of-a-user)
        - [Path & Verb](#path-verb)
        - [Parameters](#parameters)
        - [Response](#response)
        - [Status](#status)
- [License](#license)

<!-- end toc -->

## Prerequisites

You will need [Leiningen][1] 2.0.0 or above installed.

You will also need [Mongo][2] database running.

Other dependencies can be installed running:

    $ bower install

[1]: https://github.com/technomancy/leiningen
[2]: http://www.mongodb.org/

## Running

The first time you want to run the application,
you first need to build the client part. To do so, run:

    $ lein cljsbuild once

To start a web server for the application, run:

    $ lein run

The web server should be reachable at `localhost:3000`.

By default, _Teamwall_ is served using HTTP but it is highly recommended to serve it using HTTPS.
This can be easily done using [Nginx](http://nginx.org/en/) as detailled [here](https://github.com/teamwall/teamwall/wiki/HTTPS).

## Server configuration

There is two kind of settings which can be provided to _Teamwall_.
The first kind contains the settings that can be stored into the databse.
The second kind contains the databases settings.

### config subcommand

The `config` subcommand can be used to set the port used to serve the application.

    $ lein run config --port PORT

The help text can be seen using the command:

    $ lein run config --help

### CLI arguments

This settings concern mainly the database access.
The list of available options can be found running: 

    $ lein run -- --help

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

A JSON string representing a literal object with three keys:

* token: a string representing the unique API token
* user: a map representing the current user
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

### Get current user

The route is used to provide information about the current logged user.
It is mainly used when you log in back using the cookie stored token.

#### Path & Verb

To get all the team members, a **GET** request needs to be done against the path:

    /current-user

#### Parameters

| Params | Type | Description|
--------|--------|--------
| token | url param | the API token received during the login |

cURL example:

    $ curl "localhost:3000/current-user?token=JSzvjh_Qq0zGjLu7pL-9tvGrl84DwgMNT4vZ_F4IxC"


#### Response

A JSON string representing a literal object.
This object has two keys:

* username
* email

Example:

~~~json
{
  "username" : "User 1",
  "email" : "user1@mycompany.com"
}
~~~

#### Status

| Cause | Status |
--------|--------
| Success | 200 OK |
| Field _token_ missing or invalid | 403 Forbidden |

### Get team members

The route is used to provided information about the members of the team the logged user belongs to.
The team is bound by a shared email domain.

#### Path & Verb

To get all the team members, a **GET** request needs to be done against the path:

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
| Field _token_ missing or invalid | 403 Forbidden |

### Upload a new photo

Route used to upload a new photo for the user linked to the provided token.

#### Path & Verb

To upload a new photo, a **POST** request needs to be done against the path:

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
| Field _token_ missing or invalid | 403 Forbidden |
| Field _photo_ missing | 400 Bad Request |

### Get last photo of a user

This route is used to get the last photo of a giver user.
#### Path & Verb

To get the latest photo, a **GET** request needs to be done against the path:

    /<email>/last-photo

#### Parameters

| Params | Type | Description|
--------|--------|---------
| email | url segment | the email address of one of your team member |
| token | url param | the API token received during the login |


cURL example:

    $ curl "http://localhost:3000/user1@mycompany.com/last-photo?token=JSzvjh_Qq0zGjLu7pL-9tvGrl84DwgMNT4vZ_F4IxC"


#### Response

Return an image. The url is made so it can be used as html image source.

#### Status

| Cause | Status |
--------|--------
| Success | 200 OK |
| Email address not in the same team | 400 Bad Request |
| Field _token_ missing or invalid | 403 Forbidden |
| No photo available | 404 Not Found |



## License

Copyright © 2014 Benjamin Van Ryseghem <benjamin [dot] vanryseghem [at] gmail [dot] com>
