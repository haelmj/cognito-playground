# Flow

- user gets created by admin
- user logs in with temp password and is prompted to input new password
- user is then prompted to setup totp
- user is then redirected accordingly
- user logs in with confirmed password and inputs totp then is redirected accordingly
- user forgets password and clicks forgot password; inputs username and verification code they received via email
- user should be able to logout
- user should be shown a dashboard on login, with options available to them
- user should be able to go to settings to trigger a password change
- admin should have a view to manage users...increase user options as well as give user

## User attributes

- Name: string
- Email: string
- Role: string(regular, admin)
- Permissions: array
