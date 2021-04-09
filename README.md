# EVENT MANAGEMENT SYSTEM

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Dotenv module is used for loads environment variables from a .env file into process.env.
### All API's Fetch from .env file


### Production Build Steps
bash script for development purpose
### To run this bash from terminal ./run_server.sh dev,qa,staging,prod if no env it will fallback to prod
```bash
./run_server.sh prod
```
### After deploy backend and replace http://127.0.0.1:8000/ with new PROD link in to .env.prod file

########### LOGIN PAGE
<img width="1669" alt="Screenshot 2021-04-09 at 9 28 55 PM" src="https://user-images.githubusercontent.com/15151953/114207986-98969f80-997a-11eb-8323-d3afb3c4a061.png">

#### Two type of user
* admin user :- admin user can create event registration and view statics of event
  * username : admin
  * password : admin123
* user   :- user can create booking 
  * username : user
  * password : admin123
 



