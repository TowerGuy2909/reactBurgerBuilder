export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required){
        isValid = value !== '' && isValid;
    }
    if (rules.minlLength) {
        isValid = value.length >= rules.minlLength && isValid
    }
    if (rules.maxlLength) {
        isValid = value.length <= rules.maxlLength && isValid
    }
  

    return isValid;
}