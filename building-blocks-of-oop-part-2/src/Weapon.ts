import { Item } from "./Item";

export abstract class Weapon extends Item {
  public static MODIFIER_CHANGE_RATE: number = 0.05;

  protected baseDamage: number;
  private baseDurability: number;
  protected damageModifier: number;
  protected durabilityModifier: number;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
    this.damageModifier = 0;
    this.durabilityModifier = Weapon.MODIFIER_CHANGE_RATE;
  }

  public getEffectiveDamage(): number {
    const effectiveDamage = this.baseDamage + this.damageModifier;
    return Number(effectiveDamage.toFixed(2));
  }

  public getEffectiveDurability();
  public getEffectiveDurability(durabilityModifier: number);
  public getEffectiveDurability(durabilityModifier?: number): number {
    return this.baseDurability + (durabilityModifier ?? 0);
  }

  getDamageModifier(): any {
    return this.damageModifier;
  }

  setDamageModifier(value) {
    this.damageModifier = value;
  }

  setDurability(durability: number) {
    this.baseDurability = durability;
  }

  public toString(): string {
    return (
      `${super.toString()}, Damage: ${this.getEffectiveDamage().toFixed(2)},` +
      ` Durability: ${(this.baseDurability * 100).toFixed(2)}%`
    );
  }

  public use(): string {
    let result;
    const nextEffectiveDurability = this.baseDurability - Weapon.MODIFIER_CHANGE_RATE;

    if (this.baseDurability > 0) {
      result = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`;

      this.setDurability(nextEffectiveDurability);

      if (this.baseDurability <= 0) {
        result += `\nThe ${this.name} breaks.`;
      }
    } else {
      result = `You can't use the ${this.name}, it is broken.`;
    }

    return result;
  }

  abstract polish(): void;
}
