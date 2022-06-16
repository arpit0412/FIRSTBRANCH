import { LightningElement, track } from 'lwc';
import getContactList from '@salesforce/apex/updateRating.updateStage';

export default class ImperativeMethod extends LightningElement {

    @track contacts;
    @track error;

    handleLoad() {
        getContactList()
            .then(result => {
                this.contacts = result;
            })
            .catch(error => {
                this.error = error;
            });
    }
}
