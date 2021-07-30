# Install and run (via USB)

```
git clone https://github.com/psqq/anything
npm i
cordova prepare
cordova run android
```

# Plugin example

https://gist.github.com/psqq/d23a5c688564cf5a19dd1b2004ed6c0c

```js
{
  name: 'Calculator',
  run() {
    document.body.innerHTML = `
    	<input type="text"><br><br>
    	Result: <span></span>
    `;
    var result = document.querySelector('span');
    var input = document.querySelector('input');
    input.onkeyup = () => {
    	result.innerText = eval("(" + input.value + ")");
    }
  }
}
```
