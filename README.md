# Seri

An open-source tool that uses [Alloy](https://alloytools.org/) to formally verify that certain properties hold for a language, tool or framework. 

Currently the tool is being built to be used to enforce safety in JavaScript and React but there are plans to make the tool easily extensible so it can be used for formal verification across various domains.

### JavaScript Verification

The tool aims to automatically enforce the following properties in JavaScript:

- [ ] Declared constants are never re-assignment (This is more of a test property since this is already done by the JS compiler)
- [ ] `null`, `undefined` and `NaN` are never confused for each other
- [ ] Functions do not mutate passed arguments

### React Verification

_Coming soon_

