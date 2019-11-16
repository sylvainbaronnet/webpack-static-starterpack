# Style

## Fonts

### `@font-face` generation tools

- https://fontsquirrel.com/tools/webfont-generator
- https://everythingfonts.com/font-face
- https://onlinefontconverter.com
- https://transfonter.org

### Font weights (`postcss-font-weight`)

cf. w3.org/TR/css-fonts-3/#font-weight-numeric-values

- `100`: `thin`
- `200`: `extralight`, `ultralight`
- `300`: `light`
- `400`: `normal`, `book`, `regular`, `roman`
- `500`: `medium`
- `600`: `semibold`, `demibold`
- `700`: `bold`
- `800`: `extrabold`, `ultrabold`
- `900`: `black`, `heavy`

## Directory structure

### Stylesheets

The stylesheet sources are in the `style` directory and have a `.styl` extension. All the stylesheets are explicitely included in a global master `style.styl` file before being process by Gulp. This file guarantee the correct inclusion order of the stylesheets, **do not tamper with it!**.

For each project the stylesheets are organized in a generic way:

- `content/`: stylesheets for each content entity (type of page, article...) and their declinaison (full, teaser...)
- `element/`: reusable elements (buttons, modal dialogs, forms...)
- `layout/`: global page and navigation element style (header, navigation, footer)
- `mixins/`: stylus mixins
- `default.styl`: style reset, uses postcss-normalize + optiniated default styles
- `imports.styl`: variables used in the project (fonts, colours, breakpoints...)
- `style.styl`: root style file

## Mixins

### Background Image

Pour mettre des images en background, il **faut** utiliser les mixins suivants :

`png-size 'nom-image' repeat top left`

`repeat` est optionnel et par defaut en `no-repeat`

Les positions sont egalement optionnelles et non présentes par defaut

exemple : `png-size 'nom-image'`

Il existe des équivalent pour les autres format d'image : `jpg-size` `gif-size` `svg`

Le chemin utilisé pour les images est `/dist/img/`

Si une image se trouve dans un sous dossier il faut donc le préciser :

`png-size 'picto/search'`

Ce mixin en plus de générer `background-image`, `background-position` et `background-repeat` ajoute également :

- `background-size` avec les dimensions de l'image
- `width` et `height` de l'image

Si vous n'avez pas besoin de `width` et `height`, vous pouvez utiliser simplement `png` `jpg` `gif` `svg` (_sans le `-size`_)

Il est possible d'utiliser la version longue de background-position (pas de support IE8), exemple :

```
png ‘logo’ right 10px bottom 10px

png ’truc’ repeat-y right 1px bottom 1px
```

Pour `background-image none` vous pouvez utiliser `img none`

Pour les images en `background-size cover` ou `contain` il est possible d'utiliser directement :

`png 'logo' cover` ou `png 'logo' contain`

Par defaut ça ajoute `background-position center` mais il est possible d'en definir un : `png 'logo' cover top 10 right`

Si vous ne souhaitez pas générer de `background-size` et de `background-position` vous pouvez utiliser `nil` comme premier paramètre : `png 'logo' nil`

Note : Les svg ne génére pas de background-size, de width et de height. (seul `svg` existe, pas `svg-size`)

## Shortcuts

### Position

