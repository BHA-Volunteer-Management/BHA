class HomeController {
<<<<<<< HEAD
  constructor($scope, $state, $uibModal, $http, User, Requests) {
    $scope.friendEmail = ''

=======
  constructor($state, $uibModal, $http, User, Requests) {
    this.imgSrc = require('./viplogo.png');
>>>>>>> 412c2c4... BHA-107: added logo to user home page
    this.userService = User;
    Requests.getUserAssignments(this.userService.getUser().id).then((res) => {
      this.assignments = res.data;
    });

    this.sendReferral = () => {
      let friendEmail = $scope.friendEmail

      if (friendEmail !== '' && $scope.referral.$valid) {
        Requests.sendReferral(friendEmail)
          .then((result) => {
            $uibModal.open({template: result.data.status})
          })
          .catch((err) => {
            $uibModal.open({template: "Referral could not be sent; please check the email address."})
          })
      }
    }
  }
}

HomeController.$inject = ["$scope", "$state", "$uibModal", "$http", "User", "Requests"];

export default HomeController;
