module.exports = {
  /**
   * Utility function for adding a link to the accompanying user resource of an application
   * @param {*} application The application to add a link to
   */
  insertApplicantLink: (application) => {
    if (application?.dataValues?.applicant?.id)
      application.dataValues.applicant.dataValues.ref = `/users/${application.dataValues.applicant.dataValues.id}`;
  },
  /**
   * Utility function for adding links to the accompanying user resources of an array of applications
   * @param {*} applications The applications to add links to
   */
  insertApplicantLinks: (applications) => {
    applications.map((application) => {
      if (application?.dataValues?.applicant?.id)
        application.dataValues.applicant.dataValues.ref = `/users/${application.dataValues.applicant.dataValues.id}`;
      return application;
    });
  },
};
