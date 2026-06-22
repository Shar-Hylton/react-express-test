const validPasswordMsg = [
  "Must be atleast 8 characters",
  "Must contain atleast 1 uppercase letter",
  "Must contain atleast 1 number",
  "Must contain atleast 1 special character (@,$,#...)",
];

const intro = [
  "In this project we will be building our first interactive UI with UX, by creating Authentication and Authorization for users and Notes. As a user you will have your own notes. Each notes belongs to diffferent users across the globe, and only that user will have, edit or delete rights / permission to the contents of the note, besides Admin. However, all users have permission to view a note.",
];

const defaultNotes = [
  {
    _id: "1",
    title: "This Project was Created using NextJs + Express",
    content:
      "This project is using Express for backend and NextJs for Frontend. This project is also using typescript protect incoming data to the database. The styling of this project is being done using tailwindcss and other dependencies. Take the time out to navigate through the project to see what can or cannot be done. Enough code has been used to ensure security on both front and backend. Try to log in and create your own note",
    user: {
      _id: "demo-user-1",
      username: "Demo",
      email: "demo@example.com",
    },
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  },
  {
    _id: "2",
    title: "Here is a little more about this project",
    content:
      "You should try logging in and checking out the features as to what you can or can't do. This project was inspired by the idea of demonstrating authorization and authentication. All users can view notes, but only the creator of the note can edit or delete a note. This will be more clear when you log in. Take the time out see all the futures. You can also check out the different input in the password field on the registration form to see how it works",
    user: {
      _id: "demo-user-2",
      username: "Demo",
      email: "demo@example.com",
    },
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  },
  {
    _id: "3",
    title: "Words of inspiration for you",
    content:
      "Each day is another opportunity to reach your dreams. Always have your dreams and the very forefront of your minds and let it be as a compass for you. Plan your tomorrows wisely according to these goals and you will have a more successful day than yesterday or the previous days. The moment you lose sight of your goals is the moment you become distracted from that which truly matters in life. Never forget that your goals are to be your moral compass.",
    user: {
      _id: "demo-user-3",
      username: "Demo",
      email: "demo@example.com",
    },
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  },
  {
    _id: "4",
    title: "Words of inspiration for you",
    content:
      "Each day is another opportunity to reach your dreams. Always have your dreams and the very forefront of your minds and let it be as a compass for you. Plan your tomorrows wisely according to these goals and you will have a more successful day than yesterday or the previous days. The moment you lose sight of your goals is the moment you become distracted from that which truly matters in life. Never forget that your goals are to be your moral compass.",
    user: {
      _id: "demo-user-4",
      username: "Demo",
      email: "demo@example.com",
    },
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  },
  {
    _id: "5",
    title: "Words of inspiration for you",
    content:
      "Each day is another opportunity to reach your dreams. Always have your dreams and the very forefront of your minds and let it be as a compass for you. Plan your tomorrows wisely according to these goals and you will have a more successful day than yesterday or the previous days. The moment you lose sight of your goals is the moment you become distracted from that which truly matters in life. Never forget that your goals are to be your moral compass.",
    user: {
      _id: "demo-user-5",
      username: "Demo",
      email: "demo@example.com",
    },
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  },
  {
    _id: "6",
    title: "Words of inspiration for you",
    content:
      "Each day is another opportunity to reach your dreams. Always have your dreams and the very forefront of your minds and let it be as a compass for you. Plan your tomorrows wisely according to these goals and you will have a more successful day than yesterday or the previous days. The moment you lose sight of your goals is the moment you become distracted from that which truly matters in life. Never forget that your goals are to be your moral compass.",
    user: {
      _id: "demo-user-6",
      username: "Demo",
      email: "demo@example.com",
    },
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  },
];


export {
  validPasswordMsg,
  intro,
  defaultNotes,
}