## Bug Report

`resolved`
- When a note fails to be created, the message returned by the server is left on the form and we are redirected to the notes page

- Anyone should be able to create a note, whether they are logged in or not. Users that are not logged in should be named unknowned. and those who are signed in a name should be there for created.


`resolved`
- UI/UX for edit notes and create notes must match

`UI improvement`
- Click on the card like a spring and then it flips, remove the two info buttons and the x buttons. or keep the info button to show the instructions to click on the card for more details. the length of the card should fixed even when the length is more than the height of the card.

`update same note bug`
If card is updated with no changes, server should detect no changes. In the current implementation if the card is updated then note is no longer being rendered when navigate to all the notes

`Card Dialog`
Changing the current UI/UX from a dialog to a more interactive card where the card animates as if it leaves the dom and zooms in unto the user.