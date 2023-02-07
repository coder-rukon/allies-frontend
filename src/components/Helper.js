import Axios from "axios"
import Settings from './Settings';
import $ from 'jquery';
let Helper = {
    getCart: function(calback){
        Axios.post(Settings.frontJsonUrl + '/cart').then(function (res) {
            let cartItems = [];
            if(res.data.cart_items){
                for(let cartItemId in res.data.cart_items){
                    cartItems.push(res.data.cart_items[cartItemId]);
                }
                res.data.cart_items = cartItems;
            }
            calback(res.data);
        })
    },
    formatNumber:function(number){
        number = parseFloat(number);
        return number.toFixed(2)
    },
    getState:function(country,state,calback){
        let argments = {
            country:country,
            state:state,
            calback:calback
        }
        Axios.get(Settings.baseUrl + '/data-json/state?country=' + country).then(function (res) {
            let stateData =res.data;
            for(let stateKey in stateData){
                if(stateData[stateKey].state_code == argments.state){
                    argments.calback(stateData[stateKey])
                }
            }
        });
    },
    getColor:function(colorId,callback){
        let options = {
            calBackFn:callback
        }
        Axios.get(Settings.apiUrl+'/color/'+colorId).then(function(res){
            options.calBackFn(res.data)
        })
    },
    getCountry:function(country,callback){

    },
    getSizeFromId:function(sizeId,callback){
        Axios.get(Settings.frontJsonUrl+'/product-size').then(function(res){
            let data = res.data ? res.data : [];
            if(data){
                for(let idKey in data){
                    if(data[idKey].id == sizeId){
                        callback(data[idKey]);
                    }
                }
            }
        })
    },
    isGated:function(options,auth){
        if(options && options.site_settings && options.site_settings.is_webiste_gated == "yes" && !auth.isLogin){
            return true;
        }
        return false;
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
    countDownAsign(id){
        let countDownId = id;
        let findCounterId = document.getElementById(countDownId);
        if(findCounterId){
            let startDateHtml = $('#'+countDownId).html();
            $("#"+countDownId).countdown($("#"+countDownId).attr('data-date'), function(event) {
                $(this).html(
                    event.strftime(startDateHtml)
                );
            });
        }
    },
    isCustomer(user){
        return true;
        if(user && user.role.toLowerCase == "customer"){
            return true;
        }
        return false;
    },
    /**
     * 
     * @param {*} dataObj 
     * @param Array keyList 
     * @returns object
     */
    getValue (dataObj, keyList ) {
        let output = {};
        if(dataObj === undefined || !dataObj.data){
            return output;
        }
        dataObj= dataObj.data;
        if(keyList.length == 1){
            if(dataObj[keyList[0]])
            return dataObj[keyList[0]];
        }
        else if(keyList.length == 2){
            if(dataObj[keyList[0]][keyList[1]])
            return dataObj[keyList[0]][keyList[1]];
        }
        else if(keyList.length == 3){
            if(dataObj[keyList[0]][keyList[1]][keyList[2]])
            return dataObj[keyList[0]][keyList[1]][keyList[2]];
        }
        else if(keyList.length == 4){
            if(dataObj[keyList[0]][keyList[1]][keyList[2]][keyList[3]])
            return dataObj[keyList[0]][keyList[1]][keyList[2]][keyList[3]];
        }
        else{
            return output; 
        }
    },
    getLabel(dataObject,key,defaultValue,postFix = null){
        if(!dataObject){
            return defaultValue;
        }
        if(dataObject[key]){
            return dataObject[key]+(postFix ? postFix : '');
        }
        return defaultValue;
    }
}
export default Helper;