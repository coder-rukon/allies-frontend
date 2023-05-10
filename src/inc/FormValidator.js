import Helper from "../components/Helper";
import Settings from "../components/Settings";
/*
configure : [ {name:'',displayName:'',frontEndId:'',types:['Email','Required'], min:10, max:10}]
Types: Email, Number, Required, Phone
isValid: ({filedName: value, FieldName: value})
getMessage: fn(name: null)
setLanguage: fn(languageObj)
reset: fn(filedNam : null)
hasError: fn(fieldName)
*/
class FormValidator {
    /**
     * 
     * @param {Array} validate 
     */
    constructor(fieldConfig = [],language = null){
        this.language = language;
        this.validatorFields = fieldConfig;
        this.errors = [];
    }
    setLanguage(language){
        this.language = language;
    }
    isValid(formData = {}, gridObjects = []){
        this.formData = formData;
        this.validatorFields.forEach( field => {
            // check all types
            if(field.types && Array.isArray(field.types)){
                field.types.forEach(typeOfValidatorField => {
                    let fnName = 'is'+typeOfValidatorField
                    if(typeof this[fnName] ==='function'){
                        this[fnName](field);
                    }
                });
            }
            // check maxLanght
            this.IsSpecialCharsExist(field);
            // check maxLanght
            if(field.max){
                this.checkMax(field)
            }
            // check minLenght
            if(field.min){
                this.checkMin(field)
            }
        })
        if(gridObjects.length >=1){
            let hasErrorsOnGrid = false;
            gridObjects.forEach(gridObject => {
                if(gridObject){
                    if(gridObject.componentObj.checkValidationError()){
                        hasErrorsOnGrid = true;
                    }
                }
            });
            if(hasErrorsOnGrid){
                return false;
            }
        }
        if(this.errors.length <=0){
            return true;
        }
        
        return false;
    }
    reset(fieldName = null){
        if(fieldName){
            let newErros = [];
            if(Array.isArray(this.errors)){
                this.errors.forEach(error => {
                    if(error.name !== fieldName){
                        newErros.push(error);
                    }
                });
            }
            this.errors = newErros;
        }else{
            this.errors = [];
        }
    }
    displayMessage(componentObject = null, isReset = true){
        let that = this;
        let messages = this.getMessage();
        messages = messages.reverse();
        messages.forEach(msg => {
            Helper.alert(msg.message,{
                className: 'error',
            })
        })
        if(componentObject){
            if(!componentObject.state.toggleState){
                componentObject.state.toggleState = false;
            }
            componentObject.setState({
                toggleState:! componentObject.state.toggleState
            },function(){
                that.reset();
            })
        }
        if(isReset && !componentObject){
            this.reset();
        }
    }
    getMessage(name = null){
        if(name){
            let msg = null;
            if(Array.isArray(this.errors)){
                this.errors.forEach(error => {
                    if(error.name === name){
                        msg = error.message;
                    }
                });
            }
            return msg;
        }
        return this.errors;
    }
    
    
    addMessage(field, message, meta={}){
        this.errors.push({
          name: field.name,
          message: this.modifyMessage(message,field),
          meta: meta
        })
    }
    hasError(name){
        let hasError = false;
        if(Array.isArray(this.errors)){
            this.errors.forEach(error => {
                if(error.name === name){
                    hasError = true;
                }
            });
        }
        return hasError;
    }
    IsSpecialCharsExist(field) {
        if(!this.isFormDataExist(field.name)){
            return;
        }
        const specialChars = /[`!#$%^&*{};?~]/;
        if(specialChars.test(this.formData[field.name])){
            this.addMessage(field,"%name% field contains invalid characters");
        }
    }
    isNumber(field){
        if(!this.isFormDataExist(field.name)){
            return;
        }
        if(!/^\d+$/.test(this.formData[field.name])){
            this.addMessage(field,"%name% field is not a valid number");
        }
    }
    isPhone(field){
        if(!this.isFormDataExist(field.name)){
            return;
        }
        if(!/^\d+$/.test(this.formData[field.name])){
            this.addMessage(field,"%name% field is not a valid phone number");
        }
    }
    isNumberNegative(field){
        if(!this.isFormDataExist(field.name)){
            return;
        }
        if(/^\d+$/.test(this.formData[field.name]) && Number.parseFloat(this.formData[field.name]) < 0 ){
            this.addMessage(field,"%name% field negative value not allow");
        }
    }
    isRequired(field){
        if(!this.isFormDataExist(field.name)){
            this.addMessage(field,"%name% field is required");
            return;
        }
        if(!this.formData[field.name] || this.formData[field.name].length <=0){
            this.addMessage(field,"%name% field is required");
        }
    }
    isEmail(field){
        
        if(!this.isFormDataExist(field.name)){
            return;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData[field.name])){
            this.addMessage(field,"%name% is not a valid email ");
        }
    }
    isUrl(field){
        
        if(!this.isFormDataExist(field.name)){
            return;
        }
        let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        if(!urlPattern.test(this.formData[field.name])){
            this.addMessage(field,"%name% is not a valid Url ");
        }
    }
    checkMin(field){
        if(!this.isFormDataExist(field.name)){
            return;
        }
        if(this.formData[field.name].length < parseInt(field.min) ){
            this.addMessage(field,"%name% value must be larger or equal to "+ field.min);
        }
    }
    checkMax(field){
        if(!this.isFormDataExist(field.name)){
            return;
        }
        if(this.formData[field.name].length > parseInt(field.max) ){
            this.addMessage(field,"%name% value must be smaller or equal to "+ field.max);
        }
    }
    isFormDataExist(name){
        if(this.formData[name]){
            return true;
        }
        if(Settings.debug){
            console.log(name + ' field does not exist in formdata');
        }
        return false;
    }
    /**
     * this will find Localization data from language 
     * @param {*} message 
     * @param {*} field 
     * @returns String
     */
    modifyMessage(message,field){
        let output = message
        let name = field.displayName ? field.displayName : field.name;
        return output.replace('%name%',name);
    }
}
export default FormValidator;