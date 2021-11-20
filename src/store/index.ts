import { defineStore } from 'pinia';
import { appwrite, DATA_COLLECTION, USERS_COLLECTION } from '../aw';
import { Models } from 'appwrite';
import { Data, User } from '../types';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
        actions: {
            async loadData(): Promise<boolean> {
                console.log('loading 👽')
                const user = await appwrite.account.get().then((res) => {
                        return res;
                    },
                    (err) => {
                        console.log('user');
                        console.error(err);
                    },
                );
                console.log('user', user);
                if (!user) return false;
                const $id = user.$id
                heap.identity($id);
                const userDoc: User | void = await appwrite.database.listDocuments(USERS_COLLECTION, [`userId=${$id}`]).then((res) => {
                    return res.documents[0] as User;
                }, (err) => {
                    console.log('userDoc');
                    console.error(err);
                });
                console.log('userDoc', userDoc);
                if (!userDoc) return false;
                const dataDoc: Data = await appwrite.database.getDocument(DATA_COLLECTION, userDoc.data);
                this.user = {
                    id: $id,
                    userDoc: userDoc.$id,
                    dataDoc: dataDoc.$id,
                };
                this.data = {
                    resets: dataDoc.resets,
                    password: dataDoc.color,
                    confirmPassword: dataDoc.movie,
                    email: dataDoc.name,
                    finished: userDoc.finished,
                };
                return true;
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
    })
;