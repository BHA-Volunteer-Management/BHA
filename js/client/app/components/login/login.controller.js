class LoginController {
  constructor($http, User, $localStorage) {
    this.name = 'login';
    this.email = '';
    this.password = '';
    this.error = '';

    this.login = () => {

      let user_data = {
        username: this.email,
        password: this.password
      }

      $http.post(api + "/auth/login/", user_data, {"Authorization": ""}).then(function(response) {
        $localStorage.djangotoken = response.data.key;
        User.signIn('home');
      }, (error) => {
        console.log(error);
        this.error = 'Username/Password not valid';
      });
    }
  }
}
LoginController.$inject = ['$http','User', '$localStorage'];
export default LoginController;
