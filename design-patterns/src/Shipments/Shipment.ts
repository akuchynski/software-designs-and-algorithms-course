import { Shipper } from "../Shippers/Shipper";
import { ShipperFactory } from "../Shippers/ShipperFactory";
import { IShipment, Marks, ShipmentState } from "../types";

export abstract class Shipment implements IShipment {
  protected shipmentStrategy: Shipper;
  static shipmentId = 0;

  protected constructor(private state: ShipmentState) {
    this.shipmentStrategy = ShipperFactory.getShipperStrategy(this.state.fromZipCode);
  }

  abstract getCost(): number;

  public getShipmentID() {
    Shipment.shipmentId++;
    return this.state.shipmentId !== 0 ? this.state.shipmentId : Shipment.shipmentId;
  }

  public ship() {
    return `Shipment id: ${this.getShipmentID()}, from: ${this.state.fromAddress} ${this.state.fromZipCode}, to: ${
      this.state.toAddress
    } ${this.state.toZipCode}, cost: ${this.getCost()}$`;
  }

  public getWeight() {
    return this.state.weight;
  }

  public setToAddress(address: string) {
    this.state.toAddress = address;
  }

  public setFromAddress(address: string) {
    this.state.fromAddress = address;
  }

  public setToZipCode(zipCode: string) {
    this.state.toZipCode = zipCode;
  }

  public setFromZipCode(zipCode: string) {
    this.state.fromZipCode = zipCode;
  }

  public getMarks() {
    return this.state.marks;
  }

  public setMarks(marks: Marks[]) {
    this.state.marks = marks;
  }
}
