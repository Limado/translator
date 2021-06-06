# translator
A tiny library to make your own personalized client side translations.
# Translator

Translator is tiny library to make your own personalized client side translations.

It depends on JQuery library.

You will have to write your key/value json files.

# Installation

No installation required just &lt;script src="{path_to}/translator.js"&gt;&lt;/script&gt;

We are working on ES6 Module version.

# Usage

On page load:

```
let $T = new Translator({ resources: "./assets/js/resources/" , languaje: "ENG" });

#resouces is the path to your languajes json file. 
#languaje is resource file name
```

When yo want to change your page languaje on the fly just call:

```
$T.setLanguaje("SPA"); # SPA is the name of the resource json file.
```

To translate a particular section of your page call `translateSection` function.

```
let $section = '#home';

$T.translateSection($section); #This will translate just the tKey inside element with id="home"

<div id='home'>
  <label tkey='[['html','welcome']]'>
</div>
```

This is a resource file ENG.json

```

[
{ "Key": "welcome", "value": "Welcome to my portfolio." },
{ "key": "prize","value": "Get my services for only ${0} per hour." },
{ "key": "product_prize","value": "Get {0} for only ${1} just for this month." },
{ "Key": "input_placeholder", "value": "Write something" },
{ "Key": "input_value", "value": "Fill with value" }
]

```
On your html tag add attribute 'tKey'"
```

tkey='[["where to translate", "key in json file", speed in seconds]]'

tkey='[["where to translate", ["key in json file", param1, param2, paramN], speed in seconds]]'

speed in seconds: defines how many seconds translator will take to write translations word by word. If you don't like that effect just don't send speed paramter or send 0, this way, translations will appear right away.

```
<div>
    <h1>Examples</h2>
    <h2> Translate element innerHtml: </h2>
    <h4> Example 1 </h4>
    &lt;label tkey='[["html", "welcome",1]]'&gt;&lt;/label&gt;
    <h4> Results in: </h4>
    <label tkey='[["html", "welcome",1]]'>Welcome to my portfolio.</label>
    <h4> Example 2 </h4>
    &lt;label tkey='[["html", ["prize", 19,99], 2]'&gt;&lt;/label&gt;
    <h4> Results in: </h4>
    <label tkey='[["html", ["prize", 19,99], 2]'>Get my services for only $19,99 per hour.</label>
    <h4> Example 3 </h4>
    &lt;label tkey='[["html", ["product_prize", 4.99]'&gt;&lt;/label&gt;
    <h4> Results in: </h4>
    <label tkey='[["html", ["product_prize", 4.99], 3]]'> Get Translator for only $4.99 just for this month.</label>
    <br/>
    <hr/>
    <h2> Translate element attribute: </h2>
    <h4> Example 4 </h4>
    &lt;label tkey='[["placeholder", "input_placeholder", 2]'&gt;&lt;/label&gt;
    <h4> Results in: </h4>
    <input type="text" tkey='[["placeholder", "input_placeholder"]]' placeholder="Write something">
    <hr/>
    <h2> Translate element value </h2>
    <h4> Example 5 </h4>
    &lt;label tkey='[["value", "input_value", 2]'&gt;&lt;/label&gt;
    <h4> Results in: </h4>
    <input id="description" type="text" tkey='[["value", "input_value"]]' value="Fill with value">
    <br/>
</div>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
```
