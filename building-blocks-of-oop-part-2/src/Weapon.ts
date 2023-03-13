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
    if (this.baseDurability <= 0) {
      return `You can't use the ${this.name}, it is broken.`;
    }

    const nextEffectiveDurability = this.baseDurability - Weapon.MODIFIER_CHANGE_RATE;
    this.setDurability(nextEffectiveDurability);

    const usageText = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`

    if (this.baseDurability <= 0) {
      return `${usageText}\nThe ${this.name} breaks.`;
    }

    return usageText;
  }

  abstract polish(): void;
}
