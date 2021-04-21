import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toast (text: any) {
    Swal.fire({
      text: text,
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
