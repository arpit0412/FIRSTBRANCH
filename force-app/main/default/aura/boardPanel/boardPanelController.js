({
        startGame : function(component, event, helper) {
    
           let gameModeComboBox = component.find("gameMode");
    
           let selectedValue = gameModeComboBox.get("v.value");
    
           //update selectedMode attribute
            component.set("v.selectedMode", selectedValue)
           console.log("The start new Game button has been clicked. The game mode is" + selectedValue);
           alert("The start new Game button has been clicked. The game mode is" + selectedValue);
        },
        
        reshuffleBoard: function(component, event, helper) {
            console.log("Reshuffle Board is called");
         }
    });