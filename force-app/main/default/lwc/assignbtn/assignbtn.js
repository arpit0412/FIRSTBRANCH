import { LightningElement,track} from 'lwc';
// import server side apex class method 
import getUserList from '@salesforce/apex/UserAssignmentController.getUserList';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class customSearch extends LightningElement {

@track showModal = false;

openModal() {
this.showModal = true;
}

@track usersRecord;
searchValue = '';
// update searchValue var when input field value change
searchKeyword(event) {
    this.searchValue = event.target.value;
}

// call apex method on button click 
handleSearchKeyword() {
    
    if (this.searchValue !== '') {
        getUserList({
                searchKey: this.searchValue
            })
            .then(result => {
                // set @track Users variable with return User list from server  
                console.log('users',result);
                this.usersRecord = result;
            })
            .catch(error => {
                
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);
                // reset Users var with null   
                this.usersRecord = null;
            });
    } else {
        // fire toast event if input field is blank
        const event = new ShowToastEvent({
            variant: 'error',
            message: 'Search text missing..',
        });
        this.dispatchEvent(event);
    }
}

closeModal() {
this.showModal = false;
}
}