import axios from "axios";

const user_details = JSON.parse(localStorage.getItem("user_details"))
const access_token = user_details ? user_details.access_token : '';
const token_type = user_details ? user_details.token_type : '';

export default class Request {


  submitEventRegistration(data, callback) {
    console.log(access_token);
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(
            process.env.EVENT_REGISTRATION_URL, data, {
                    headers: {
                        'Authorization': token_type + access_token
                    }
                }
          )
          .then(response => {
            if (response ) {
              resolve(response);
            }
          });
      } catch (err) {
        callback(data);
      }
    })
  }

  getAllEvent(callback) {
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(
            process.env.GET_ALL_EVENT, {
                    headers: {
                        'Authorization': token_type + access_token
                    }
                }
          )
          .then(response => {
            if (response ) {
              resolve(response);
            }
          });
      } catch (err) {
        callback(data);
      }
    })
  }

  getLineUpByEventId(id,callback) {
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(
            process.env.GET_LINEUP_BY_EVENT_ID + '/' + id, {
                    headers: {
                        'Authorization': token_type + access_token
                    }
                }
          )
          .then(response => {
            if (response ) {
              resolve(response);
            }
          });
      } catch (err) {
        callback(data);
      }
    })
  }
}