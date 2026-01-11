import { Translate } from '~/i18n';

export const EdgeXJobRoleTypeSelect = [
   { value: 'owner_founder', label: <Translate id="web:edgex_job_role_owner_founder" /> },
   {
      value: 'director_manager_principal',
      label: <Translate id="web:edgex_job_role_director_manager_principal" />,
   },
   { value: 'head_of_department', label: <Translate id="web:edgex_job_role_head_of_department" /> },
   { value: 'academic_educator', label: <Translate id="web:edgex_job_role_academic_educator" /> },
   { value: 'university_faculty', label: <Translate id="web:edgex_job_role_university_faculty" /> },
   { value: 'government_ministry', label: <Translate id="web:edgex_job_role_government_ministry" /> },
   { value: 'commercial_supplier', label: <Translate id="web:edgex_job_role_commercial_supplier" /> },
   { value: 'investor', label: <Translate id="web:edgex_job_role_investor" /> },
   { value: 'student', label: <Translate id="web:edgex_job_role_student" /> },
   { value: 'other', label: <Translate id="web:edgex_job_role_other" /> },
];
