import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  private static MAX_DAMAGE_MODIFIER: number = 0.25;

  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("sword", baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    const increasedDamageModifier = this.getDamageModifier() + Weapon.MODIFIER_CHANGE_RATE;
    this.setDamageModifier(
      increasedDamageModifier < Sword.MAX_DAMAGE_MODIFIER ? increasedDamageModifier : Sword.MAX_DAMAGE_MODIFIER
    );
  }
}
