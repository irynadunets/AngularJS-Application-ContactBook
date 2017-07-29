/* global angular */

(function () {
    var app = angular.module('App');
    app.controller("ContactCtrl", ContactCtrl);
    
    function ContactCtrl(ContactDataSvc) { 
        var self=this;
        self.editMode=false;
        self.addMode=false;
        ContactDataSvc.getContacts()
                .then(function(data){
                  self.contacts=data;
        });
        
        this.selectContact = function (index) {
            this.selectedContact = this.contacts[index];
            self.successMessage=undefined;
            self.errorMessage=undefined;
            
        }
        this.toggleEditModule=function(){
            this.editMode=!this.editMode;
        }
        this.saveUser=function(){
            this.toggleEditModule();
            var userData=this.selectedContact;
            if(self.addMode)
            {
              ContactDataSvc.createUser(userData)
                    .then(function(){
            self.successMessage="Data uploaded";
            },
            function(){            
            self.errorMessage="Error";
            }
         ); 
         self.addMode=false;
        }
        else{
            ContactDataSvc.saveUser(userData)
                    .then(function(){
            self.successMessage="Data uploaded";
            },
            function(){            
            self.errorMessage="Error";
            }
         );                 
        }
    }
        this.addContact=function(){
        self.addMode=true;    
        this.selectedContact={
            "id": new Date().toTimeString()
        };
        this.editMode=true;
    }
    }
})();