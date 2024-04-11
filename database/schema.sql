CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(256) NOT NULL,
    Email NVARCHAR(100),
    IsActive BIT DEFAULT 1, -- Assuming 1 for active and 0 for inactive
    CreatedDate DATETIME2 DEFAULT GETDATE()
);


CREATE TABLE Appointments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    ArrivalTime DATETIME2 NOT NULL,
    AppointmentCreated DATETIME2 NOT NULL,
    CONSTRAINT FK_Appointments_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);