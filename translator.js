/**
 * Dependency: Jquery
 * Version: 1.0.0
 */

 class Translator {
    options = { user: "default", resources: "./", languaje: "ENG" };
  
    constructor(options = {}) {
      this.options = Object.assign(this.options, options);
      this.setLanguaje(this.options.languaje);
    }
    /**
     * Set de sessionStorage languaje and translate de page.
     * lang is then name of the json resource file.s
     * @param {*} lang
     */
    setLanguaje = function(lang = null) {
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
          //Alert.warning({ message: errorThrown, title: textStatus });
          console.error(
            "Error on Translator.contructor: ",
            textStatus,
            " Message: ",
            errorThrown
          );
        });
    }
  
    initialize = function (controlTypes) {
      /* controlTypes es un array de selectores de Jquery */
      controlTypes === undefined
        ? (controlTypes = ["*"])
        : (controlTypes = controlTypes);
      let Me = this;
      for (let i = 0; i < controlTypes.length; i++) {
        /* me aseguro que solo tome los tags con el atributo tkey */
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
  
    translateSection = function(controlSelector) {
      let Me = this;
      setTimeout(() => {
        Me.initialize(controlSelector);
      }, 200);
    }
    /**
     *
     * @param {*} control Control html jQuery $(jQuerySelector)
     * @param {*} array [["htmlAtribute","Value",speed]] or [["htmlAtribute",["Value",param1, param2, paramN],speed]]
     *
     * Ejemplo :
     *      ["value","25",1]
     *      ["html","Cantidad",2]
     *      ["title","Field's description",3]
     *      ["html",["price","$12"],2]
     */
    setTranslated = function(control, array) {
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
    }
  
    /**
     *
     * @param {*} key Array =>  ['key','param1','param2','paramN']
     *
     *  Ejemplo 1:
     *      Recibe:  ["NeoIntranet"]
     *      Busca:   { "Key": "NeoIntranet", "Value": "Bienvenido a la intranet de Neotel" }
     *      Retorna: Bienvenido a la intranet de Neotel.
     *  Ejemplo 2:
     *      Recibe:  ['INTDATA','Precio']
     *      Busca:   { "Key": "INTDATA","Value": "{0} debe ser un número entero." }
     *      Retorna: Precio debe ser un número entero.
     *  Ejemplo 3:
     *      Recibe:  ['LengthFieldValidatorMessage','Cliente','0','100'] =>
     *      Busca:   { "Key": "LengthFieldValidatorMessage","Value": "El campo {0} no respeta el largo mínimo o máximo ( {1} / {2} )" }
     *      Retorna: El campo Cliente no respeta el largo mínimo o máximo ( 0 / 100 ).
     *
     */
    translate = function(key) {
      let Me = this;
      if (key != undefined && key != "") {
        try {
          let arrKey = new Array();
          try {
            arrKey = JSON.parse(key);
          } catch (ex) {
            /* Si no es un json, puede ser un array real o una clave simple. */
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
    }
  }
  