# Employee Tracker

## Description

Through the use of Postgres(SQL) and Inquirer.js, this CLI interface allows you to create different departments, roles, and employees to store in a database for easy tracking. Each employee is assigned a role; each role is assigned a department. You can create, update, or delete any employee, role or department. First making sure to create the department, then create a role for that department, lastly the employee assigned that role.

## Requirements

Make sure you have Postgres installed and set up on your machine.
> If you dont have Postgres installed, click [here](https://www.w3schools.com/postgresql/postgresql_install.php).

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)

## Installation

In the CLI, run these commands to get started:

> To install dependencies
```
npm i
```
> Log into Postgres
```
psql -U postgres
```
> Change directory
```
\cd db;
```
> Set up database
```
\i schema.sql
```
> (OPTIONAL) Populate with dummy data
```
\i seed.sql
```
> Exit Postgres terminal
```
exit;
```
> Start the application
```
npm start
```

## Usage

This app was made to help employers keep track of their employees, what departments they're in, their salary, their roles, and their managers. Through the easy to use interface, you can set all the employees, roles, and departments to your needs. For an example guide on how to use the software or whats availabe,

Watch this [Demo](https://drive.google.com/file/d/1QkxH2jfiTEr_M2cv2Ebj87O3Z1_6SmkW/view?usp=sharing)!

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributions

If you wish to contribute to this project, follow [Github's Contribution Guidelines](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)
