# translator
A tiny class to make your own personalized client side translations.
# Translator

Translator is tiny class to make your own personalized client side translations.

It depends on JQuery library.

You will have to write your key/value json files.

# Installation

&lt;script src="{path_to}/translator.js"&gt;&lt;/script&gt;

translator.js contains classic vanilla javascript.

translator.module.js contains javascript ES6 module.

# Usage

On page load:

```
let $T = new Translator({ resources: "./assets/js/resources/" , language: "ENG" });

#resouces is the path to your languages json file. 
#language is resource file name
```

When yo want to change your page language on the fly just call:

```
$T.setlanguage("SPA"); # SPA is the name of the resource json file.
```

To translate a particular section of your page call `translateSection` function.

```
let $section = '#home';

$T.translateSection($section); #This will translate just the tKey inside element with id="home"

<div id='home'>
  <label tkey='[['html','welcome']]'></label>
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

where to translate: indicates where your value will be written in the element (html/attribute/value)
speed in seconds: defines how many seconds translator will take to write translations word by word. 
If you don't like that effect just don't send speed paramter or send 0, this way, translations will appear right away.

```
#Examples
```
    Translate element innerHtml:
    Example 1
    <label tkey='[["html", "welcome",1]]'></label>
    Results in:
    <label tkey='[["html", "welcome",1]]'>Welcome to my portfolio.</label>
    Example 2
    <label tkey='[["html", ["prize", 19,99], 2]'></label>
    Results in:
    <label tkey='[["html", ["prize", 19,99], 2]'>Get my services for only $19,99 per hour.</label>
    Example 3
    <label tkey='[["html", ["product_prize", 4.99]'></label>
    Results in:
    <label tkey='[["html", ["product_prize", 4.99], 3]]'> Get Translator for only $4.99 just for this month.</label>
    
    Translate element attribute:
    Example 4
    <input tkey='[["placeholder", "input_placeholder", 2]' />
    Results in:
    <input type="text" tkey='[["placeholder", "input_placeholder"]]' placeholder="Write something" />
    
    Translate element value: 
    Example 5
    <input tkey='[["value", "input_value", 2]' />
    Results in:
    <input id="description" type="text" tkey='[["value", "input_value"]]' value="Fill with value" />
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

