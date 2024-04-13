# DogBarberShop
**Prerequisites**
Visual Studio 2019 or later  
.NET 5 SDK
Node.js (for React dependencies)

**Project Setup**
 Use Git to clone the repository to your local machine, or download the ZIP file and extract it.
git clone https://github.com/yourusername/DogGroomingManagementSystem.git




**Restore Dependencies:**
Open the Project in Visual Studio: Navigate in terminal to the folder where you cloned the repository and run 
--dotnet restore
for restoring .net dependencies

For the React frontend,  navigate to the ClientApp folder
then run
--npm install
**Restore Dependencies:**
For the React frontend,  navigate to the ClientApp folder
then run** npm install**.
>>>>>>> 43ea2996e43c46905ae23ac87afe3efd4e9f5029

**Database Setup**
Using SQL Server Object Explorer in Visual Studio:

Open SQL Server Object Explorer (View > SQL Server Object Explorer).
Connect to your SQL Server instance (LocalDB, for example).
Right-click on Databases and press "Add New Database".
 Name it "DogBarberShop"
 
navigate to the appSetting.json and change the databaseName to the name you choose
"ConnectionStrings": {
    "DogBarberShop": "Data Source=<your dataBase here>;Initial Catalog=DogBarberShop;Integrated Security=SSPI;"
 }
.
**Running Database Scripts:**
Locate the database folder in the project files.
Right-click on your newly created database in SQL Server Object Explorer, select New Query, copy-paste the SQL script content (schema and stored procedures), and execute them to set up the database structure and initial data.

**Running the Application**
Start the Application:  Navigate in terminal to the folder where you cloned the repository

Registering and Logging In: Access the application through your browser at the URL provided by Visual Studio(https://localhost:5001) . Use the registration page to create a new account and log in.
Managing Appointments: Once logged in, users can add new appointments, edit existing ones, or delete them as needed. The system enforces restrictions based on user roles.
