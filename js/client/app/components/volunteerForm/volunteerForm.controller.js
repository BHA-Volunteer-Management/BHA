import _ from 'lodash';

class VolunteerFormController {
  constructor($http, Enums, $uibModal, $state, Alert, Validate) {

    this.selectOptions = Enums;
    this.selectOptions.availabilityTimes = ["9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM",
        "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM"];

    this.name = 'Volunteer Application Form';
    this.allValid = false;
    this.zip_valid = false;
    this.phone_valid = false;
    this.validLanguages = false;
    this.validAvailabilities = false;
    this.submitted = false;
    this.passwordError = "";

    // initial info object
    this.info = {
      user: {
        password: "",
      },
      first_name: "",
      last_name: "",
      middle_name: "",
      affiliation: "",
      contact: {
        street: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone_number: "",
        carrier: "18",
        preferred_contact: "0"
      },
      languages: [],
      bha_app_res: false,
      availability: [],
      notes: ""
    };

    this.validateForm = function(ang_valid) {
      this.allValid = ang_valid && this.zip_valid && this.phone_valid && this.validAvailabilities && this.passwordError.length == 0;
    };

    // on submit
    this.submit = function(ang_valid) {
      // check custom validations
      this.submitted = true;
      console.log(Validate.zip);
      console.log(Validate.password);
      this.zip_valid = Validate.zip(this.info.contact.zip);
      this.phone_valid = Validate.phoneNumber(this.info.contact.phone_number);
      this.validLanguages = this.info.languages[0].language_name.length > 0;
      this.info.availability = Validate.availability(this.info.availability);
      this.validAvailabilities = _.every(this.info.availability, 'isValid');
      this.passwordError = Validate.password(this.info.user.password);
      this.validateForm(ang_valid);

      if (this.allValid) {
        // brilliant
        this.info.user.username = this.info.contact.email;
        $http.post(api + '/volunteers/', this.info).then((res) =>{
          $state.go('login');
          }, (error) => {
            Alert.add('danger', 'Could not create your account');
          }
        );
      } else {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    };
  }
}

VolunteerFormController.$inject = ['$http', 'Enums', '$uibModal', '$state', 'Alert', 'Validate'];
export default VolunteerFormController;
