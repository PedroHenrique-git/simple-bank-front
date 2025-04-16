import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'register-page',
  templateUrl: "./register.component.html",
  imports: [RouterLink, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', { nonNullable: false }),
    email: new FormControl('', { nonNullable: false }),
    document: new FormControl('', { nonNullable: false }),
    password: new FormControl('', { nonNullable: false })
  })

  onSubmit() {
    console.log(this.registerForm.value)
  }
}
