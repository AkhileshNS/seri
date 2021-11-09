// PREDEFINED
// signatures: State, 
sig Program {
  // ...
}

// Functions
pred initConstant[c: Constant] {
  // Logic
}

// COMPILES
initConstant[a 1]
initConstant[b 2]

// PREDEFINED
assert ConstantsDontChange[p: Program] {
  // Logic
}