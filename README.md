
# Technical Assessment

### Table of Contents
1. [Languages & Frameworks](#languages--frameworks)  
2. [Status of the Given Requirements](#status-of-the-given-requirements-88)  
3. [Additional Features Implemented](#additional-features-implemented)  
4. [Best Practices Followed](#best-practices-followed)  
5. [Project Environment Setup](#project-environment-setup)  
6. [Run Project on Localhost](#run-project-on-localhost)  
7. [Screenshots of Running Application](#screenshots-of-running-application)  

<br />

## Languages & Frameworks
- Frontend: Vue.js (JavaScript)
- Backend: Laravel (PHP)
- Database: MYSQL

<br />

## Status of the given requirements: (8/8)
1. :white_check_mark: Create a form with the above fields.
2. :white_check_mark: On form submission, the data should be saved in the database.
3. :white_check_mark: Implement functionality to view the saved data in a table format, Use pagination for the saved records.
4. :white_check_mark: Implement functionality to update the existing data.
5. :white_check_mark: Implement functionality to delete the data.
6. :white_check_mark: Perform validation on the form fields (eg, ensure email is valid, name is required, phone number is numeric).
7. :white_check_mark: Ensure that the file upload for the profile picture is handled correctly (optional).
8. :white_check_mark: Display error messages for invalid input (eg, invalid email format, missing required fields).

<br />

## Additional features implemented
1. Authentication (Admin Authentication)
2. Responsivess
3. Custom Alerts and Confirmations
4. Loading Animation (Spinner)

<br />

## Best Practices Followed
1. Reusabable Components
2. Comments
3. Organized Project Structure

<br />

## Project Environment Setup
- PHP 8.4.6
- Composer 2.8.8
- Node 20.17.0
- NPM 11.2.0
- MySQL 8.0

<br />

## Run Project on localhost
1. Clone the project
   - Using HTTP
     
     ```bash
     git clone https://github.com/GokulAbisheak/technical-assessment.git
     ```
   - Using SSH
     
     ```bash
     git clone git@github.com:GokulAbisheak/technical-assessment.git
     ```
   - Using Github CLI
     
     ```bash
     gh repo clone GokulAbisheak/technical-assessment
     ```
2. Navigate to backend folder

   ```bash
   cd backend
   ```

3. Install dependencies

   ```bash
   composer install
   ```

4. Migrate the database

   ```bash
   php artisan migrate
   ```

5. Run the seeders

   ```bash
   php artisan db:seed
   ```

6. Start the backend

   ```bash
   php artisan serve
   ```

7. Open a new terminal and navigate to frontend folder

   ```bash
   cd frontend
   ```

8. Install the dependencies

   ```bash
   npm install
   ```

9. Run the frontend

    ```bash
   npm run dev
   ```

<br />

## Screenshots of running application

![image](https://github.com/user-attachments/assets/8d46392a-4357-490d-a684-1b43b122bbbc)
![image](https://github.com/user-attachments/assets/d04401af-d92e-4f94-887c-d82ed4ca435c)
![image](https://github.com/user-attachments/assets/d6777317-ab69-4f42-a800-fe9c357f01ad)
![image](https://github.com/user-attachments/assets/def91e5c-87af-4da1-8d60-2826928aba79)
![image](https://github.com/user-attachments/assets/fb8fe6fe-f40a-460d-b7d6-a165eb5c7644)
![image](https://github.com/user-attachments/assets/e7865b31-4e59-45d9-bdac-b1ea6bbe9ca1)
![image](https://github.com/user-attachments/assets/4de6bc98-4d25-402d-bd87-8d28b61a05cc)





