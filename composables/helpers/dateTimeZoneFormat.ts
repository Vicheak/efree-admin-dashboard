import moment from "moment-timezone";

function dateTimeZoneFormat(zone:string | null | undefined, format:string = "DD-MM-YYYY HH:mm"):string {
  if (zone && zone !== "0000-00-00 00:00:00") {
    return moment.tz(zone, "UTC").tz("Asia/Phnom_Penh").format(format);
  } else {
    return '';
  }
}

export default dateTimeZoneFormat;
