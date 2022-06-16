({
	FireCmpEVent : function(component, event) {
		//yah pr registerEvent name dalkr uski values 
		//get krnge
		var gotIt =cmp.getEvent("abc");
        gotIt.setparams({
            "message" : "comp event fired me"
        });
        gotIt.fire();
	}
})