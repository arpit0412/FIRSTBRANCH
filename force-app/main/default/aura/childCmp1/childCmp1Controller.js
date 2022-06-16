({
	Show: function(component, event, helper) {
		
        console.log('Show method invoke by submit button');
        
	
	//firing event
	var evt = component.getEvent("infofeat");
    evt.fire();
    }
    })