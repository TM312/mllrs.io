import Prism from 'prismjs'

// Include a theme:
// import 'prism-themes/themes/prism-atom-dark.css'
import 'prism-themes/themes/prism-material-oceanic.css'

// Include the toolbar plugin: (optional)
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'

// // Include the line numbers plugin: (optional)
// import 'prismjs/plugins/line-numbers/prism-line-numbers'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Include the line highlight plugin: (optional)
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

// Include some other plugins: (optional)
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

// Include additional languages
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-ini'
import 'prismjs/components/prism-makefile'
import 'prismjs/components/prism-hcl'
import 'prismjs/components/prism-markdown'

// Set vue SFC to markdown
Prism.languages.vue = Prism.languages.markup

export default Prism
