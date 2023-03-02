# Missing data for recruiters

The missing data for the recruiters are email and pnr. To even be able to store these users we must use placeholder values for these columns since our schema has not null constraints on these columns. The columns also have the unique constraint and we must therefore generate unique placeholder values. We have choosen to use the primary key appended to the string 'missing-' for the placeholders.

To handle that this data is missing one could have a page were users can see and update their profile, including this missing data.

# Missing data for applicants

The missing data for the applicants are username and password which means they will not even be able to login. We also have not null constraints on these columns and unique constraint on the username column but this is solved in the same way as for recruiters.

To handle the missing data one could use have a page for legacy account access which can be navigated to without having logged in. On this page, one would provide an email and if there is legacy account in the database with that email, then an email would be sent to that address. The email would contain a link to a page with a randomized url so it can only be accessed by the person who received the email. The page would contain a form where the user would provide a username and password which would be added to that users account.
