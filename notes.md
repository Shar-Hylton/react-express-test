# Issues

- On the edit page, when ever I reload the page, it glitches and show me note not found, then shows the note that it said didn't exist and then routed me to the notes page.
 
`FIX`
[-] So it turns out that when fetching data from the database in an async function, I should store the returned value in a variable to prevent the next line of code to run before the promise is resolved/rejected.
-- Code on edit page; line: 58-62 - no variable was used on line 59.  

- When a note fails to be created, the message returned by the server is left on the form and we are redirected to the notes page

`FIX`
[-] I was using a global state for error handling which feeds all the components the same updates. Context must only send data to be consumed not modify UI. So I moved error and success messages into the components itself. the updateNote context now returns an object with key/values:- success: boolean, message: string. The components will determine what message get sent to the users depending on the value of success. 

# Learning Outcome
- React batches states meaning all the changed states are stored before each re-rendering. React does this to prevent each state change from updating the webpage. This means that the value of each state is stale data until the page re-renders. Be mindful not to use conditionals on state values before it renders.
-- Code on edit page; line: 58-62 - error using [if(errorMsg)].

- All states must be declared at the top level. 
- Never use hooks in conditionals where 1 render may show more hooks than the other. React needs to track the number of hooks used inside a component.
For Example, one render sees useForm, useEffeck, UseState. If your code has a conditional that causes any form of inconsistency in rendering each hooks that this breaks Reacts architecture and functionality.

``FIX``
Move conditionals after declaring and using React hooks.
- Code on edit page; line: 30-62 - error using declaring if statements before useEffect and useForm hooks.

# removing file from git staging 

- git reset HEAD -- <filename>
- git rm -r --cached <filename>
- OR in this case git rm -r --cached client

- git restore --staged <file>

# more git commands

- git pull --rebase origin main
This command:
* This fetches remote changes
* Re-applies your local commits on top of them

- Error message:

``hint: Updates were rejected because the tip``
``of your current branch is behind``
``hint: its remote counterpart. If you want to`` ``integrate the remote changes,``
``hint: use 'git pull' before pushing again.``
``hint: See the 'Note about fast-forwards' in 'git push --help' for details.``

## When Routing between pages

- So when routing through pages, it be a good practice to allow authentication/authorization checks first before rendering, or else there might be glitches or temporary load pages. you can show spinner or skeleton page loader for better UX.
- Use Replace, Redirect and Push in the right way.
`Replace` replaces the last load page.
`Redirect` sends unauthorized users else where.
`Push` routes to the page and remember where you are coming from. It adds that route to the stack.