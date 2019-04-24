runlocal:
	docker run --rm -p 4000:4000 -v="$PWD:/srv/jekyll" jekyll/jekyll:3.8 jekyll serve --watch