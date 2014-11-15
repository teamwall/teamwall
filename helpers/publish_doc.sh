#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]];
then
	lein doc
	git clone https://$GH_NAME:$GH_TOKEN@github.com/teamwall/teamwall.git -b gh-pages ../gh-pages
	cp -r doc ../gh-pages/doc
	cd ../gh-pages
	pwd
	echo "git config user.email $GH_EMAIL"
	git config user.email "$GH_EMAIL"
	echo "git config user.name $GH_NAME"
	git config user.name "$GH_NAME"
	echo 'git status'
	git status
	echo 'git add --all .'
	git add --all .
	echo 'git commit -am "Generation of documentation"'
	git commit -am "Generation of documentation"
	echo 'git status'
	git status
	echo "git push https://$GH_NAME:$GH_TOKEN@github.com/teamwall/teamwall.git gh-pages"
	git push https://$GH_NAME:$GH_TOKEN@github.com/teamwall/teamwall.git gh-pages
fi