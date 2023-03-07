module.exports = {
  insertApplicantLink: (application) => {
    if (application?.dataValues?.applicant?.id)
      application.dataValues.applicant.dataValues.ref = `/users/${application.dataValues.applicant.dataValues.id}`;
  },
  insertApplicantLinks: (applications) => {
    applications.map((application) => {
      if (application?.dataValues?.applicant?.id)
        application.dataValues.applicant.dataValues.ref = `/users/${application.dataValues.applicant.dataValues.id}`;
      return application;
    });
  },
};
