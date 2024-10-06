import { t } from "i18next";
import { LoginFormType } from "../../../types";
import { Resolver } from 'react-hook-form'

export const resolver: Resolver<LoginFormType> = async (values) => {
    const errors: Record<string, any> = {};
    if (!values.username) {
      errors.username = {
        type: "required",
        message: t('error.requiredUsername'),
      };
    } else if (values.username.length < 3) {
      errors.username = {
        type: "minLength",
        message: t('error.minLengthError'),
      };
    } else if (values.username.length > 20) {
        errors.username = {
            type: "maxLength",
            message: t('error.maxLength'),
        };
    } else if (!/^[a-zA-Z0-9_]*$/.test(values.username)) {
        errors.username = {
            type: "pattern",
            message: t('error.invalidCharacters'),
        };
    }

    if (!values.password) {
      errors.password = {
        type: "required",
        message: t('error.requiredPassord'),
      };
    }

    return {
      values: Object.keys(errors).length ? {} : values,
      errors,
    };
  };