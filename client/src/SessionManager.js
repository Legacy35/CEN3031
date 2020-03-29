import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export const isLoggedIn = () => {
    return cookies.get('token');
}

export const login = (email, password, views, setViews, setUserData) => {

    axios.get("/apis/authenticate/authenticate.php?email=" + email + "&password=" + password).then(
        (res) => {
            if (res.data.error) {
                alert(res.data.error)
            } else if (res.data.token) {

                let token = res.data.token;
                cookies.set('token', token);

                axios.get('/apis/authenticate/whois.php?token=' + token).then(
                    (res) => {
                        setUserData(res.data);
                        let newViews = { ...views };
                        let keys = Object.keys(newViews);
                        for (let i = 0; i < keys.length; i++) {
                            newViews[keys[i]] = false;
                        }
                        newViews['userProfile'] = true;

                        setViews(newViews);
                    }
                ).catch(
                    (err) => {
                        alert(err);
                    }
                );

            }
        }
    ).catch(
        (err) => {
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

export const loadProfile = async (setUserData, views, setViews) => {
    if (isLoggedIn()) {

        let userData;

        await axios.get('/apis/authenticate/whois.php?token=' + cookies.get('token')).then(
            (res) => {
                if (res.data.id) {
                    res.data.admin = (res.data.admin == 1) ? true : false;
                    userData = res.data;
                    let newViews = { ...views };
                    Object.keys(newViews).forEach((element) => {
                        newViews[element] = false;
                    });
                    newViews['userProfile'] = true;
                    setViews(newViews);
                } else if (res.data.error) {
                    logout(views, setViews, setUserData);
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

        await axios.get('/apis/quizzes/quiz/scores').then(
            (res) => {
                userData.quizScores = res.data;
            }
        )
            .catch(
                (err) => {
                    throw err;
                }
            )

        setUserData(userData);

    }
}

