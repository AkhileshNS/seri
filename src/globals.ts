export const properties = 
`open models

/* --- ASSERTIONS --- */
assert ConstantsNeverChange {
  invariants => (
    // Start working ON Assertion here
    all V:VariableDeclaration | V.kind in {"var" + "val"}
  )
}

check ConstantsNeverChange`;