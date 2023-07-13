import Axios from "axios"
import Settings from './Settings';
import notifyjs from 'notifyjs-browser';
import $ from 'jquery';
let Helper = {
    alert(message,options,selector = null){
        let defaultOptions = {
            elementPosition: 'top right',
            globalPosition: 'top right',
            style: 'bootstrap',
            className: 'success',
            ...options
        }
        if(selector){
            selector.notify(message, defaultOptions);
        }else{
            $.notify(message, defaultOptions);
        }
    },
    confirmMe(confirmFunction,bodyMessage,cancelFunction='',title){
        $('<div>'+bodyMessage+'</div>').dialog({
             modal: true,
             zIndex: 30005,
             title:title,
             buttons: {
                "Yes": function() {
                    confirmFunction()
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    if(cancelFunction){
                        cancelFunction()
                    }
                  $( this ).dialog( "close" );
                }
            }
        });
    },
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    },
    formateDateFromDb(dateDateString){
        const d = new Date(dateDateString)
        return d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear();
    },
    getNullableValue(data){
        if(data == '' || typeof data ==='undefined'){
            return null;
        }
        return data;
    },
    getDatePickerFormate(){
        return 'Y-m-d';
    },
    formateDate(dateString){
        return dateString;
    },
    getPropertyType(){
        let propertyTypes = [
            {label:'Industrial' , value:"industrial"},
            {label:'Office' , value:"office"},
            {label:'Retail' , value:"retail"}
        ]
        return propertyTypes;
    },
    getPropertyFields(){
        //listing_type,status,address_line_1,address_line_2,city,state,country,zip_code,size,acres,zoning,private_offices,bathrooms,parking_ratio,suites,min_space,max_contiguous_space,year_built,class,submarket,lease_rate,notes
        //listing_type,status,address_line_1,address_line_2,city,state,country,zip_code,size,acres,zoning,private_offices,bathrooms,parking_ratio,suites,min_space,max_contiguous_space,year_built,class,submarket,price_per_sf,sale_price,notes
        let propertyFields = [
            {name:'address_line_1',label:'Address Line 1',inputWraperClass:'col-xs-12'},
            {name:'address_line_2',label:'Address Line 2',inputWraperClass:'col-xs-12'},
            {name:'city',label:'City',inputType:'dropdown'},
            {name:'state',label:'State',inputType:'dropdown'},
            {name:'country',label:'Country',inputType:'dropdown'},
            {name:'zip_code',label:'Zip Code',inputWraperClass:'col-xs-12 col-sm-3'},
            {name:'size',label:'Size'},
            {name:'acres',label:'Acres'},
            {name:'zoning',label:'Zoning'},
            {name:'private_offices',label:'# of Private Offices'},
            {name:'bathrooms',label:'# of Bathrooms'},
            {name:'parking_ratio',label:'Parking Ratio'},
            {name:'suites',label:'# of Suites'},
            {name:'min_space',label:'Min Space'},
            {name:'max_contiguous_space',label:'Max Contiguous Space'},
            {name:'dock_doors',label:'# of Dock Doors'},
            {name:'drive_in_doors',label:'# of Drive-In Doors'},
            {name:'clear_height',label:'Clear Height'},
            {name:'year_built',label:'Year Built'},
            {name:'total_parking',label:'Total Parking'},
            {name:'units',label:'# of Units'},
            {name:'vehicles_per_day',label:'Vehicles per Day'},
            {name:'available_utilities',label:'Available Utilities'},
            {name:'retail_type',label:'Retail Type'},
            {name:'class',label:'Class'},
            {name:'submarket',label:'Submarket'},
            {name:'lease_rate',label:'Lease Rate'},
            {name:'sale_price',label:'Sale Price'},
            {name:'price_per_sf',label:'Price per Sq. Ft.'},
            {name:'price_per_acre',label:'Price per Acre'},
            {name:'notes',label:'Notes',inputWraperClass:'col-xs-12',inputType:'textarea'}
        ]
        return propertyFields;
    }
}
export default Helper;