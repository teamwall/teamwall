#!/bin/sh

if [[ $TRAVIS_BRANCH == 'master' ]]
	lein doc
	git clone https://${GH_NAME}:${GH_TOKEN}@github.com/teamwall/teamwall.git -b gh-pages ../gh-pages
	cp doc ../gh-pages/doc
	git config user.email "${GIT_EMAIL}"
	git config user.name "${GIT_NAME}"
	git status
	git add --all *
	git commit -am "Generation of documentation"
	git push https://${GH_NAME}:${GH_TOKEN}@github.com//teamwall/teamwall.git gh-pages
fi