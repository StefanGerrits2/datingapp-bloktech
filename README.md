# Ping Pong Partners 

![](http://i66.tinypic.com/2i77rr8.jpg)

## Description

This is a website to meet table tennis players. The following things are in my website:

* Login with an existent account
* When you succesfully login, the homepage will render your profile name
* Logout
* When you try to log in with wrong credentials, you get an error
* When you try to go to your profile page without being logged in, you get an error
* You can add a club to your profile, this contains the following:
  * Select the club name
  * Select the amount of years you have been a member of this club
  * Describe why you like this club
* You can delete the club from your profile

You can check my wiki to see more documentation about my project [here.](https://github.com/StefanGerrits2/datingwebsite-bloktech/wiki)
To see which sources I used, click [here.](https://github.com/StefanGerrits2/datingwebsite-bloktech/wiki/2.1-Sources-used)

## Installation

#### 1. Clone this repository to your computer
Run this command in your terminal:

```
git clone https://github.com/StefanGerrits2/datingwebsite-bloktech
```

#### 2. Navigate into the root of the folder
Run this command in your terminal:

```
cd datingwebsite-bloktech
```

#### 3. Install all depedencies
Run this command in your terminal:

```
npm install
```

#### 4. Run the server
Run this command in your terminal:

```
npm run start
```

NOTE: Make sure you are still located in the root of the `datingwebsite-bloktech` folder when running this command.

#### 5. Viewing the website
Open your browser and go to:

`localhost:3000`

You can change the port on the second code line in the *server.js* file. When you change this port, make sure it matches with the port after `localhost:`

#### 6. Usage

There are 2 accounts you can login with:

1. Username: `Stefan`
Password: `Stefan`

2. Username: `Denise`
Password: `Denise`

## Database

### All collections

![](https://imgshare.io/images/2019/03/31/Mongo139a01dc91292ce8f.jpg)

There are 2 collections in the database: clubs and profiles. 
* The club you add to your profile will be saved in the `clubs` collection.
* There are 2 pre-made profiles in the `profiles` collection. You can use these to login.

### The profiles collection
![](https://imgshare.io/images/2019/03/31/Mongo2.jpg)

This is how the `profiles` collection looks like. As you can see each document has a unique id, together with a username and a password.

### The clubs collection
![](https://imgshare.io/images/2019/03/31/Mongo3.jpg)

This is how the `clubs` collection looks like. As you can see each document has a unique id, together with the club name, time (the amount of years you are a member of this club) and a description (what you like about your club).

## License

[MIT](https://github.com/StefanGerrits2/datingwebsite-bloktech/blob/master/LICENSE.txt) © Stefan Gerrits
