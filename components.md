## This file contains a brief description of the tasks handled by each folder

### src/components/NoteCard 

- This component is used to create the design of the note card. It creates the probs for the parent NoteList to pass the data to each card. Each card has its unique owner, only that unique owner can edit or delete the note card from the database, aside from admin, who has permission to delete or edit any note.

### src/components/NoteList

- This is the parent component of NoteCard. It calls Notecard sends data to each card and maps and renders each NoteCard. Default notes are also being mapped in this component. Each default note is a static note that is available by only users that are not logged in or registered into the database.

### AuthContext

- This architecture is used to serve components with authentication data. It sends user authentication data to the components. Now this makes it possible for the current user to edit/delete his or her own note. Additionally, isAuthentication makes it possible to render notes if a user is currently logged in. Users will also see his/her username on the navbar and login/logout functions can now be rendered accordingly.

### Hooks/useNoteMutation

- This file calls the CRUD functions from "@;ib/api/notes". It creates a mutation of these functions so that Tanstack QueryMutations can be called inside different components to consume the data from the API. So this file makes it possible to connect components and API together.

### Hooks/useNotesQuery

- A hook that allows components to be updated with the notes from the database. It fetches the notes from the api/notes file, the uses useQuery hook to serve the data. With this components also have access to Tanstack dat and isLoading state.

### lib/api/notes

- This is the actual file that fetches the data from the server, it is much like how NotesContext would get the date and serve components. Since Tanstack Query is handling the data and isLoading, then this project no longer needs NotesContext. So all the data fetching the TanStack needs to mutate comes from the this file.
`For this project I will only do TanStack on notes and save Auth Context as is for the purpose of learning and understanding the different work flow.`

### lib/queryClients

- Data eventually becomes stale since tanStack is caching it. This files sets the time when to refetch and cache fresh data. You will notice that it is similar as storing sessions.

### app/page.tsx

- A home page is created that renders Navbar and the Main components.

### app/(pages)/notes 

- This component renders NoteList and also owns the button to create a note.