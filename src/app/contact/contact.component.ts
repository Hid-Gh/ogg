import { Component ,OnInit} from '@angular/core';
import { EmailServiceService } from '../email-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Email:new FormControl('', [Validators.required]),
      Body: new FormControl('', [Validators.required])
      })
      }  
      constructor(private builder: FormBuilder, private contact: EmailServiceService) { }
onSubmit(FormData:any) {
    this.contact.SendEmail(FormData)
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm'
      }, error => {
      console.warn(error.responseText)
      console.log({ error })
      console.log(this.FormData);
      
    })
}
}
