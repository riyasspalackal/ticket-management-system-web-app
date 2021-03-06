# EVENT MANAGEMENT SYSTEM

A Quasar Framework app

## First, we install Quasar CLI. Make sure you have Node >=8 and NPM >=5 installed on your machine.
make sure you have vue-cli globally installed
```bash
npm install -g vue-cli
```
```bash
npm install -g quasar-cli
```

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Before starting web app need to run 'ticket-management-system-laravel' backend application


### Dotenv module is used for loads environment variables from a .env file into process.env.
### All API's Fetch from .env file


### Production Build Steps
bash script for development purpose
### To run this bash from terminal ./run_server.sh dev,qa,staging,prod if no env it will fallback to prod
```bash
./run_server.sh prod
```
### After deploy backend and replace http://127.0.0.1:8000/ with new PROD link in to .env.prod file

#### EVENT MANAGEMENT SYSTEM UI
#### LOGIN PAGE 
<img width="1669" alt="Screenshot 2021-04-09 at 9 28 55 PM" src="https://user-images.githubusercontent.com/15151953/114207986-98969f80-997a-11eb-8323-d3afb3c4a061.png">

#### Two type of user
* admin user :- admin user can create event registration and view statics of event
  * username : admin
  * password : admin123
* user   :- user can create booking 
  * username : user
  * password : admin123

#### ADMIN DASHBOARD 
<img width="1673" alt="Screenshot 2021-04-09 at 9 31 54 PM" src="https://user-images.githubusercontent.com/15151953/114208361-02af4480-997b-11eb-84f4-17e49127b81e.png">

#### VIEW EVENT LIST
You can create event from ADD NEW Button and also Edit and Delete event is possible from here.
<img width="1675" alt="Screenshot 2021-04-09 at 9 36 00 PM" src="https://user-images.githubusercontent.com/15151953/114208862-96811080-997b-11eb-86c6-3ead14d8b834.png">

#### CREATE NEW EVENT
<img width="1679" alt="Screenshot 2021-04-09 at 9 37 28 PM" src="https://user-images.githubusercontent.com/15151953/114209013-ca5c3600-997b-11eb-8c6a-9a5a710ca9d5.png">
Add date and time for event lineups
<img width="1671" alt="Screenshot 2021-04-09 at 9 49 43 PM" src="https://user-images.githubusercontent.com/15151953/114210534-823e1300-997d-11eb-9f89-265e4ffb00ad.png">
<img width="1675" alt="Screenshot 2021-04-09 at 9 50 48 PM" src="https://user-images.githubusercontent.com/15151953/114210909-a7328600-997d-11eb-9015-f51406d5d7cf.png">

#### EVENT LINEUPS
<img width="1670" alt="Screenshot 2021-04-09 at 9 39 29 PM" src="https://user-images.githubusercontent.com/15151953/114209283-1313ef00-997c-11eb-9593-de8a89204c51.png">

#### USER DASHBOARD
Here user can create ticket booking and view history of ticket booking
<img width="1676" alt="Screenshot 2021-04-09 at 9 44 29 PM" src="https://user-images.githubusercontent.com/15151953/114209888-c4b32000-997c-11eb-81e1-f9dd28fd7160.png">

<img width="1680" alt="Screenshot 2021-04-09 at 9 48 39 PM" src="https://user-images.githubusercontent.com/15151953/114210385-5ae74600-997d-11eb-813d-50fba218a824.png">


#### TICKET BOOKING PAGE
Here you can select event and know the availability of ticket.
<img width="1676" alt="Screenshot 2021-04-09 at 9 46 22 PM" src="https://user-images.githubusercontent.com/15151953/114210137-093ebb80-997d-11eb-8434-dea186c066ee.png">








 



