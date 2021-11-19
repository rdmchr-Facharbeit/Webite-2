import { Appwrite } from 'appwrite';
import { useStore } from './store';

// Init your Web SDK
const appwrite = new Appwrite();

const USERS_COLLECTION = '61943253f1168';
const DATA_COLLECTION = '619431ff88e21';

const feedbackFunction = '619610d5d2bbe';

appwrite
    .setEndpoint('https://api.gettooru.com/v1') // Your Appwrite Endpoint
    .setProject('6193ae37b6810'); // Your project ID

async function createSession() {
    return await appwrite.account.createAnonymousSession().then((res) => {
        console.log(res);
        return true;
    }).catch((err) => {
        console.log(err);
        return false;
    });
}

async function isAuthenticated() {
    return await appwrite.account.get().then(() => true).catch(() => false);
}

async function registerReset() {
    const store = useStore();
    const data = await appwrite.database.updateDocument(DATA_COLLECTION, store.user.dataDoc, {
        resets: store.data.resets,
    });
    return;
}

async function registerSubmit(email: string, password: string, confirmPassword: string) {
    const store = useStore();
    await appwrite.database.updateDocument(DATA_COLLECTION, store.user.dataDoc, {
        name: email,
        color: password,
        movie: confirmPassword,
    });
}

async function submitFeedback(rating: number, branch: string) {
    const data = {
        rating,
        branch
    };

    await appwrite.functions.createExecution(feedbackFunction, JSON.stringify(data));
}

export {
    createSession,
    registerReset,
    registerSubmit,
    isAuthenticated,
    submitFeedback,
    USERS_COLLECTION,
    DATA_COLLECTION,
    appwrite,
};