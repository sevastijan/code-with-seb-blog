const path = require('path')

const ignoredDirs = ['prompts', 'topics', 'scripts/templates']

const isIgnored = (file) => {
  const relativePath = path.relative(process.cwd(), file)
  return ignoredDirs.some((dir) => relativePath.startsWith(dir))
}

module.exports = {
  '*.+(js|jsx|ts|tsx)': (files) => {
    const filtered = files.filter((file) => !isIgnored(file))
    return filtered.length > 0 ? [`eslint --fix ${filtered.join(' ')}`] : []
  },
  '*.+(js|jsx|ts|tsx|json|css|md|mdx)': (files) => {
    const filtered = files.filter((file) => !isIgnored(file))
    return filtered.length > 0 ? [`prettier --write ${filtered.join(' ')}`] : []
  },
}
