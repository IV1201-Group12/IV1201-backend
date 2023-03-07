module.exports = {
  insertApplicantLink: (application) => {
    if (application?.dataValues?.applicant?.id)
      application.dataValues.applicant.dataValues.ref = `/user/${application.dataValues.applicant.dataValues.id}`;
  },
  insertApplicantLinks: (applications) => {
    applications.map((application) => {
      if (application?.dataValues?.applicant?.id)
        application.dataValues.applicant.dataValues.ref = `/user/${application.dataValues.applicant.dataValues.id}`;
      return application;
    });
  },
};
