# User stories

- **Register**: You can register in this managment system app (a.k.a to do list app).
- **Login**: If you are an already registred user you can login immediately.
- **Logout**: After finishing using the app you can logout.
- **Show tasks**: A user can only view thier tasks whilst an Admin can view all users tasks.
- **Completing tasks**: A user can mark his tasks as Checked and completed whenever he does complete his task.
- **Delete task**: Users can easily delete his tasks, And only Admins can delete any user tasks.
- **Adding tasks**: Both users and Admins can add tasks, but to themselves only.
- **Admins viewing all users**: Admins have access to a list of all users registred in the app.

# Frontend ER Diagram
![Untitled Diagram drawio (1)](https://user-images.githubusercontent.com/92247858/145263523-adc2bee7-485a-47f2-bd12-e7891f808fff.png)


# Components

- **Landing**
- **Login**
- **Register**
- **Tasks**
- **User Page**

# Fronend Links & Access

| Path      | Permissions | Behavior                                                                                                                                                  |
| --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /         | Public      | Landing page, it'll give the visitor two options: Logging in for logged users & registring for new users.                                                 |
| /register | Public      | Register new user, the default role of the registration is user & admins can register using the backend.                                                  |
| /login    | Public      | Users logging in page, after logging in it will instently navigate you to you tasks page.                                                                 |
| /tasks    | Privet      | Only registred users can access this page and view thier own tasks.                                                                                       |
| /userinfo | privet      | Only registred users can access this page and view thier own information, in this page Admins get an option to view a list of registred users of the app. |
