import { NbMenuItem } from '@nebular/theme';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';




function getUser() {
  // console.log(localStorage.getItem( JSON.parse('user1.superadmin')));
  var retrievedObject = localStorage.getItem('user1');
  var user1 = JSON.parse(retrievedObject);
  console.log('user1 ', user1);
  console.log('admin', user1.superadmin)

  return !user1.superadmin



}

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline', 
    link: '/pages/home',
    home: true,
  },
 
  {
    title: 'Admin Users',
    icon: 'person-outline',
    link: '/pages/AdminUsers',
    home: true,
    hidden: getUser()

  },
 
  {
    title: 'Staffs',
    icon: 'person-outline',
    link: '/pages/staffs',
    home: true,
  },
  {
    title: 'Courses',
    icon: 'book-outline',
    link: '/pages/courses',
    home: true,
  },
  {
    title: 'Testimonials',
    icon: 'speaker-outline',
    link: '/pages/testimonials',
    home: true,
  },
  {
    title: 'Course Registrations',
    icon: 'people-outline',
    link: '/pages/CourseRegistration',
    home: true,
  },
  {
    title: 'Partner Applications',
    icon: 'people-outline',
    link: '/pages/PartnershipApplication',
    home: true,
  },
  {
    title: 'Corporate Applications',
    icon: 'people-outline',
    link: '/pages/CorporateApplication',
    home: true,
  },
  {
    title: 'Enquires',
    icon: 'people-outline',
    link: '/pages/Enquires',
    home: true,
  },
  {
    title: 'Events',
    icon: 'book-outline',
    link: '/pages/events',
    home: true,
  },
]