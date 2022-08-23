const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN';

const accountToken = {
    get token() {
        return window.localStorage.getItem(ACCOUNT_TOKEN);
    },
    set token(value) {
        window.localStorage.setItem(ACCOUNT_TOKEN, value);
    }
};

export default accountToken;
