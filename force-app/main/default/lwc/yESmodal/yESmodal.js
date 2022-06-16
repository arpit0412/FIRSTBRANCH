import { LightningElement,track } from 'lwc';

export default class YESmodal extends LightningElement {

    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;
    @track isOpenModalTwo = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = false;

    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
        this.isOpenModalTwo = true;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
    openSecondModal(){
         isModalOpen = false;
    isOpenModalTwo = true;
    }
}
