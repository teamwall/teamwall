#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]];
then
	lein doc
	git clone https://$GH_NAME:$GH_TOKEN@github.com/teamwall/teamwall.git -b gh-pages ../gh-pages
	cp -r doc ../gh-pages/
	cd ../gh-pages
	git config user.email "$GH_EMAIL"
	git config user.name "$GH_NAME"
	git status
	git add --all .
	git commit -am "Generation of documentation"
	git status
	git push https://$GH_NAME:$GH_TOKEN@github.com/teamwall/teamwall.git gh-pages
fi