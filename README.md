# Task Manager App

Welcome to the Task Manager app! This is a web-based project management tool that helps teams stay organized and on track. With this app, you can create projects, assign tasks, and collaborate with other users to get work done efficiently.

## Features

- User registration and login
- User profile management
- Project creation and management
- Task creation and management
- Board creation and management
- Issue type creation and management
- Epic creation and management
- User assignment to projects and tasks
- Multiple roles (Super Admin, Admin)
- Different views for Super Admin and Admin
- Super Admin can change user roles from Admin to Super Admin
- Secure authentication and authorization


## Installation

To run this app on your local machine, follow these steps:

1. Clone the repository:

    https://github.com/joglidze/task-manager-main.git



2. Navigate to the project directory:

```cmd
cd task-manager-app

```
3. Install the dependencies:

```cmd
npm install
```

4. Run the app:

```cmd
ng serve --open
```

The app should now be running on `http://localhost:4200/`.

## Usage

To use the app, follow these steps:

1. Register a new account or log in to an existing account.

2. If you are a Super Admin, you can see all the projects, users, and tasks in the system. If you are an Admin, you can only see the projects that you are assigned to.

3. To log in as the Super Admin, use the following credentials:
- Email: lukajoglidze@gmail.com
- Password: 123456789
           
4. Create a new project by clicking on the "Create Project" button on the dashboard. Enter a name and description for the project.

5. Add users to the project by clicking on the "Add Users" button on the project page. You can assign users different roles, such as project manager or team member.

6. Create tasks for the project by clicking on the "Create Task" button on the project page. Enter a name and description for the task, and assign it to a user.

7. Create boards, issue types, and epics for the project by clicking on the respective buttons on the project page.

8. Collaborate with other users by assigning tasks to them and leaving comments on tasks.

9. If you are a Super Admin, you can change the role of an Admin to a Super Admin by clicking on the "Edit User" button on the Users page.




