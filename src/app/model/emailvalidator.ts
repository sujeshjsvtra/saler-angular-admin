import { HttpClient } from "@angular/common/http";
import { AbstractControl } from "@angular/forms";
import { AuthenticateService } from "../services/authenticate.service";

class EmailValidator {
    static authenticateService: any;
    private http: HttpClient
    
    static validate(control: AbstractControl) {
        const email = control.get("email").value;
        this.authenticateService = AuthenticateService;
        if (email == null || email == "") {
            control.get('email').setErrors({ emailEmpty: true })
        } else {
            if (this.checkTheEmail(email)) {
                this.authenticateService.emailIsExist(email);
            } else {
                control.get('email').setErrors({ inValidEmail: true })
            }
        }
    }

    static checkTheEmail(text: string) {
        var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        return re.test(text);
    }
}