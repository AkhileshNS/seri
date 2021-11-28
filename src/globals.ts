export const properties = 
`open models

/* --- ASSERTIONS --- */
assert ConstantsNeverChange {
  invariants => (
    all V:VariableDeclaration, L:VariableDeclarator | V.kind = "const" => (
      all AE:AssignmentExpression | AE.operator = "=" and not (AE.left.name = L.id.name))
  )
}

check ConstantsNeverChange`;