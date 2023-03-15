# requires Netlify CLI to be installed: https://docs.netlify.com/cli/get-started/
run-local-net:
	netlify dev

run-local:
	yarn run dev

deploy-static:
	yarn generate && \
	yarn deploy

deploy:
	git push origin master
