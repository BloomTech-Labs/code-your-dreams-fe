# Code Your Dreams

_Equipping K-12 and adult students with the skills and resources to innovate technology solutions for our world._

The Code Your Dreams (CYD) Curriculum Portal is an app that helps the CYD team provide access to course materials for chapter members across each organization. It is a tool that organizes files hosted in the cloud (like in Google Drive or Dropbox) by creating a single location where members can come to find links to all of the materials they need for their chapter. The portal provides organization for chapters and members, courses and links to course materials, as well as other administrative use cases.

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

### Prerequisites

- _(If there is no need for the app to appear in search engines, then this step can be ignored.)_ The code is written to be installed in a testing environment. Once the app is deployed it needs to be configured to allow search engine indexing. There are two files to update:

  1. `robots.js` : Delete the following lines of code, 12 and 1-4. Line 12, `disallow: "/",` is what blocks server indexing across the entire app. The first four lines are for comments that are no longer needed.

     ```
      // This file is temporarily set to disallow all bots
      // Set to [allow: "/",] when the app goes live
      // Also included a spot for generating a sitemap when ready

      export default function robots() {
        return {
          rules: {
            userAgent: "*",
            disallow: "/api/",
            disallow: "/portal/",
            disallow: "/style/",
            disallow: "/",
          },
          // sitemap: 'https://acme.com/sitemap.xml',
        }
      }
     ```

  2. `layout.js` : Delete the following code, lines 11-14. These lines prevent any indexing by web crawlers directly on the webpages.
     ```
      // Temporarily adding in to prevent indexing of the build site
      robots: {
        index: false,
      },
     ```

## QA Test Cases

The following section provides a comprehensive list of tests that should be performed to ensure that all functions of the application are working as intended. It is split apart into the different app user types and the aspects of the apps that they use.

**QA prerequisites:**

- An Auth0 account is required for the app to function.
- The Auth0 credentials must be added to the `.env` file.
- A CYD super user account must be created in Auth0.
- _Notes_
  - The app was built for use on a desktop and responsive design for mobile/table was not taken into consideration during development.
  - Modals do not auto-save, so any changes must be followed by clicking the "Save" button.

---

### Super Administrator

A super admin user is for CYD administrators to perform all CRUD functions within the app.

- Login to the app with a super admin account.
  - Verify that app is forwarded to the Courses page.
  - Verify that "Code Your Dreams Admin" appears in the header.

#### Superuser admin

- Click on the Admin page link.
  - Verify that the super user table is empty and the page loads properly.
- Create a new super admin using the new user button (check the "Make a Super Admin" option in the form).
  - Verify that the new user appears on the Super Users table on the admin page.
  - Verify that the new user exists in the Auth0 account.
- Click on the edit user button and update the user's name and email address and save the changes.
  - Verify that both the name and email address are updated on the admin page.
- Create a new super user (do NOT check the super admin checkbox).
  - Verify that the user appears on the admin page.
- Click on the edit user button and check the Super Admin checkbox and save the changes.
  - Verify that the "Super Admin?" column in the table says "Yes" for that user.

#### Materials admin

- Verify that the materials table is empty and the page section loaded without issue.
- Click on the plus button to create a new material type.
  - Verify that the new type was added to the list.
- Create a two more types (to be used for later testing).

#### Course admin

- Click on the Courses page link.
  - Verify that the courses table is empty and the page loads properly.
- Click on the plus button to create a new course.
  - Verify that the new course is added to the table on the Courses page.
- Open the course page by clicking the link in the course name.
- Change the course description.
  - Verify that the description changed on the course page.
