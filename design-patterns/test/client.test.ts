import { Client } from "../src/Client";
import { MockGUI } from "../src/mockGui";
import { ShipmentState } from "../src/types";

describe("Client", () => {
  it("ship method should return correct string with shipment data", () => {
    const state: ShipmentState = {
      shipmentId: 19,
      toAddress: "New York",
      fromAddress: "London",
      toZipCode: "12345",
      fromZipCode: "54321",
      weight: 10,
    };
    const gui = new MockGUI();
    const client = new Client(gui);
    const spyShipment = jest.spyOn(client, "onShip");

    gui.trigger("ship", state);
    expect(spyShipment).toHaveReturnedWith("Shipment id: 19, from: London 54321, to: New York 12345, cost: 4.2$");
    spyShipment.mockClear();
  });

  it("ship method should return correct string with marks", () => {
    const state: ShipmentState = {
      shipmentId: 19,
      toAddress: "New York",
      fromAddress: "London",
      toZipCode: "12345",
      fromZipCode: "54321",
      weight: 10,
      marks: ["Fragile", "Do Not Leave", "Return Receipt Requested"],
    };
    const gui = new MockGUI();
    const client = new Client(gui);
    const spyShipment = jest.spyOn(client, "onShip");

    gui.trigger("ship", state);
    expect(spyShipment).toHaveReturnedWith(
      "Shipment id: 19, from: London 54321, to: New York 12345, cost: 4.2$\n**MARK FRAGILE**\n**MARK DO NOT LEAVE**\n**MARK RETURN RECEIPT REQUESTED**"
    );
    spyShipment.mockClear();
  });
});
