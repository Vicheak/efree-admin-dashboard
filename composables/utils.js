import capitalize from "./helpers/capitalize";
import uppercase from "./helpers/uppercase";
import lowercase from "./helpers/lowercase";
import placeholder from "./helpers/placeholder";
import truncate from "./helpers/truncate";
import phoneFormat from "./helpers/phoneFormat";
import nullToVoid from "./helpers/nullToVoid";
import isEmpty from "./helpers/isEmpty";
import genderFormat from "./helpers/genderFormat.js";
import dateFormat from "./helpers/dateFormat.js";
import currencyFormat from "./helpers/currencyFormat";
import currency from "./helpers/currency";
import payBy from "./helpers/payBy.js";
import paymentStage from "./helpers/paymentStage.js";
import getAddress from "./helpers/getAddress";
import getNameByLocal from "./helpers/getNameByLocal";
import getProvinceLocalName from "./helpers/getProvinceLocalName";
import getDistrictNameByLocal from "./helpers/getDistrictLocalName";
import getCommuneNameByLocal from "./helpers/getCommuneLocalName";
import getVillageNameByLocal from "./helpers/getVillageLocalName";
import getCountryNameByLocal from "./helpers/getCountryByLocal";
import getNationalityByLocal from "./helpers/getNationalityLocalName";
import getStatus from "./helpers/getStatus";
import percentageFormat from "./helpers/percentageFormat";
import dateTimeFormat from "./helpers/dateTimeFormat";
import noDecimalFormat from "./helpers/noDecimalFormat";
import encrypt from "./helpers/encrypt";
import decrypt from "./helpers/decrypt";
import empty from "./helpers/empty";
import getImagePath from "./helpers/getImagePath";
import getVideoPath from "./helpers/getVideoPath";
import downloadExcel from "./helpers/downloadExcel";
import countOrdersNumber from "./helpers/countOrderNumber";
import { maskString } from "./helpers/maskString";
import generateUUID from "./helpers/generateUUID";
import viewContact from "./helpers/viewContact";
import viewPassword from "./helpers/viewPassword";
import convertToWebp from './helpers/convertToWebp'
import getVoicePath from './helpers/getVoicePath'
import getImageFromSoccerAPI from './helpers/getImageFromSoccerAPI'
import dateTimeZoneFormat from "./helpers/dateTimeZoneFormat"
import convertToSlug from "./helpers/convertToSlug";
import getNameByLang from "./helpers/getNameByLang";
import goTo from "./goTo";
import { checkCookieExpiration } from "./checkCookies";
export {
  getNameByLang,
  convertToSlug,
  dateTimeZoneFormat,
  getImageFromSoccerAPI,
  getVideoPath,
  getVoicePath,
  noDecimalFormat,
  capitalize,
  uppercase,
  lowercase,
  placeholder,
  truncate,
  phoneFormat,
  nullToVoid,
  genderFormat,
  dateFormat,
  payBy,
  paymentStage,
  getAddress,
  isEmpty,
  getNameByLocal,
  getProvinceLocalName,
  getDistrictNameByLocal,
  getCommuneNameByLocal,
  getVillageNameByLocal,
  getCountryNameByLocal,
  getNationalityByLocal,
  getStatus,
  currency,
  percentageFormat,
  dateTimeFormat,
  encrypt,
  decrypt,
  empty,
  getImagePath,
  currencyFormat,
  downloadExcel,
  countOrdersNumber,
  maskString,
  generateUUID,
  viewContact,
  viewPassword,
  convertToWebp,
  checkCookieExpiration,
  goTo
};
