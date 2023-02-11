# Requirements Document

## Digital Beginner Stock Trading

#### Pelican Innovations


Feb 10, 2023

Last update: Feb 10, 2023

---

<table>
  <tr>
    <th>Name</th>
    <th>Date</th>
    <th>Reason For Changes</th>
    <th>Version</th>
  </tr>
  <tr>
    <th>Whole Group</th>
    <th>26/01/2023</th>
    <th>Creation of the document</th>
    <th>0.0.1</th>
  </tr>
  <tr>
    <th>Final Document</th>
    <th>10/02/2023</th>
    <th>Finishing the RD</th>
    <th>1.0.0</th>
  </tr>
</table>

# 1 Introduction

## 1.1 Purpose

This Requirements Document (RD) describes the initial creation and final functionality of the “Digital Abstract Stock Trading” application. This application is intended to train youth, and beginners as defined in the glossary of terms, on how to trade on the stock market so that they don’t have to lose real money while learning how the stock market works.This document is currently at the latest version outlined in the “Revision History” table located on the page above and was created to describe the whole system.

## 1.2 Project Scope

The purpose of the software specified in this RD is to train youth and beginners on how to trade on the stock market. This application will allow more people to gain financial stability as they age and learn about risk/benefit through an enjoyable and engaging interface.

## 1.3 Glossary of Terms

<table>
  <tr>
    <th>Term</th>
    <th>Definition</th>
  </tr>
  <tr>
    <th>API
    <th>Application Program Interface</th>
  </tr>
  <tr>
    <th>Beginners</th>
    <th>Users aged 18 and older who wish to engage with the system to learn how to trade stocks </th>
  </tr>
  <tr>
    <th>Client</th>
    <th>The company that requested the development of this application - Stock Enjoyers Inc. </th>
  </tr>
</table>




## 1.4 References
At this point the document has no external references.



## 1.5 Overview
This document is intended to provide an overview and requirements for the development and use of the “Digital Beginner Stock Trading” application as commissioned by Stock Enjoyers Inc.


This document is broken up into four main sections starting with an overall description of the product. This overall description discusses the context of the product along with the primary features and user groups.This document then discusses the features in more detail along with what should be completed for each feature. Next the functional requirements are discussed followed by any other requirements for the system. 



# 2 Overall Description


## 2.1 Product Perspective
The product being described in this document, “Digital Beginner Stock Trading”, is an extension of the existing real world stock market. This is the first product within its family at the client company and is intended to be self contained. An API is intended to be used to link the existing stock market to this application. Figure 1 below is a simple diagram to illustrate the major components of this application and how they will be connected together.

Figure 1: System architecture overview

## 2.2 Product Features
The primary features of the “Digital Beginner Stock Trading” application are: account login, buying and selling of the virtual “stocks”, account summary with a history of what was sold when, and graphs to show the current state of the stocks as well as a history of how they have performed. Each of these features will be described in more detail in section 3 of this requirements document.


## 2.3 User Classes and Characteristics
The “Digital Beginner Stock Trading” application will have one primary user group. This primary user group is intended to be youth aged 13-17. However, it is possible that beginners, as defined in the glossary of terms, wanting to learn about the stock market will also use the application. These user groups are separated as the adults using the system will have more life experience and could have more knowledge about the stock market overall.


### 2.3.1 Youth users
This user group is the favored users of the system. The youth users will likely have the least background knowledge about the system, and the largest learning curve on how to use the system and the meaning behind the values, graphs, and charts shown. All the requirements for this application pertain to this user group as this group is the favored group of users.

### 2.3.2 Beginners
This user group is less important to satisfy and thus the requirements outlined in this document will not be directed towards them.

## 2.4 Operating Environment
This software will operate on a server and must be accessible from any internet connection. The hardware for this system should be any machine that the user wants to access the server from. The application should be able to support any operating system and version of said operating system. This application should peacefully coexist with the internet and connecting with it should not cause any harm to the users hardware.

## 2.5 Design and Implementation Constraints
The primary constraint to development is the implementation of the API for scraping the stock market. The only hardware constraint to the system will be data storage for each of the users and the user data. This hardware constraint will not affect this stage of development but it is important to keep in mind moving forward. The software for this project must be modular and easy to understand as the client company will be responsible for maintenance of the system after the initial release.

## 2.6 Assumptions and dependencies

### 2.6.1 Assumptions

#### Internet Connection
Equipment used will be internet based and therefore users having a secure internet connection will be assumed.


#### Stock API
This app is assuming the stock market API used will be functional and running. 


#### User Availability
This app assumes the users will regularly monitor their “investments” to keep track of their profit/loss and receive feedback.




### 2.6.2 Dependencies


