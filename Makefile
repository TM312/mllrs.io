commit:
	git add .
	git commit -m $(msg)

deploy:
	npm run generate && \
	npm run deploy
