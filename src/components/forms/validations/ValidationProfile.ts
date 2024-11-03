import { t } from "i18next";
import { Profile } from "../../../types";
import { Resolver } from 'react-hook-form'

export const resolver: Resolver<Profile> = async (values) => {
    const errors: Record<string, any> = {};
    if (!values.email) {
      errors.email = {
        type: "required",
        message: t('error.requiredEmail'),
      };
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(values.email)) {
        errors.email = {
            type: "pattern",
            message: t('error.invalidEmail'),
        };
    }

    if (!values.first_name) {
      errors.first_name = {
        type: "required",
        message: t('error.requiredFirstName'),
      };
    } else if (values.first_name.length < 2) {
        errors.first_name = {
            type: "minLength",
            message: t('error.minLengthError'),
        };
    } else if (values.first_name.length > 20) {
        errors.first_name = {
            type: "maxLength",
            message: t('error.maxLength'),
        };
    } else if (!/^[a-zA-Z0-9_]*$/.test(values.first_name)) {
        errors.first_name = {
            type: "pattern",
            message: t('error.invalidCharacters'),
        };
    }

    if (!values.last_name) {
      errors.last_name = {
        type: "required",
        message: t('error.requiredLastName'),
      };
    } else if (values.last_name.length < 2) {
        errors.last_name = {
            type: "minLength",
            message: t('error.minLengthError'),
        };
    } else if (values.last_name.length > 20) {
        errors.last_name = {
            type: "maxLength",
            message: t('error.maxLength'),
        };
    } else if (!/^[a-zA-Z0-9_]*$/.test(values.last_name)) {
        errors.last_name = {
            type: "pattern",
            message: t('error.invalidCharacters'),
        };
    }

    return {
      values: Object.keys(errors).length ? {} : values,
      errors,
    };
  };