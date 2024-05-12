#!/bin/bash

# Run node application
echo "Running Node.js application..."
node app.js

# Check if node app ran successfully
if [ $? -eq 0 ]; then
	echo "Node.js application executed successfully, now running Python script..."
	# Run Python script
	python process.py
else
	echo "Node.js application failed to execute successfully."
fi
