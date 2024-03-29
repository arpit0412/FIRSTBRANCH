import { LightningElement, wire , track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import fetchEvents from '@salesforce/apex/FullCalendar.fetchEvents';
import createEvent from '@salesforce/apex/FullCalendar.createEvent';
import deleteEvent from '@salesforce/apex/FullCalendar.deleteEvent';
import { refreshApex } from '@salesforce/apex';
export default class Fullcalendar extends LightningElement {


    fullCalendarJsInitialised = false;

    //Fields to store the event data -- add all other fields you want to add
    title;
    startDate;
    endDate;

    eventsRendered = false;//To render initial events only once
    // openSpinner = false; //To open the spinner in waiting screens
    openModal = false; //To open form

    @track
    events = []; //all calendar events are stored in this field

    //To store the orignal wire object to use in refreshApex method
    eventOriginalData = [];

    //Get data from server - in this example, it fetches from the event object
    @wire(fetchEvents)
    eventObj(value){
        this.eventOriginalData = value; //To use in refresh cache

        const {data, error} = value;
        if(data){
            //format as fullcalendar event object
            console.log(data);
            let events = data.map(event => {
                return { id : event.Id, 
                        title : event.Subject, 
                        start : event.StartDateTime,
                        end : event.EndDateTime,
                        allDay : event.IsAllDayEvent};
            });
            this.events = JSON.parse(JSON.stringify(events));
            console.log(this.events);
            this.error = undefined;

            //load only on first wire call - 
            // if events are not rendered, try to remove this 'if' condition and add directly 
            if(! this.eventsRendered){
                //Add events to calendar
                const ele = this.template.querySelector("div.fullcalendarjs");
                $(ele).fullCalendar('renderEvents', this.events, true);
                this.eventsRendered = true;
            }
        }else if(error){
            this.events = [];
            this.error = 'No events are found';
        }
   }

   /**
    * Load the fullcalendar.io in this lifecycle hook method
    */
   renderedCallback() {
      // Performs this operation only on first render
      if (this.fullCalendarJsInitialised) {
         return;
      }
      this.fullCalendarJsInitialised = true;

      // Executes all loadScript and loadStyle promises
      // and only resolves them once all promises are done
        Promise.all([
            loadScript(this, FullCalendarJS + "/FullCalendarJS/jquery.min.js"),
            loadScript(this, FullCalendarJS + "/FullCalendarJS/moment.min.js"),
            loadScript(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.js"),
            loadStyle(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.css"),
        ])
        .then(() => {
            //initialize the full calendar
        this.initialiseFullCalendarJs();
        })
        .catch((error) => {
        console.error({
            message: "Error occured on FullCalendarJS",
            error,
        });
        });
   }

    initialiseFullCalendarJs() {
        const ele = this.template.querySelector("div.fullcalendarjs");
        const modal = this.template.querySelector('div.modalclass');
        console.log(FullCalendar);

        var self = this;

        //To open the form with predefined fields
        //TODO: to be moved outside this function
        function openActivityForm(startDate, endDate){
            self.startDate = startDate;
            self.endDate = endDate;
            self.openModal = true;
        }
        //Actual fullcalendar renders here - https://fullcalendar.io/docs/v3/view-specific-options
        $(ele).fullCalendar({
            header: {
                left: "prev,next today",
                center: "title",
                right: "month,agendaWeek,agendaDay",
            },
            defaultDate: new Date(), // default day is today - to show the current date
            defaultView : 'agendaWeek', //To display the default view - as of now it is set to week view
            navLinks: true, // can click day/week names to navigate views
            // editable: true, // To move the events on calendar - TODO 
            selectable: true, //To select the period of time

            //To select the time period : https://fullcalendar.io/docs/v3/select-method
            select: function (startDate, endDate) {
                let stDate = startDate.format();
                let edDate = endDate.format();
                
                openActivityForm(stDate, edDate);
            },
            eventLimit: true, // allow "more" link when too many events
            events: this.events, // all the events that are to be rendered - can be a duplicate statement here
        });
    }

    //TODO: add the logic to support multiple input texts
    handleKeyup(event) {
        this.title = event.target.value;
    }
    
    //To close the modal form
    handleCancel(event) {
        this.openModal = false;
    }

   //To save the event
    handleSave(event) {
        let events = this.events;
        this.openSpinner = true;

        //get all the field values - as of now they all are mandatory to create a standard event
        //TODO- you need to add your logic here.
        this.template.querySelectorAll('lightning-input').forEach(ele => {
            if(ele.name === 'title'){
               this.title = ele.value;
           }
           if(ele.name === 'start'){
                this.startDate = ele.value.includes('.000Z') ? ele.value : ele.value + '.000Z';
            }
            if(ele.name === 'end'){
                this.endDate = ele.value.includes('.000Z') ? ele.value : ele.value + '.000Z';
            }
        });
       
        //format as per fullcalendar event object to create and render
        let newevent = {title : this.title, start : this.startDate, end: this.endDate};
        console.log(this.events);

        //Close the modal
        this.openModal = false;
        //Server call to create the event
        createEvent({'event' : JSON.stringify(newevent)})
        .then( result => {
            const ele = this.template.querySelector("div.fullcalendarjs");

            //To populate the event on fullcalendar object
            //Id should be unique and useful to remove the event from UI - calendar
            newevent.id = result;
            
            //renderEvent is a fullcalendar method to add the event to calendar on UI
            //Documentation: https://fullcalendar.io/docs/v3/renderEvent
            $(ele).fullCalendar( 'renderEvent', newevent, true );
            
            //To display on UI with id from server
            this.events.push(newevent);

            //To close spinner and modal
            this.openSpinner = false;

            //show toast message
            this.showNotification('Success!!', 'Your event has been logged', 'success');

        })
        .catch( error => {
            console.log(error);
            this.openSpinner = false;

            //show toast message - TODO 
            this.showNotification('Oops', 'Something went wrong, please review console', 'error');
        })
   }
   
   /**
    * @description: remove the event with id
    * @documentation: https://fullcalendar.io/docs/v3/removeEvents
    */
   removeEvent(event) {
        //open the spinner
        this.openSpinner = true;

        //delete the event from server and then remove from UI
        let eventid = event.target.value;
        deleteEvent({'eventid' : eventid})
        .then( result => {
            console.log(result);
            const ele = this.template.querySelector("div.fullcalendarjs");
            console.log(eventid);
            $(ele).fullCalendar( 'removeEvents', [eventid] );

            this.openSpinner = false;
            
            //refresh the grid
            return refreshApex(this.eventOriginalData);

        })
        .catch( error => {
            console.log(error);
            this.openSpinner = false;
        });
   }

   /**
    *  @description open the modal by nullifying the inputs
    */
    addEvent(event) {
        this.startDate = null;
        this.endDate = null;
        this.title = null;
        this.openModal = true;
    }

    /**
     * @description method to show toast events
     */
    showNotification(title, message, variant) {
        console.log('enter');
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }



















































































    /*
     * FullCalendarJs
     * @description Full Calendar JS - Lightning Web Components
     */ 
    
    
      // fullCalendarJsInitialised = false;
      // @track allEvents = [];
      // @track selectedEvent = undefined;
    
      // /**
      //  * @description Standard lifecyle method 'renderedCallback'
      //  *              Ensures that the page loads and renders the 
      //  *              container before doing anything else
      //  */
      // renderedCallback() {
    
      //   // Performs this operation only on first render
      //   if (this.fullCalendarJsInitialised) {
      //     return;
      //   }
      //   this.fullCalendarJsInitialised = true;
    
      //   // Executes all loadScript and loadStyle promises
      //   // and only resolves them once all promises are done
      //   Promise.all([
      //     loadScript(this, FullCalendarJS + '/jquery.min.js'),
      //     loadScript(this, FullCalendarJS + '/moment.min.js'),
      //     loadScript(this, FullCalendarJS + '/theme.js'),
      //     loadScript(this, FullCalendarJS + '/fullcalendar.min.js'),
      //     loadStyle(this, FullCalendarJS + '/fullcalendar.min.css'),
      //     // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
      //   ])
      //   .then(() => {
      //     // Initialise the calendar configuration
      //     this.getAllEvents();
      //   })
      //   .catch(error => {
      //     // eslint-disable-next-line no-console
      //     console.error({
      //       message: 'Error occured on FullCalendarJS',
      //       error
      //     });
      //   })
      // }
    
      // /**
      //  * @description Initialise the calendar configuration
      //  *              This is where we configure the available options for the calendar.
      //  *              This is also where we load the Events data.
      //  */
      // initialiseFullCalendarJs() {
      //   const ele = this.template.querySelector('div.fullcalendarjs');
      //   // eslint-disable-next-line no-undef
      //   $(ele).fullCalendar({
      //     header: {
      //         left: 'prev,next today',
      //         center: 'title',
      //         right: 'month,basicWeek,basicDay,listWeek'
      //     },
      //     themeSystem : 'standard',
      //     defaultDate: new Date(), 
      //     navLinks: true,
      //     editable: true,
      //     eventLimit: true,
      //     events: this.allEvents,
      //     dragScroll : true,
      //     droppable: true,
      //     weekNumbers : true,
      //     eventDrop: function(event, delta, revertFunc) {
      //       alert(event.title + " was dropped on " + event.start.format());
      //       if (!confirm("Are you sure about this change? ")) {
      //         revertFunc();
      //       }
      //     },
      //     eventClick: function(event, jsEvent, view) {
      //       alert('Event Clicked '+event.title)
      //       this.selectedEvent =  event;
      //     },
      //     dayClick :function(date, jsEvent, view) {
      //       jsEvent.preventDefault();
            
      //     },
      //     eventMouseover : function(event, jsEvent, view) {
      //     }
      //   });
      // }
    
      // getAllEvents(){
      //     fetchAllEvents()
      //     .then(result => {
      //       this.allEvents = result.map(item => {
      //         return {
      //           id : item.Id,
      //           editable : true,
      //           title : item.Subject,
      //           start : item.ActivityDate,
      //           end : item.EndDateTime,
      //           description : item.Description,
      //           allDay : false,
      //           extendedProps : {
      //             whoId : item.WhoId,
      //             whatId : item.WhatId
      //           },
      //           backgroundColor: "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")",
      //           borderColor: "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
      //         };
      //       });
      //       // Initialise the calendar configuration
      //       this.initialiseFullCalendarJs();
      //     })
      //     .catch(error => {
      //       window.console.log(' Error Occured ', error)
      //     })
      //     .finally(()=>{
      //       //this.initialiseFullCalendarJs();
      //     })
      // }
    
      // closeModal(){
      //   this.selectedEvent = undefined;
      // }
    }


