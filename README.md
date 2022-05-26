# to instantiate application
run 'npm i'

# to start application
run 'node app.js'

# Helpful notes
for iterating through data / actions:
--------------------------------------
.map((i) => {}) is asynchronous, all indexes will run the function nearly simultaneously


a traditional for loop is not asynchronous

for (let i =0; i < length; i++) This will wait to resolve the function of prior index before moving to the next


---------------------------------------
Async / await / promises / resolutions are an important and weird part of node. 

If you find yourself thinking that you should have data when you don't have it yet, its probably an async issue
