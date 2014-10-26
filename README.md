#teamwall

An open source software used to build a wall of picture for your team

## Prerequisites

You will need [Leiningen][] 2.0.0 or above installed.

[leiningen]: https://github.com/technomancy/leiningen

## Running

To start a web server for the application, run:

    lein ring server
    
The web server should be reachable at `localhost:3000`.

## API

### Login

First step is to login to retrieve an API token which will be used for every other request.

#### Path

    /login

#### Parameters
    
| Params | Description|
--------|--------
| _email_ | the email address used to register|
| _password_| the password used to register|

#### Respond

A JSON string with two keys:

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


## License

Copyright © 2014 Benjamin Van Ryseghem <benjamin [dot] vanryseghem [at] gmail [dot] com>
