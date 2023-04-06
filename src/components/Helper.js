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
    }
}
export default Helper;