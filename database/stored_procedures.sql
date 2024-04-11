CREATE OR ALTER PROCEDURE [dbo].[spLoginUser]
    @Username NVARCHAR(50),
    @Password NVARCHAR(256) -- This should be a hashed password
AS
BEGIN
    -- Retrieve the user with the given username and password hash
    SELECT * FROM Users WHERE Username = @Username AND PasswordHash = @Password;
END
GO

CREATE OR ALTER PROCEDURE [dbo].[spRegisterUser]
	@FirstName NVARCHAR(50),
    @Username NVARCHAR(50),
    @Password NVARCHAR(256)
AS
BEGIN
    -- Insert user into the database
    INSERT INTO Users (Username, PasswordHash, FirstName)
    VALUES (@Username, @Password, @FirstName); -- Ensure the password is hashed before it's inserted here

    -- Return the newly created user
    SELECT * FROM Users WHERE Username = @Username;
END
GO

CREATE OR ALTER PROCEDURE [dbo].[CreateAppointment]
    @UserId INT,
    @ArrivalTime DATETIME2,
    @AppointmentCreated DATETIME2
AS
BEGIN
    INSERT INTO Appointments (UserId, ArrivalTime, AppointmentCreated)
    VALUES (@UserId, @ArrivalTime, @AppointmentCreated);
    
    -- Return the ID of the newly created appointment
    SELECT SCOPE_IDENTITY();
END
GO

CREATE OR ALTER PROCEDURE [dbo].[UpdateAppointment]
    @Id INT,
    @ArrivalTime DATETIME2
AS
BEGIN
    UPDATE Appointments
    SET ArrivalTime = @ArrivalTime
    WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE [dbo].[GetAppointmentById]
@Id INT
AS
BEGIN
    SELECT a.Id, a.UserId, u.Username, a.ArrivalTime, a.AppointmentCreated
    FROM Appointments a
    INNER JOIN Users u ON a.UserId = u.Id
    WHERE a.Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE [dbo].[DeleteAppointment]
    @Id INT
AS
BEGIN
    DELETE FROM Appointments
    WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE [dbo].[GetAppointmentsWithUserNames]
AS
BEGIN
    SELECT a.Id, a.UserId, u.Username, a.ArrivalTime, a.AppointmentCreated
    FROM Appointments a
    INNER JOIN Users u ON a.UserId = u.Id;
END
GO
