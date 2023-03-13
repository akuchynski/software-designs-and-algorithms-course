import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  private static MAX_DURABILITY: number = 1;

  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("bow", baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    const increasedDurability = this.getEffectiveDurability() + Weapon.MODIFIER_CHANGE_RATE;
    this.setDurability(increasedDurability < Bow.MAX_DURABILITY ? increasedDurability : Bow.MAX_DURABILITY);
  }
}
