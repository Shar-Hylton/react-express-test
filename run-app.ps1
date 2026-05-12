#!/bin/bash

Start-Process powershell -ArgumentList "cd 'server'; npx nodemon app.js"
Start-Process powershell -ArgumentList "cd 'client'; npm run dev"