const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(data) {
    let errors = {};

    if (isEmpty(data.title)) {
        errors.title = "Job title field is required";
    }

    if (isEmpty(data.company)) {
        errors.company = "Company field is required";
    }

    if (isEmpty(data.from)) {
        errors.from = "From date field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};