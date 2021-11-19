import { defineStore } from 'pinia';
import { appwrite, DATA_COLLECTION, USERS_COLLECTION } from '../aw';
import { Models } from 'appwrite';
import { Data, User } from '../types';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    actions: {
        async loadData() {
            const {$id} = await appwrite.account.get();
            const userDoc: User = await appwrite.database.listDocuments(USERS_COLLECTION, [`userId=${$id}`]).then((res) => {
                return res.documents[0] as User;
            });
            const dataDoc: Data = await appwrite.database.getDocument(DATA_COLLECTION, userDoc.data);
            this.user = {
                id: $id,
                userDoc: userDoc.$id,
                dataDoc: dataDoc.$id,
            }
            this.data = {
                resets: dataDoc.resets,
                password: dataDoc.password,
                confirmPassword: dataDoc.confirmPassword,
                email: dataDoc.email,
                finished: userDoc.finished,
            }
        },
    },
    state: () => {
        return {
            data: {
                resets: 0,
                password: '',
                confirmPassword: '',
                email: '',
                finished: false,
            },
            user: {
                id: '',
                userDoc: '',
                dataDoc: '',
            },
        };
    },
});