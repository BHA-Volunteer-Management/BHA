git checkout $2 && git pull
ssh $1 'cd /opt/python/bundle/2/app/ && git checkout $2 && git pull'
$(dirname $0)/../js/node_modules/.bin/gulp --cwd $(dirname $0)/../js/ webpack
scp -r $(dirname $0)/../js/dist/. $1:/opt/python/bundle/2/app/js/dist/
