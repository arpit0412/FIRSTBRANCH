import { LightningElement,api, track } from 'lwc';
import {updateOppRecord} from'@salesforce/apex/ChangeStage.updateOppRecord'; 
//import {NavigationMixin} from 'lightning/navigation';
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//import Opportunity_OBJECT from '@salesforce/schema/Opportunity';

export default class ChangeStage extends LightningElement {

     @track recordId;
     @api Opportunity;
   @track isModalOpen = false;
   @track isOpenModalTwo = false;
  
buttonClick(){
    updateOppRecord({recordId : this.recordId})
    .then((result) =>{
        this.recordId = result;
        this.error = undefined;
    })
    .catch((error)=>{
        this.error = error;
        this.recordId = undefined;
    });

}
openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;

}
closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
    this.isOpenModalTwo = true;
}


        // opportunityMetadata;
    
        // // now retriving the StageName picklist values of Opportunity
    
        //   @wire(getPicklistValues,
    
        //       {
    
        //       recordTypeId: '$opportunityMetadata.data.defaultRecordTypeId', 
    
        //           fieldApiName: StageName_FIELD
    
        //      }
    
        //   )
       
    
        // OpportunityPicklist;
    
      

//    @wire(getRecord, { recordId: '$recordId', fields: [Stage] })

//    handleSubmit(event)
//     {
//         const fields = event.detail.fields;
//         fields.Stage = "Closed Won";
      
//         this.template.querySelector('lightning-record-edit-form').submit(fields);
//      }

    // handleSuccess(e){   
    //     this.dispatchEvent(new closeActionScreenEvent());
    //     this.dispatchEvent(
    //         new showToastEvent({
    //             title:'Success',
    //             Message:'opportunity stage succesfully changed',
    //             variant:'Success'
    //         })
    //     );
    // }

   
    
    // navigateToRecordPage() {
      
    //      this[NavigationMixin.Navigate]({
    //         type: 'standard__recordPage',
    //         attributes: {
    //              recordId: this.recordId,
    //             //objectApiName: 'Case', // objectApiName is optional
    //             actionName: 'edit'
    //         }
    //      })
    // }

    // handleChange(event){
    //     this.template.querySelector('lightning-input[data-name="StageName"]').value = "Closed Won";    
    //   }
    
    //   updateText(event) {
    //     this.outputText = this.template.querySelector('lightning-input').value;
    // }


       
    ////////////////////////////////////

  //-------     --Edit the picklist value (kary pragati pr h)--------------
/* StageValue ='';
    Prospecting= '';
    Qualification = '';
    NeedsAnalysis = '';
    ValueProposition = '';
    IdDecisionMakers = '';
    PerceptionAnalysis = '';
*/
 
    // getting the default record type id, if you dont' then it will get master
 
    // @wire(getObjectInfo, { objectApiName: Opportunity_OBJECT })
 
    // opportunityMetadata;
 
    // // now retriving the StageName picklist values of Opportunity
 
    //   @wire(getPicklistValues,
 
    //       {
 
    //       recordTypeId: '$opportunityMetadata.data.defaultRecordTypeId', 
 
    //           fieldApiName: StageName_FIELD
 
    //      }
 
    //   )
    
 
    // OpportunityPicklist;
 
    // display the selected picklist value
  
 
    // handleChange(event) {
 
    //     this.StageName = event.detail.value;
    //     this.picklistVal = this.StageName;
    //     console.log("xxx");
         
    //    if(this.picklistVal != null){
    //       // this.picklistVal == 'ClosedWon ';
    //       //this.picklistVal = 'ClosedWon ' ;
    //       console.log("xyx");
    //    }else{
    //     (this.picklistVal == 'ClosedWon')
    //             addError('errorr hu mee')
    //     }
             
           
    //    }

  





// import { LightningElement,wire,api, track } from 'lwc';
// import{showToastEvent} from'lightning/platformShowToastEvent';
// import{closeActionScreenEvent} from 'lightning/actions'
// import {NavigationMixin} from 'lightning/navigation';
// import { getObjectInfo } from 'lightning/uiObjectInfoApi';
// import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import Opportunity_OBJECT from '@salesforce/schema/Opportunity';
// import StageName_FIELD from '@salesforce/schema/Opportunity.StageName';


// export default class ChangeStage extends NavigationMixin(LightningElement) {
//     @api recordId;
//     @api Opportunity;
//     @track isModalOpen = false;
//     //StageName;
//    // @track isOpenModalTwo = false;
//     handleSuccess(e){
//         this.dispatchEvent(new closeActionScreenEvent());
//         this.dispatchEvent(
//             new showToastEvent({
//                 title:'Success',
//                 Message:'opportunity stage succesfully changed',
//                 variant:'Success'
//             })
//         );
//     }

//     openModal() {
//         // to open modal set isModalOpen tarck value as true
//         this.isModalOpen = true;

//     }
//     closeModal() {
//         // to close modal set isModalOpen tarck value as false
//         this.isModalOpen = false;
//        // this.isOpenModalTwo = false;
//     }

//   navigateToRecordPage() {
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: this.recordId,
//                 //objectApiName: 'Case', // objectApiName is optional
//                 actionName: 'edit'
//             }
//         })
//     }
//   //-------     --Edit the picklist value (kary pragati pr h)--------------
//     StageValue ='';
//     Prospecting= '';
//     Qualification = '';
//     NeedsAnalysis = '';
//     ValueProposition = '';
//     IdDecisionMakers = '';
//     PerceptionAnalysis = '';
 
//     // getting the default record type id, if you dont' then it will get master
 
//     @wire(getObjectInfo, { objectApiName: Opportunity_OBJECT })
 
//     opportunityMetadata;
 
//     // now retriving the StageName picklist values of Opportunity
 
//       @wire(getPicklistValues,
 
//           {
 
//           recordTypeId: '$opportunityMetadata.data.defaultRecordTypeId', 
 
//               fieldApiName: StageName_FIELD
 
//          }
 
//       )
    
 
//     OpportunityPicklist;
 
//     // display the selected picklist value
  
 
//     handleChange(event) {
 
//         this.StageValue = event.detail.value;
//         this.picklistVal = this.StageValue;
//        // console.log("xxx");
//        this.picklistVal ==  'CloseWon'; 

         
//         if(this.picklistVal == 'Prospecting'|| 'Qualification' || 'NeedsAnalysis' || 'ValueProposition' || 'IdDecisionMakers' || 'PerceptionAnalysis'){
//            this.picklistVal = 'ClosedWon ' ;
//            console.log("xyx");
//         }else{
//          (this.picklistVal == 'ClosedWon')
//                  addError('errorr hu mee')
//          }
             
           
//        }


    //    handleClick() {
    //     //4. map the data to the fields
    //   const fields = {};
  
    //   fields[ID_FIELD.fieldApiName] = this.recordId;
    //   fields[NAME_FIELD.StageName] = this.Stage;
          
    //       //5. Create a config object that had info about fields. 
    //       //Quick heads up here we are not providing Object API Name
    //   const recordInput = {
    //     fields: fields
    //   };
  
    //       //6. Invoke the method updateRecord()
    //   updateRecord(recordInput).then((record) => {
    //     console.log(record);
    //   });
    // }
       
     // ChangeStage(updatefield){
        
    //     updateOppRecord({OppId:updatefield})
    //     .then(data) =>{
    //         if(data){
    //             for(const list of data){



    //     //             constoption= {
    //     //                 label:list.Name;
    //     //                 value:list.id;
    //     //             }
    //     //         }

    //         }
    //         .catch(error) => {

    //         }


    //     }
    // }
 
} 
    
    
    
