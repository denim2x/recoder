# recoder
### Various commands for rearranging source code

`recoder` is an Atom package for sorting code blocks in various programming languages.

### Languages
 - `YAML`
   * `roaming`: every key is attended by the group of comments preceding it (if any)
   * `steady`: all comments are left in place
   
### Command syntax
> `recoder[-reverse][-natural][-case]:<language>[-<mode>]`

 - `reverse`: *descending* order
 - `natural`: *natural* ordering (as opposed to *lexicographical*)
 - `case`: *case-insensitive* ordering
 - `language`: the *language name* in lowercase (e.g. `yaml`)
 - `mode`: additional option (depends on the `language`, e.g. `steady`)

**Examples**
 - `recoder-natural:yaml-steady`
   <blockquote>sort YAML code in **steady** mode using **natural** ordering</blockquote>
 - `recoder-reverse-case:yaml-roaming`
   <blockquote>sort YAML code in **roaming** mode using **reversed case-insensitive** ordering</blockquote>

### Usage
Just hit `Ctrl-Shift-P` and start typing your command; the list below instantly shows matching commands and you can either use arrow-keys followed by `Enter` or click on that command.

### Setup
 - in the editor: 
   <blockquote>`Ctrl-<Comma>` > Install > type `'recoder'` > press `Enter` > click `Install`</blockquote>
 - using `apm`: 
   <blockquote>`~$ apm install recoder`</blockquote>

### License
[**MIT** :link:](https://tldrlegal.com/license/mit-license)

