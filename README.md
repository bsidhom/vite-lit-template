### How to use this template

The easiest way to use this is to do a shallow clone of the repo and then nuke
the old git directory:

```
git clone --depth 1 https://github.com/bsidhom/vite-lit-template new-project

cd new-project
rm -rf .git
git init
yarn install
```

Don't forget to update the project name in `project.json`, adjust the README,
etc.