#### Third party stock API
All free stock APIs give stock data with a 15 minute delay, which makes day trading not possible
Free stock APIs all impose some sort of request limit / hour, which limits the background stock tracking
	
#### Firebase
The app depends on firebase to store its data and handle other interactions such as web hosting



# 3 System Features


This section of the document describes in detail the four primary features mentioned in section 2.2. To repeat the features they are; account login, buying and selling the virtual stocks, account summary and account history, and visualization of the stocks history.

## 3.1 Account Login
This system needs to be able to allow users to create an account and allow the user to log in to the aforementioned account.

### 3.1.1 Description and Priority


This feature is the foundation for users being able to interact with the system in a secure way. Therefore, priority for this feature is highest.

## 3.1.2 Functional Requirements
The functional requirements associated with this feature are:


REQ
Data storage
1: The system must be able to hold the account information for a TBD number of users.

REQ
Email verification
2: The system must require the users to register with a valid email.

REQ
Account recovery
2: The system must provide users with a way of recovering their account if they forget their password.

## 3.2 Buying and Selling the Virtual stocks
The “Digital Beginner Stock Trading” application must allow the user to buy and sell the simulated stocks using the simulated currency.

### 3.2.1 Description and Priority

This feature is the second highest priority and should be implemented once the user can create an account. Buying and selling stocks should affect the account balance of whomever is signed in. 

### 3.2.2 Functional Requirements
The functional requirements associated with this feature are:

REQ
Balance information
1: The system must display an accurate account balance to the user.

REQ
Buy stocks
2: The system must allow the user to buy the simulated stocks.

REQ
Sell stocks
3: The system must allow the user to sell the simulated stocks.

## 3.3 Account Summary and History
This feature regards what information is shown to the user when viewing their account portfolio information.

### 3.3.1 Description and Priority


The user should be able to view the value of the stocks that they currently have purchased as well as when it was purchased and what the total cost of that purchase was. Since this feature is not required for the primary functionality of the system and thus should be in the lowest priority grouping.
3.3.2 Functional Requirements
The functional requirements associated with this feature are:

REQ
Stock purchase history
1: The system must be able to display a record of the stocks purchased by the user.

REQ
Stock sale history
2: The system must be able to display a record of the stocks sold by the user.

REQ
Balance
3: The system must display an accurate balance of the user's account.

REQ
Total difference
4: The system must display the gain or loss of all the held stocks compared to the purchase price.

## 3.4 Visualization of Stock History

A graph or visual representation of a stock’s history must be available and actively updated according to the stock’s value.

### 3.4.1 Description and Priority


This feature must show the user a visual representation of the stocks historical value on a specified time range. This feature is of medium priority as it will be a useful feature for the user. 

### 3.4.2 Functional Requirements
The functional requirements associated with this feature are:

REQ
Resizeable
1: The user must be able to resize the visualization to one that is suitable for their needs.

REQ
Time Selection
2: The user must be able to select the time range that the visualization spans ie. 24 hours, 1 week, 1 month, 5 months, and 1 year.

REQ
Accuracy
2: The visual must display accurate and up to date analytics for the selected stock.


# 4 External Interface Requirements


This portion of the document describes the interactions that this system will have at an external level.


## 4.1 User Interfaces
The system will be designed with a user interface similar to the ones in [the UI file here](./UI.md)


## 4.2 Software Interfaces
This product will need to interface with the Alpha Vantage Stock API. This API allows the ability to connect our app to the real world stock market to be able to track stocks in real time, and give users real time updates on their portfolios. Additionally, through the use of Google’s Firebase platform we will hold user login information. Firebase will also do the web hosting for our web app. 


As development has not started in full yet the exact libraries that are intended to be used have not been specified. This will be added and updated in future versions of this document.



## 4.3 Communications Interfaces
To fulfill the requirements mentioned above in this document the system will need to be able to interact with users' email. Additionally, based on the fact that this system will be web hosted there will need to be interactions with web browsers and network communication protocols.



# 5 Other Non Functional Requirements


The non-functional requirements for the “Digital Beginner Stock Trader” are outlined below.
## 5.1 Security Requirements
The system developed must keep usernames, passwords, and other account information secure. The system must not have any data or memory leaks and must always be up to date with current user information regardless of any external factors ie power outages, and system maintenance periods


## 5.2 Software Quality Attributes

In addition the “Digital Beginner Stock Trader” application must have the following attributes:
The stock trading application must be maintainable over the course of one (1) year and must be maintainable by an external team.
The application must be modular, allowing modifications to one portion of the system without requiring the whole system to be updated.



# 6 Other Requirements
Currently there are no other requirements for the project. This section will be updated in future iterations of the document should new requirements arise. 




# Appendix: Issues List


Currently there are no issues for the project. This section will be updated in future iterations of the document should new issues arise. 

