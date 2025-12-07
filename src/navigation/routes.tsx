import  AboutUniversity  from '@/pages/AboutUniversity';
import  EmployeePage  from '@/pages/EmployeePage';
import  {IndexPage}  from '@/pages/IndexPage';
import  {InitDataPage}  from '@/pages/InitDataPage';
import  {LaunchParamsPage}  from '@/pages/LaunchParamsPage';
import  Profile  from '@/pages/Profile';
import  RecordBook  from '@/pages/RecordBook';
import  Schedule  from '@/pages/Schedule';
import  StudentLogin  from '@/pages/StudentLogin';
import  {ThemeParamsPage}  from '@/pages/ThemeParamsPage';
import  UniversitySchedule  from '@/pages/UniversitySchedule';
import  UserChoice  from '@/pages/UserChoice';

export const routes = [
  { path: '/', Component: IndexPage },
  { path: '/about-university', Component: AboutUniversity },
  { path: '/employee', Component: EmployeePage },
  { path: '/init-data', Component: InitDataPage },
  { path: '/launch-params', Component: LaunchParamsPage },
  { path: '/profile', Component: Profile },
  { path: '/record-book', Component: RecordBook },
  { path: '/schedule', Component: Schedule },
  { path: '/student-login', Component: StudentLogin },
  { path: '/theme-params', Component: ThemeParamsPage },
  { path: '/university-schedule', Component: UniversitySchedule },
  { path: '/user-choice', Component: UserChoice },
];