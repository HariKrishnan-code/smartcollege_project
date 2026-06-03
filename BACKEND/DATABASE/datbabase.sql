CREATE DATABASE smart_college;

USE smart_college;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    reg_no VARCHAR(50),
    roll_no VARCHAR(50),
    email VARCHAR(100),
    class VARCHAR(50),
    degree VARCHAR(50),
    department VARCHAR(100),
    hod_name VARCHAR(100),
    advisor_name VARCHAR(100),
    phone VARCHAR(15),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    staff_id VARCHAR(50),
    department VARCHAR(100),
    subject VARCHAR(100),
    phone VARCHAR(15),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);