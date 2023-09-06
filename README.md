# Code Your Dreams

Equipping K-12 and adult students with the skills and resources to innovate technology solutions for our world.

The Code Your Dreams (CYD) Curriculum Portal is an app that helps the CYD team provide access to chapter members across the organization. Is is a tool that helps to organize files hosted on the cloud (like in Google Drive or Dropbox) and create a single location where members can come to find links to all of the materials they need for their chapter. The portal provides organization for chapters and members, courses and links to course materials, and other administrative use cases.

## Deployed Project

[Code Your Dreams](https://code-your-dreams-fe.vercel.app/)

## App Details

### Stack

- Next.js 13.4 (app router)
- Express.js
- Sass

### User types

- Super admin - CYD user that can administer all app content and features
- Super user - CYD user with access to view all content
- Chapter admin - a chapter user that can administer other members of the chapter
- Chapter user - a chapter user that can view chapter materials

## Setup Requirements

### Frontend

TBA

### Backend

TBA

### Auth0

TBA

## QA Test Cases

QA prerequisites:

- A CYD super user account must be created in Auth0.
- Notes
  - The app was built for use on a desktop and responsive design for mobile/table was not taken into consideration during development.
  - Modals do not auto-save, so any changes must be followed by clicking the "Save" button.

### Super Admin

#### Basics

- Login to the app.
  - Verify that app is forwarded to the Courses page.
- Click on the Admin page link.

#### User admin

- Create a new super admin using the new user button (check the "Make a Super Admin" option in the form).
  - Verify that the new user appears on the Super Users table on the admin page.
  - Verify that the new user exists in the Auth0 account.
- Click on the edit user button and change the user's name and email address.
  - Verify that both the name and email address are updated on the admin page.
- Click on the edit user button and uncheck the Super Admin checkbox.
  - Verify that the "Super Admin?" column in the table does NOT say "Yes" for that user.
- Click on the edit user button and delete the user from the app.
  - Verify that the user is removed from the table on the admin page.
  - Verify that the user is no longer in Auth0 as well.
- Create a new super user (do NOT check the super admin checkbox).
  - Verify that the user appears on the admin page.
- Delete the new super user.
  - Verify that the user is no longer on the table and not in Auth0.

#### Materials admin

- Click on the plus button to create a new material type.
  - Verify that the new type was added to the list.
- Create a two more types (to be used for later testing).
- Delete one of the types that was created.
  - Verify that the deleted type is removed from the table on the admin page (two should remain).

#### Course admin

- Click on the Courses page link.
- Click on the plus button to create a new course.
  - Verify that the new course is added to the table on the Courses page.
- Open the course page by clicking the link in the course name.
- Change the course description.
  - Verify that the description changed on the course page.
- Add a new material to the course (use any URL like, https://bing.com).
  - Verify that the two options created earlier are avaiable to select from in the dropdown.
  - Verify that the new material appears on the materials table.
- Click on both of the course material links.
  - Verify that the links open in a new tab/window in the browser.
- Change the material type to the other type not used.
  - Verify that the type changes in the table.
- Delete the material from the course.
  - Verify that the table row for the type is removed from the table.
- Mark the course as visible.
  - Verify in both on the Course page (course table "eyeball") and on the course detail page (hidden alert banner is gone).
- Delete the course.
  - Verify that the app returns to the Courses page and that the course is no longer on the table.

### Super User

### Chapter Admin

### Chapter User
