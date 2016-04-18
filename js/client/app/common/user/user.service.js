let UserService = function ($http, $state, $localStorage) {
  let user = null;
  const maxFailAttempts = 3;
  let failAttempts = 0;
  let getUser = () => {
    return user;
  };

  let signIn = (callback) => {
    if(failAttempts < maxFailAttempts) {
      $http.get(api + '/volunteers/me/', {
        headers: {
          'Authorization': 'Token ' + $localStorage.djangotoken
        }
      }).then(function(res) {
        failAttempts = 0;
        $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.djangotoken;
        user = res.data;
        if(callback) {
          callback();
        }
      }, function(error) {
        console.log(error);
        failAttempts++;
      });
    // can't get the volunteer, somethings wrong, abort mission
    } else {
      delete $localStorage.djangotoken;
      $state.go('login');
    }
  }

  let logout = () => {
    $http.post(api + '/auth/logout/').then(() => {
      user = null;
      $http.defaults.headers.common.Authorization = '';
      delete $localStorage.djangotoken;
      $state.go('login');
    });
  }

  let isSignedIn = () => {
    return !!user;
  };

  let isAdmin = () => {
    return user && user.user.is_staff;
  }

  let getLevel = () => {
    return user && user.volunteer_level;
  }

  return { getUser, signIn, isSignedIn, isAdmin, logout, getLevel };
};

UserService.$inject = ['$http', '$state', '$localStorage'];
export default UserService;
