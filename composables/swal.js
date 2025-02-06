import Swal from "sweetalert2";

export function swal(obj) {
  return Swal.fire({
    ...obj,
    customClass: {
      confirmButton: "confirm-buttom-swal",
    },
  });
}
