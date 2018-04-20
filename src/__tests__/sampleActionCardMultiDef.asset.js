export default `
Mermaid {
  attack:
    energy(0, 3, 0)
    transfer(FIELD, FIELD,
    [=>strength(a, b, c)]
    )
    ->
    strength(0, a + b + c, 0)
  variable: 0<a<10
}


`

/*export default `
// Energy

// Energy.Fire

Volcano {
  attack: -> energy(4, 0, 1)
  price: mana(2, 0, 1)
}

Vent {
  attack: -> energy(2, 0, 0)
  price: mana(2, 1, 1)
}

// Energy.Water

Swamp {
  attack: -> energy(0, 3, 0)
  price: mana(0, 1, 1)
}

Hot Spring {
  attack: -> energy(1, 2, 1)
  defense: -> energy(0, 2, 0)
  price: mana(1, 0, 0)
}

// Energy.Earth

Mountain {
  both: -> energy(0, 0, 3)
  price: mana(0, 0, 4)
}

Forest {
  both: -> energy(0, 1, 2)
  price: mana(0, 2, 0)
}

// Mana

// Mana.Fire

Lightning {
  attack: energy(0, 2, 0) -> mana(1, 0, 0)
  price: mana(1, 1, 0)
}

Fireball {
  attack: energy(3, 0, 0) -> mana(3, 0, 0)
  price: mana(2, 0, 0)
}

// Mana.Water

Hail {
  attack: energy(1, 2, 0) -> mana(0, 2, 1)
  price: mana(0, 1, 0)
}

Thunder {
  attack: energy(1, 2, 0) -> mana(0, 0, 1)
  defense: energy(0, 2, 0) -> energy(0, 1, 0) strength(0, 0, 1)
  price: mana(1, 1, 0)
}

// Mana.Earth

Avalanche {
  attack: energy(0, 0, 3) -> mana(0, 0, 3)
  price: energy(1, 0, 1)
}

Earthquake {
  attack: energy(0, 0, 4) -> mana(0, 2, 3)
  price: energy(1, 0, 2)
}
`*/
