# TODO

There are 2 parts to the resume editor

The Editor itself and the theme picker

## The editor
The editors works by loading the schema and creating a list of input fields according to schema

## The theme picker
The theme picker takes your json data and posts it http://themes.jsonresume.org/theme and it will return html which is then insert into a 

### UI
 - Expand the editor so you can see more 
 - full width mode for the preview so you can print or save to PDF

### Code
- switch to React + Babel + Webpack
- remove Grunt, handlebars, etc


# Resume Editor

The live editor available at http://registry.jsonresume.org/

## Development

### Using Grunt

Install [Grunt](http://gruntjs.com/):

```
sudo npm -g install grunt-cli
```

When that is done, run `npm install` while standing in the repository folder.

You can now concat the files:

```
grunt uglify
```

## License

Available under [the MIT license](http://mths.be/mit).