- Add a new material to the course (use any URL like, https://bing.com).
  - Verify that the two options created earlier are avaiable to select from in the dropdown.
  - Verify that the new material appears on the materials table.
- Click on both of the course material links (icon button and material name).
  - Verify that the links open in a new tab/window in the browser.
- Change the material type to the other type not used.
  - Verify that the type changes in the table.
- Mark the course as visible.
  - Verify in both on the Course page (course table "eyeball") and on the course detail page (hidden alert banner is gone).
- Create a second course.
  - Verify that the new course appears on the table.

#### Chapter admin

- Click on the Chapters page link.
  - Verify that the chapters table is empty and the page loads properly.
- Click on the plus button to create two new chapters.
  - Verify that the new chapters are added to the table on the Chapters page.
- Open one of the chapter pages by clicking the link in the chapter name.
- Add a chapter user using the new member button (use any settings for that user).
  - Verify that the new member appears in the members table.
- Link two courses to the chapter.
  - Verify that the linked courses appear in the courses table.

#### Member admin

- Click on the Members page link.
- Click on the plus button to create a new member (add to the chapter without any members).
  - Verify that the new member is added to the table on the Members page.

#### User profile

- Click on the profile link.
- Update the user name.
  - Verify that the new name appears in the app.
- Logout from the app.

---

### Super User

A super user is a CYD member that has read access to all data within the app.

- Login to the app with a super user account.
  - Verify that app is forwarded to the Courses page.
  - Verify that "Code Your Dreams Staff" appears in the header.

#### Courses

- Verify that the courses created in the test cases above appear on the courses table.
- Click on a course link.
  - Verify that the course materials appear on the table.
- Click on both of the course material links.
  - Verify that the links open in a new tab/window in the browser.

#### Members

- Click on the members link.
  - Verify that the member table is visible on the page.
  - Verify that the edit links column is NOT visible on the table.

#### Chapters

- Click on the Chapters page link.
  - Verify that the chapters appear on the table.
- Open one of the chapter pages by clicking the link in the chapter name.
  - Verify that the chapter page is visible and the page is view-only (NO action links).

#### User profile

- Click on the profile link.
- Update the user email address.
- Logout from the app.

---

### Chapter Administrator

A chapter admin user enables those with the role to administer other users in their chapter.

#### Courses

- Login to the app with a chapter admin account.
  - Verify that app is forwarded to the Courses page.
  - Verify that the member chapter name appears in the header.
  - Verify that the assigned chapter course (as created above) is visible for the user.
- Click on the course link.
  - Verify that the course materials appear on the table.
- Click on both of the course material links.
  - Verify that the links open in a new tab/window in the browser.

#### Member admin

- Click on the members link.
  - Verify that the member table is visible on the page.
- Add a new chapter member account and make the user an admin.
  - Verify that the new user appears in the member table.
- Edit the user and remove chapter admin for the user.
  - Verify that the "Admin?" column for the user is empty.
- Delete the new user account.

#### User profile

- Click on the profile link.
- Update the user email address.
- Logout from the app.

---

### Chapter User

- Login to the app with a basic user account.
  - Verify that app is forwarded to the Courses page.
  - Verify that the member chapter name appears in the header.
  - Verify that the assigned chapter course (as created above) is visible for the user.
- Click on the course link.
  - Verify that the course materials are available.
- Click on both of the course material links.
  - Verify that the links open in a new tab/window in the browser.

#### User profile

- Click on the profile link.
- Update the user email address.
  - Verify that the new email address appears on screen in the app.
- Logout from the app.

---

### Testing Cleanup

- Login to the app with a super admin account.

#### Users

- Click on the Chapters link.
- Click on the link for the chapter that was created for testing.
  - Verify that there the member list has at least one name on it.
- Attempt to delete the chapter.
  - Verify that the app prevents the chapter from being deleted (because of linked members).
- Click on the Members link.
- Remove all users created for testing.
  - Verify that all new users do not show up on the user table.

#### Chapters

- Click on the Chapters link.
- Click on the link for the chapter that was created for testing.
  - Verify that the member list is empty.
- Delete the chapter.

#### Courses

- Click on the Courses link.
- Click on the link for the course that was created for testing.
- Attempt to delete the course.
  - Verify that the app prevents the course from being deleted (because of linked materials).
- Scroll down to the materials table.
- Remove all materials created for testing.
- Delete the course.

#### Admin

- Click on the Admin link.
- Delete all super users created for testing (do NOT delete the account being used for cleanup).
  - Verify that the user is no longer on the table and not in Auth0.
- Delete all material types created for testing.
- Click on the profile page.
- Logout from the app.
- _(Optional)_
  - If the super admin account is no longer needed, go to Auth0 and delete the super admin account used for testing.
