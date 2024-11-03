import { t } from "i18next";
import { AuthFormType } from "../../../types";
import { Resolver } from 'react-hook-form'

export const resolver: Resolver<AuthFormType> = async (values) => {
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

    if (!values.password) {
      errors.password = {
        type: "required",
        message: t('error.requiredPassord'),
      };
    } else if (values.password.length <= 6) {
        errors.password = {
            type: "minLength",
            message: t('error.minLengthPassword'),
        };
    }

    return {
      values: Object.keys(errors).length ? {} : values,
      errors,
    };
  };