Module [postcss-position-alt](https://github.com/sylvainbaronnet/postcss-position-alt)

Voir la [documentation](https://github.com/sylvainbaronnet/postcss-position-alt#postcss-position-alt)

### Size

`size` est un mixin pour les `width` et `height`

Exemple :

```
size 10px 20px
```

génére :

```
width 10px
height 20px
```

Si le `width` et le `height` sont les meme, pas besoin de répéter la valeur, exemple :

```
size 10px
```

génére :

```
width 10px
height 10px
```

Il est bien sur possible d'utiliser `auto` comme valeur, exemple : `size 10px auto`

### `font-size` / `line-height`

Le module [postcss-short-font-size](https://github.com/jonathantneal/postcss-short-font-size) permet de mettre un `line-height` en deuxième paramètre de `font-size`

Exemple : `font-size 16px 16px`

### `font-weight`

Le module [postcss-font-weights](https://github.com/jonathantneal/postcss-font-weights) permet d'utiliser les noms `light`, `medium`, `heavy`, ect à la place de 300, 500, 900, ect.

Voir la [documentation](https://github.com/jonathantneal/postcss-font-weights#font-weights)

---

### `color` / `background-color`

Le module [postcss-short-color](https://github.com/jonathantneal/postcss-short-color) permet de mettre un `background-color` en deuxième paramètre de `color`

Exemple : `color #fff #000`

Le module [postcss-color-short](https://github.com/andrepolischuk/postcss-color-short) permet de raccourcir les codes couleurs qui se répéte :

```
#f0 donne #f0f0f0
#f donne #fff

```

---

### `padding` / `margin` / `border` axis

Le module [postcss-axis](https://github.com/kinday/postcss-axis#postcss-axis-)

Exemple :

```
margin-y 12px
margin-x 12px 34px
border-x-color #fff
...
```

Voir la [documentation](https://github.com/kinday/postcss-axis#postcss-axis-)

---

### Quantity queries (désactivé par defaut car trop peu utilisé)

le module [postcss-quantity-queries](https://github.com/pascalduez/postcss-quantity-queries) permet de simplifier les selecteurs type `:nth-child`.

Voir la [documentation](https://github.com/pascalduez/postcss-quantity-queries)

---

---

### Raccourcis rgba()

Stylus permet d'utiliser les couleurs hex dans les rgba :

```
rgba(#fff, 0.5)
```

### Centrer

Le module [postcss-center](https://github.com/jedmao/postcss-center) permet de centrer facilement un élément.

_La technique utilisé ne fonctionne pas sur IE8 !_

pour centrer horizontalement : `left: center`

pour centrer verticalement : `top: center`

Le module met l'élément en absolute donc il "sort du flux"

Ca génère :

```css
position: absolute;
top: 50%;
left: 50%;
margin-right: -50%;
transform: translate(-50%, -50%);
```

Il est possible de garder l'élément dans le flux en ajoutant à la suite `position: relative;`

---

### Font Magician

Le module [postcss-font-magician](https://github.com/jonathantneal/postcss-font-magician) inclus automatiquement les google font utilisé dans le css.
La valeur de l'attribut font-family doit reprendre exactement le nom de la police de caractère Google Font, en respectant les majuscules.
_Ca marche aussi avec les fonts chargés en local mais j'ai pas encore testé._

**Attention!!!** `font-magician` repose sur le paquet [google-fonts-complete](https://github.com/jonathantneal/google-fonts-complete) qui n'est pas mis à jour de façon regulière.
Si l'inclusion d'une Google font échoue, il faut probablement regénerer le fichier 'google-fonts.json' pour resoudre le problème.

### Autres modules utilisés :

- [csswring](https://github.com/hail2u/node-csswring) : Minify CSS
- [css-mqpacker](https://github.com/hail2u/node-css-mqpacker) : regroupe les medias queries similaires

## Vendor Prefix

Ne jamais ajouter de prefixe type `-moz-` ou `-webkit-`. Ils sont ajouté automatiquement par le module [Autoprefixer](https://github.com/postcss/autoprefixer)

---

### Other plugins

- [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) : Adapte le code flexbox pour corriger les bugs de certains navigateur
- [postcss-opacity](https://github.com/jonathantneal/postcss-opacity) : ajoute le support de `opacity` à IE8
- [postcss-normalize-charset](https://github.com/TrySound/postcss-normalize-charset) : Add necessary or remove extra `@charset`

## PostCSS

### Units & fluid layout (`postcss-default-unit`, `postcss-pxtorem`)

`px` is the _default_ units in `gd-theme`, PostCSS will interpret every unitless value as a `px` value (e.g.`font-size 10` will be interpreted as `font-size: 10px`)

However some CSS attributes, such as `line-height`, _can be_ unitless. Those attributes values won't be processed by PostCSS. `line-height 1.25` will stay the same, if you want to specify a `line-height` in `px` you to have to do it explicitly `line-height 25px`

`gd-theme` include a simple responsive layout using the `rem` unit.

Les `px` sont convertis automatiquement en `rem` par le module

Les valeurs de `1px` sont conservées en pixel, pour éviter par exemple que des bordures disparaissent en responsive. Paramètre : `{minPixelValue: 2}`

Si par exemple la conversion des unités d'un plugin pose problème (ca ne devrait pas arriver), il est possible de blacklister des selecteurs. Paramètre : `{selectorBlackList: []}`

_For more informations:_

- [postcss-default-unit](https://github.com/antyakushev/postcss-default-unit)
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
