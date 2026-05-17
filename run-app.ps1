#!/bin/bash

# Use .\run-app.ps1 to run

Start-Process powershell -ArgumentList "cd 'server'; npx nodemon app.js"
Start-Process powershell -ArgumentList "cd 'client'; npm run dev"