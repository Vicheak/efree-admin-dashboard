import moment from "moment";

export default function downloadExcel(url = "", input, filename = "") {
  ifetch(url, input, "blob").then((response) => {
      if(response.size > 0){
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            filename + "_" + moment().format("lll") + ".xlsx"
        );
        document.body.appendChild(link);
        link.click();
      }else {
        iAlert().warning("can't_download");
      }
  });
}
