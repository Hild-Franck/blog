runlocal:
	docker run --rm -p 4000:4000 -p 3000:3000 -v="$$PWD:/srv/jekyll" jekyll/jekyll:3.8 jekyll serve --watch --livereload --livereload_port 3000