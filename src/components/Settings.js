import Axios from "axios";
import $ from 'jquery';
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
let Settings = {
    wp: function (endpoint) {
        return this.baseUrl + '/api/wp/' + endpoint;
    },
    frontJsonUrl: 'http://127.0.0.1:8000/data-json',
    seo: {
        title_prepend: 'Olgyn'
    },
    address: {
        wh: {
            zipcode: 46214,
            country: 'US',
            state: 'IN'
        }
    },
    upsExtraFee:10,
    baseUrl: 'http://127.0.0.1:8000',
    ajaxAction: 'http://127.0.0.1:8000/ajax-action',
    adminUrl: '/admin',
    userLog:'/userlog',
    currency: { name: 'USD', symble: "$" },
    assetUrl: 'http://127.0.0.1:8000',
    apiUrl: 'http://127.0.0.1:8000/api/rs',
    cartUrl: '/cart',
    checkoutUrl: '/checkout',
    myaccountUrl: '/my-account',
    url: {
        login: '/login',
        regiseter: '/register',
    },
    order: {
        status: ["complete",'shipped', "processing", 'pending-payment', 'refunded', 'cancel','draft']
    },
    customer: {
        bedge: [
            { name: 'Gold', id: 'Gold' },
            { name: 'Silver', id: 'silver' },
            { name: 'Plutinum', id: 'llutinum' },
            { name: 'Dimond', id: 'dimond' },
            { name: 'Crown', id: 'crown' }
        ]
    },
    product: {
        features: [
            "Quilted bomber jacket",
            "Zip-up front",
            "Elastic collar and hem",
            "Side pockets",
            "Outer Shell Main Fabric: 100% polyester",
            "Details: 98% Polyester, 2% Elastane",
            "Lining: 100% polyester",
            "Filling: 100% polyester"
        ]
    },
    productUrl: function (slug) {
        return ('/product/' + slug);
    },
    productPrice: function (product) {
        if (product.sale_price && product.sale_price != '') {
            return this.formatCurrency(product.sale_price);
        }
        return this.formatCurrency(product.price);
    },
    formatCurrency(number){
        return Number.parseFloat(number).toFixed(2);
    },
    productPriceHtml: function (product) {
        let output = '';
        if(product.sale_price && product.sale_price != ''){
            output += '<del><span>'+this.currency.symble+'</span>'+this.formatCurrency(product.price)+'</del>';
        }
        output += '<span class="price_reg"><span>'+this.currency.symble+'</span>'+this.productPrice(product)+'</span>';
        return output;
    },
    fragment:function(type){
        if(type == "cart"){
            $('#archive_product_fragment_refresh').trigger("change");
            $('#onchange_controller').trigger("change");
        }
        if(type == "add_to_cart"){
            $('#onchange_controller').trigger("change");
            $('#cart_page_fragmetn_refresh').trigger("change");
            $('#archive_product_fragment_refresh').trigger("change");
        }
    },
    loadWidgets:function(calbackArg){
        let callBack = calbackArg;
        Axios.get(this.frontJsonUrl + '/getoptions/widgets').then(function (res) {
            let allWidgets = [];
            if (res.data.data) {
                let dbData = JSON.parse(res.data.data);
                for (let key in dbData) {
                    let newWidget = dbData[key];
                    if (newWidget.type == "links") {
                        let newWidgetLinks = [];
                        for (let keyInner in newWidget.data) {
                            newWidgetLinks.push(newWidget.data[keyInner]);
                        }
                        newWidget.data = newWidgetLinks;
                    }
                    allWidgets.push(newWidget)
                }
            }
            callBack(allWidgets);
        })
    },
    getActiveClass:function(url){
        if(window.location.href.indexOf(url) >= 1){
            return "active";
        }else{
            return "";
        }
    },
    userSource:function(){
        return [
                {name:'Google',id:'Google'},
                {name:'Facebook',id:'Facebook'},
                {name:'Instagram',id:'Instagram'},
                {name:'LinkedIn',id:'LinkedIn'},
                {name:'Wholesale Marketplaces',id:'Wholesale Marketplaces'},
                {name:'Newsletters',id:'Newsletters'},
                {name:'Referral',id:'Referral'},
                {name:'Other',id:'Other'}
        ]
    },
    statusFlags:[
        {'name':"Flag 1" , id:"flag_1" ,'color':'#003049'},
        {'name':"Flag 2" , id:"flag_2" ,'color':'#d62828'},
        {'name':"Flag 3" , id:"flag_3" ,'color':'#f77f00'},
        {'name':"Flag 4" , id:"flag_4" ,'color':'#fcbf49'},
        {'name':"Flag 5" , id:"flag_5" ,'color':'#eae2b7'}
    ],
    getStatusFlag:function(flagId){
        for (const flag of this.statusFlags) {
            if(flag.id == flagId){
                return flag;
            }
        }
        return false;
    },
    languages: (code=null) => {
        const languages = [
            {
                code:'en',
                title:'English',
                flag:''
            },
            {
                code:'pt',
                title:'Portuguese',
                flag:''
            }
        ]
        if(code){
            let outputLang = {};
            languages.forEach(lang => {
                if(lang.code == code){
                    outputLang =  lang;
                }
            });
            return outputLang;
        }
        
        return languages;
    }
}

export default Settings; 