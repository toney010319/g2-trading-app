# README

# Stock, Forex & Crypto Trading App

## Table of Contents

- [Contributors](#contributors)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Description](#description)
- [Dependencies](#dependencies)
- [User Stories](#user-stories)

## Contributors

This project is developed by [toney010319](https://github.com/toney010319), [andradajus](https://github.com/andradajus), and [andrewizo](https://github.com/andrewizo).

## Features

- Design is optimized for large screen sizes (no media queries implemented).
- Utilizes React for the frontend.
- Rails backend via API.
- Roles: Admin and Traders.
- Admin approval
- Buying and Selling of different currencies (Crypto, Forex, and Stocks).
- Integrated simulation of payment (deposit).
- Transaction history
- Login and Registration (with email confirmation)
- Dynamic alert errors
- Portfolio of different currencies

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Ruby](https://www.ruby-lang.org/)
- [Ruby on Rails](https://rubyonrails.org/)

## Description

- Run (`npm run dev`) from frontend

_Note: vite, rails s, and mailcatcher will run via concurrently_

## Dependencies

### Ruby Gems (Run `bundle install` to install)

- [gem](https://rubygems.org/)
- [rack-cors](https://rubygems.org/gems/rack-cors)
- [devise-jwt](https://rubygems.org/gems/devise-jwt)
- [devise](https://rubygems.org/gems/devise)
- [jsonapi-serializer](https://rubygems.org/gems/jsonapi-serializer)
- [mailcatcher](https://rubygems.org/gems/mailcatcher) (Install independently via `gem install mailcatcher`)

### Node.js Packages (Run `npm install` to install)

- [concurrently](https://www.npmjs.com/package/concurrently)
- [heroicons](https://www.npmjs.com/package/heroicons)
- [axios](https://www.npmjs.com/package/axios)
- [chart.js](https://www.npmjs.com/package/chart.js)

## User Stories

### Admin User Stories

1. As an Admin, I want to create a new user to manually add them to the app.
2. As an Admin, I want to edit a specific user to update his/her details.
3. As an Admin, I want to view a specific user to show his/her details.
4. As an Admin, I want to see all the users that registered in the app so I can track all the users.
5. As an Admin, I want to approve a trader sign up so that he/she can start adding stocks.
6. As an Admin, I want to have a page for pending trader sign ups to easily check if there's a new trader sign up.
7. As an Admin, I want to see all the transactions so that I can monitor the transaction flow of the application.

### Trader User Stories

1. As a Trader, I want to create an account to buy and sell stocks
2. As a Trader, I want to log in my credentials so that I can access my account on the app
3. As a Trader, I want to receive an email to confirm my pending Account signup.
4. As a Trader, I want to receive an approval Trader Account email to notify me once my account has been approved.
5. As a Trader, I want to buy stocks to add to my portfolio. (Trader signup should be approved)
6. As a Trader, I want to have a My Portfolio page to view all my stocks.
7. As a Trader, I want to have a Transaction page to see and monitor all the transactions made by my actions
   of buying and selling.
8. As a Trader, I want to sell my stocks so that I can adjust my portfolio.
