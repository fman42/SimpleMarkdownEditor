## SimpleMarkdownEditor 

The markdown editor for Vue without heavy dependencies. Just one command and you will get editor in your project

&#128171; Simple. Only needed attributes and methods;

&#128165; Fast. Install package and you have an ability to use an editor right now;

&#128173; Lightweidth. An editor required just one dependency. 

![editor](https://i.imgur.com/SO3K4i3.png)

**My gratitude to https://github.com/Dessader for his beatiful design**

## Installation

Browser: `npm install @fman42/simple-markdown`

## Usage
```html
<template>
  <SimpleMarkdown/>
</template>
```

```javascript
<script>
  import SimpleMarkdown from 'simple-markdown';
  
  export default {
    components: {
      SimpleMarkdown
    }
  }
</script>
```

## Documentation

### Attributes

#### resize

Type: **Boolean**

Default: **true**

**To allow resize main content and preview field**



#### preview
 
Type: **Boolean**

Default: **true**

**Enable or disable preview field in an editor**


#### disabledTools

Type: **Array**

Default: **[]**

**You will can pass in this array ids of toolbar items for disable them**


#### autoSave

Type: **Number**

Default: **5000**

**Time in seconds when an editor will be saved**

#### defaultContent

Type: **String**

Default: **''**

**Set a default content for an editor**


### Methods

#### toMarkdown() : **string**

Get raw text from main field

#### toHTML() : **string**

Get parsed markdown text from a preview field

#### setContent(content) : **void**
Set content in an editor
