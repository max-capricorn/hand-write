class Car {
  engine: number;
  get hp () {
    return this.engine / 2;
  }
  get kw () {
    return this.engine * 2;
  }
}


type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;