import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export const isLoggedIn = () => {
    return cookies.get('token');
}
//if (res.data.error == "Invalid email address or password." || res.data.error == "Specified account does not exist."){
export const login = (email, password, views, setViews, userData, setUserData) => {

    axios.get("/apis/authenticate/authenticate.php?email=" + email + "&password=" + password).then(
        (res) => {
            console.log(res);
            if (res.data.error) {
                alert(res.data.error);
            } else if (res.data.token) {
                let token = res.data.token;
                cookies.set('token', token);

                axios.get('/apis/authenticate/whois.php?token=' + token).then(
                    (res) => {
                        if (res.data.error) {
                        }
                        setUserData(res.data);
                        loadProfile(views, setViews, userData, setUserData);
                    }
                ).catch(
                    (err) => {
                        console.log(err);
                    }
                );

            }
        }
    ).catch(
        (err) => {
            alert("hi6");
            console.log(err);
        }
    );

}

export const logout = (views, setViews, setUserData) => {
    setUserData({});
    cookies.remove('token');
    const newViews = { ...views };
    const keys = Object.keys(views);
    for (let i = 0; i < keys.length; i++) {
        newViews[keys[i]] = false;
    }
    newViews['login'] = true;
    setViews(newViews);
}

export const loadProfile = async (views, setViews, userData, setUserData, selectTab) => {

    if (!isLoggedIn()) {
        let newUserData = {...userData};
        let keys = Object.keys(newUserData);
        for(let i = 0; i < keys.length; i++){
            newUserData[keys[i]] = undefined;
        }
        setUserData(newUserData);
        return;
    }

    let newUserData;

    await axios.get('/apis/authenticate/whois.php?token=' + cookies.get('token'))
    .then(
        (res) => {
            if (res.data.id) {
                res.data.admin = (res.data.admin == 1) ? true : false; //Needed for an === check elsewhere
                newUserData = res.data;
                console.log(res.data)
                if (selectTab !== false) {
                    let newViews = { ...views };
                    Object.keys(newViews).forEach((element) => {
                        newViews[element] = false;
                    });
                    newViews['userProfile'] = true;
                    setViews(newViews);
                }
            } else if (res.data.error) {
                logout(views, setViews, setUserData);
            }
        }
    ).catch(
        (err) => {
            if(err) throw err;
        }
    );

    setUserData(newUserData);

}
