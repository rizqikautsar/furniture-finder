# furniture-finder
- Project name: Furniture Finder
- What i use:
    - Bootstrap,
    - Vanilla JS and Jquery,
    - Gulp,
    - SCSS, 
    - Other: Isotope JS (https://isotope.metafizzy.co/)

## How to run
Clone this repository into your web server such as XAMPP or MAMP htdocs folder and open `localhost/furniture-finder` on your browser.

## How to rebuild / recompile
This project use Gulp for the task runner, so make sure you have installed it on your desktop. For more info: https://gulpjs.com

If you have installed Gulp:
- open terminal and move into this project folder `cd furniture-finder`
- download all dependencies for this project by running `npm install` and `bower install`

and then see this project folder structure, you will find something like this:
```html
index.html
/assets
---/dist
---------/css
---------/fonts
---------/img
---------/js
---------/video
---/src
---------/fonts
---------/js
---------/scss

```

- Change css or js only on ***src folder***. Because it will automatically replace all your css and js foder on ***dist folder***.

## Add assets
If you want to add new images / video, just put it directly on  ***dist folder***. But if you want to add new fonts, put it on ***src folder*** and my gulpfile.js will move it into ***dist folder*** for you. :)

## Contact
If you have something you want to ask, just fell free make a new issue in this repository, or you can just directly contact me on http://www.rizqikautsar.com/p/contact.html