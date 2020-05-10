import { Alert } from 'react-native';
import { GLOBAL_STATE } from './Store';

export const request = (url, method, callback) => {
    fetch(url, {
        method: method,
        headers: {
            "Authorization": "JWT "+GLOBAL_STATE.JWT
        }
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(response => {
        callback(response);
    })
    .catch(error => {
        Alert.alert("Network error", error.message);
    });
};

export const refreshDashboard = () => {
    request("https://getpassiv.com/api/v1/portfolioGroups", "GET", (response) => {
        if (response.status == 200) {
            GLOBAL_STATE.portfolios = [];
            for (var i = 0; i < response.body.length; i++) {
                let li = i;
                request("https://getpassiv.com/api/v1/portfolioGroups/"+response.body[li].id+"/info", "GET", (group) => {
                    GLOBAL_STATE.portfolios.push(group.body);
                });
            }
            Alert.alert("body", JSON.stringify(GLOBAL_STATE.portfolios));
        } else {
            Alert.alert(response.status+"", JSON.stringify(response.body));
        }
    });
};
