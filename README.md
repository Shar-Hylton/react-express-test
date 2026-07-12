# Project Overview

In this practice project, I will be creating an Express Server with secured endpoints allowing users from the client to access certain data. I will also be using MongoDB as my cloud storage to store user data. For this project I will be using React/NextJs for the client side rendering.

# Task

- Build a web app where:

    * Users can register & log in
    * Authenticated users can create, view, edit, and delete private content
    * Some endpoints are protected and is accessible to only authorized users
    * MongoDB stores users and their data
    * Next.js handles UI and client-side requests
    * Express.js handles authentication & protected APIs

- Express Handles:
    * authentication
    * API routes
    * database access

- Next.js handles:
    * routing
    * rendering UI
    * state
    * conditional rendering



# react-express-test
- In this test project, I used react/next.js for the front end design while dealing with data validation on different endpoints using express.js. This project prepares me for real world experiences using various authentications and authorizations on specific user endpoints.

# Challenges and Solutions
* This project had many challenges I had to figure out. I have grown so much from these challenges and I would like to share some these challenges:

- I needed to figure out how to get the Navbar to render different state as it relates to user authentication.
`I solved this by checking isAuthenticated in the navbar component and render accordingly to the boolean value`

- Navbar needed to be accessible through all pages except for the auth pages.
- Navigation was one of the biggest challenges I faced. 
`I realized that using the back tab buttons was routing to the auth page even after I am logged in, I need to understand how to use redirect and useRouth() functions.`

- I had issues figuring out how to authorize users who has the rights to edit and delete note.
`I added isOwner props on the NoteCard and in NoteList check if the current logged in user, by id, is the same user that is the owner of that note, thanks to MongoDB that already has the user id on each note. Then prevent authorized users by checking if the isOwner is true and render the edit/delete buttons accordingly, while preventing the possibility of unathorized users from express using middleware`.

- Some components are seen for a slight moment before the authentication check is completed and routing to another page.

`One solution is to use middleware.ts but this approach is deprecated. The other solution is do a check using ternary operators instead of if statements. or having an if else block.`

- I honestly struggled as well figuring out how to map the appropriate errors on the password field on the log in form, this took me sometime to think about my logics a little bit, but after tweaking, and thinking, I finally got a break through.

`I already had a validation.ts and since I was using that file to check the validation I let it return an object that both returned the curresponding boolean and error message. There was also a file that shows the static messages on these errors. Each error type is checked as the user inputs a value and then it checks which criteria is missing and sends that message`

- I also needed to check the count of the inputs for the input field on the add/edit cards. I was happy that I figured that the useForm() hook must have a feature to do this and it was so.

`useForm hook actually has useWatch() which watches and checks the users input`

- One glitch that also did bug me, was the fact that if log in or registration was successful, the toast maybe triggered before I actually got routed to the "/notes" page.

`This was fixed by using session-storage to store the key: toast, value: message. then on the page where toast message should be seen we use getItem(KEY) as the cb for toast.success(). Then we remove the session immediately after the call. This works perfectly.`

# Learning Outcome

- I have learnt Many things from this project, especially when facing different challenges with this project.

1. I have come to understand routing better. Importing fron useRouth(), we get push and replace. Router.push("") keeps a record of the previous page while replace, actually replaces the route where the user last navigated from as if the user was never there. We use push when transitioning between pages regularly, but replace may be used to protect the previous page like a log in page. There is also redirect form next/navigation. This redirect can be used on protected routes. If a user is not authorized on a particular page then while checking, redirect sends them to another page if unauthorized.

2. I learnt about using CreateContext and serving the data through providers wrapping the children elements in layout.tsx.

3. Similarly, I have also used TanStack Query to do the same thing which simplies and handle my data and isLoading logics for me. Another key thing that TanStack does is cache the data and after a time expires the data and re-caches it. This made my coding cleaner and whole lot easier, and going forward this will be my preferred choice when receiving data from an API. 

4. I now have experienced in using the useForm Hook from react useForm-hook. This was a huge help, especially to see the inputs on the input fields. 

5. One of the biggest thing I have learned from this project is framer motion. This sets the stage in making this project. I was able to animate the note cards and flipping them or creating a model version that transitions while you view the extra details on each note. These features were very tricky and had to really use up resources in figuring out how this is done. I also took a sample from using Gsap to create animations after another. Overall, these final touches were a big help in my software development journey especially in the area of creating beautiful UI/UX.

6. Another key thing that is important although may seem small, is my understanding in file management and how to create separate components and render them, allowing responsiblilites to be delegated accordingly. This makes coding cleaner and modular.

7. One of the most useful things I have learnt about styling, it is the art of creating reusable style codes. This makes it possible to keep your theme styles and fonts one place, where the code can be updated once and affect all the components at once, this is a real beauty especially using tailwindcss.

8. Effects that requires hover are only workable on desktop, but smaller devices require different ux design. If a key functionality is only accessible by hover, then the feature is dysfunctional on smaller devices.