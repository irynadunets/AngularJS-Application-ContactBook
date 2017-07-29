/* global angular */

(function () {
    var app = angular.module('App');
    app.controller("ContactCtrl", ContactCtrl);
    
    function ContactCtrl(ContactDataSvc) { 
        var self=this;
        self.editMode=false;
        ContactDataSvc.getContacts()
                .then(function(data){
                  self.contacts=data;
        });
        
        this.selectContact = function (index) {
            this.selectedContact = this.contacts[index];
        };
        this.toggleEditModule=function(){
            this.editMode=!this.editMode;
        };
        this.saveUser=function(){
            this.toggleEditModule();
            var userData=this.selectedContact;
            ContactDataSvc.saveUser(userData);
        };
    }
})();