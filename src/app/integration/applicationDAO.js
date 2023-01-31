const applications = [
  { id: 1, applicant_name: 'Jakob Olsson', status: 'accepted' },
  { id: 2, applicant_name: 'Abhinav Kalra', status: 'rejected' },
  { id: 3, applicant_name: 'Edvin Alvaeus', status: 'unhandled' },
];

module.exports = {
  getAllApplications: () => {
    return applications;
  },
};
