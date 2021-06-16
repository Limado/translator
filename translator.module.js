/**
 * Dependency: Jquery
 * Version: 1.0.1
 */

export default class Translator {
  options = { user: "default", resources: "./", language: "ENG" };

  constructor(options = {}) {
    this.options = Object.assign(this.options, options);
    this.setlanguage(this.options.language);
  }
  /**
   * Set de sessionStorage language and translate de page.
   * lang is then name of the json resource file.s
   * @param {*} lang
   */
  setlanguage = function (lang = null) {
    if (lang != null)
      localStorage.setItem(this.options.user + "_t_language", lang);

    let Me = this;
    let file = this.options.resources + lang + ".JSON";
    $.getJSON(file)
      .done(function (data) {
        Me.resources = data;
        Me.initialize();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
          "Error on Translator.contructor: ",
          textStatus,
          " Message: ",
          errorThrown
        );
      });
  };

  initialize = function (controlTypes) {
    /* controlTypes is a css selectors array */
    controlTypes === undefined
      ? (controlTypes = ["*"])
      : (controlTypes = controlTypes);
    let Me = this;
    for (let i = 0; i < controlTypes.length; i++) {
      /* only loads elements with tKey attribute */
      controlTypes[i] = controlTypes[i] + "[tkey]";
      $(controlTypes[i]).each(function (index, control) {
        control = $(this);
        if (control.attr("tkey") != undefined) {
          let tkey = JSON.parse(control.attr("tkey"));
          tkey.forEach((value) => {
            Me.setTranslated(control, value);
          });
        }
      });
    }
  };

  translateSection = function (controlSelector) {
    let Me = this;
    setTimeout(() => {
      Me.initialize(controlSelector);
    }, 200);
  };
  /**
   *
   * @param {*} control Control html jQuery $(jQuerySelector)
   * @param {*} array [["htmlAtribute","Value",speed]] or [["htmlAtribute",["value",param1, param2, paramN],speed]]
   *
   * Example :
   *      ["value","25",1]
   *      ["html","quantity",2]
   *      ["title","Field's description",3]
   *      ["html",["price","$12"],2]
   */
  setTranslated = function (control, array) {
    let translateTo = array[0];
    let keyArray = array[1];
    let translated = this.translate(keyArray);
    let speed = ((array[2] || 0) * 1000) / translated.length;

    switch (translateTo.toLowerCase()) {
      case "html":
        control.html("");
        [...translated].forEach((letter, i) => {
          setTimeout(() => {
            control.html(control.html() + letter);
          }, speed * i);
        });
        break;
      case "value":
        control.val("");
        [...translated].forEach((letter, i) => {
          setTimeout(() => {
            control.val(control.val() + letter);
          }, (translated.length * i) / speed);
        });
        break;
      default:
        control.attr(translateTo, "");
        [...translated].forEach((letter, i) => {
          setTimeout(() => {
            control.attr(translateTo, control.attr(translateTo) + letter);
          }, (translated.length * i) / speed);
        });
        break;
    }
  };

  /**
   *
   * @param {*} key Array =>  ['key','param1','param2','paramN']
   *
   *  Example 1:
   *      Receives:  ["welcomeKey"]
   *      Searchs for:   { "key": "welcomeKey", "value": "Welcome to my web" }
   *      Returns: Bienvenido a la intranet de Neotel.
   *  Example 2:
   *      Receives:  ['INTDATA','Price']
   *      Searchs for:   { "key": "INTDATA","value": "{0} must be an integer." }
   *      Returns: Price must be an integer.
   *  Example 3:
   *      Receives:  ['LengthFieldValidatorMessage','Client','0','100'] =>
   *      Searchs for:   { "key": "LengthFieldValidatorMessage","value": "{0} field is a number between {1} and {2}." }
   *      Returns: Client field is a number between 0 and 100.
   *
   */
  translate = function (key) {
    let Me = this;
    if (key != undefined && key != "") {
      try {
        let arrKey = new Array();
        try {
          arrKey = JSON.parse(key);
        } catch (ex) {
          /* If it`s not a json, it may be an array. */
          if (Array.isArray(key) == false) {
            arrKey.push(key);
          } else {
            arrKey = key;
          }
        }
        let retKey = key;
        let retValue = key;
        this.resources.forEach((resourceValue) => {
          if (resourceValue.key.toLowerCase() == arrKey[0].toLowerCase()) {
            if (arrKey.length > 1) {
              retKey = resourceValue.key;
              retValue = resourceValue.value;
              arrKey.forEach(function (value, index) {
                if (value != resourceValue.key) {
                  retKey = retValue = retValue.replace(
                    "{" + (index - 1) + "}",
                    Me.translate(value)
                  );
                }
              });
            } else {
              retKey = resourceValue.value;
              return false;
            }
          }
        });
        return retKey;
      } catch (ex) {
        console.error("Error on Translator.translate:", ex.message);
        return key;
      }
    }
    return key;
  };
}