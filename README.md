# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Scheduler Project
React scheduler with up to five appointments per day. The information will be synced over multiple clients with the help of Web Sockets.

## Final Product

### Opening page

Landing page, with up to five appointments per day and dynamic counter for the remaining spots.
<img width="1403" alt="Screen Shot 2021-11-03 at 10 55 43 PM" src="https://user-images.githubusercontent.com/88121887/140251276-0d06397e-a295-4f2f-a14d-d0a5a472c1cd.png">


### Creating a new appointment
Allows the creation (or edition) of an appointment, by entering the name and selecting the interviewer.
<img width="1409" alt="makeappointment" src="https://user-images.githubusercontent.com/88121887/140252653-760c651e-6a21-4d69-aca9-2a8834ee81d5.png">

### Contextual warnings and Error handling
Warns the user if name field was left empty. As well as provides error when appointment cannot be set.

<img width="814" alt="error" src="https://user-images.githubusercontent.com/88121887/140252895-affb0b96-f877-42df-95bd-23d9eafd02cc.png">

## Testing Tool

### Storybook Component Tests
Each story is a specific test that verifies the visual display and behaviour of a component in isolation, detached from the full app.

<img width="749" alt="storybook" src="https://user-images.githubusercontent.com/88121887/140253489-70adbeac-1909-45e3-afe8-d82270ba956e.png">

### Cypress E2E Tests


<img width="1168" alt="cypress" src="https://user-images.githubusercontent.com/88121887/140253729-e419bb47-b587-403d-a698-83e9f58aaa51.png">
