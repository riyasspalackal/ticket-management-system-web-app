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
### After deploy backend and replace http://127.0.0.1:8000/ with new prod link in to .env.prod