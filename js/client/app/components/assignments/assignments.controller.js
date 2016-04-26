class AssignmentsController {
  constructor(Modals, Requests, $state, User, Enums) {
    this.enums = Enums;
    let getAssignments = () => {
      Requests.getAssignments((this.search), (results) => {
        this.assignments = results;
      });
    };

    this.futureAssignments = [];

    this.search = {
      status: 1,
      language_name: '',
      unassigned: false
    };
    this.isAdmin = User.isAdmin();
    this.isReverseOrder = false;
    getAssignments();

    this.updateAssignments = () => {
      getAssignments();
    };

    this.openNotificationsModal = (languageKey) => {
      Requests.getVolunteers({params: {language: languageKey}}, Modals.openNotifications)
    };

    this.getVolunteersDisplay = (volunteers) => {
      return _.map(volunteers, volunteer => volunteer.first_name + ' ' + volunteer.last_name).join(', ');
    };

    this.viewAssignment = (assignment) => {
      $state.go('assignment', {
        assignmentId: assignment.id,
        assignment: assignment
      });
    }
  }
}

AssignmentsController.$inject = ['Modals', 'Requests', '$state', 'User', 'Enums'];
export default AssignmentsController;
