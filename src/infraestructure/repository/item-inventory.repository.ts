import { ItemInventory } from "@/domain/models/item-inventory.model";
import itemInventoryModel from "../models/item-inventory.model";

export class ItemInventoryRepository {
  static getByItemAndUser(
    item: string,
    user: string
  ): Promise<ItemInventory | null> {
    return itemInventoryModel.findOne({ item, user });
  }

  static async bulk(itemInventory: ItemInventory[]): Promise<void> {
    await itemInventoryModel.insertMany(itemInventory);
  }
}
