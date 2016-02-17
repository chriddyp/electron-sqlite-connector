cd app/node_modules/sqlite3 && \
npm run prepublish && \
node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/node-v47-darwin-x64 && \
node-gyp rebuild --target=0.36.0 --arch=x64 --target_platform=darwin --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/node-v47-darwin-x64 && \
cd ../../..
