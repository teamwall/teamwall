#!/bin/bash

output=`lein kibit`

if [ -n "$output" ]; then
	echo "$output"
	exit 1
else
	exit 0
fi