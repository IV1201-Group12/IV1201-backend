-- Create result set for users
select 
	person_id as id, 
	person."name" as firstname, 
	surname as lastname, 
	case 
      when email is null then concat('missing-', person_id)
      else email
	end as email, 
	case 
      when pnr is null then concat('missing-', person_id)
      else pnr
	end as pnr,  
	case 
      when username is null then concat('missing-', person_id)
      else username
	end as username,  
	case 
      when "password" is null then concat('missing-', person_id)
      else crypt("password", gen_salt('bf'))
	end as "password", 
	"role".name as "role"
from person, "role"
where person.role_id = "role".role_id

-- Create result set for applications
select distinct person_id as id, 'unhandled' as status, 1 as "version", person_id as "applicantId"
from competence_profile
union
select distinct person_id as id, 'unhandled' as status, 1 as "version", person_id as "applicantId"
from availability

-- Create result set for availabilities
select from_date, "to_date", person_id as "applicationId"
from availability

-- Create result set for competences
select 
	competence."name", 
	competence_profile.years_of_experience, 
	competence_profile.person_id as "applicationId"
from competence, competence_profile
where competence_profile.competence_id = competence.competence_id 
