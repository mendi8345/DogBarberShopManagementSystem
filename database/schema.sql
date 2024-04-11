CREATE TABLE Users (
    [Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[PasswordHash] [nvarchar](256) NOT NULL,
	[FirstName] [nvarchar](100) NULL,
);


CREATE TABLE Appointments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    ArrivalTime DATETIME2 NOT NULL,
    AppointmentCreated DATETIME2 NOT NULL,
    CONSTRAINT FK_Appointments_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);