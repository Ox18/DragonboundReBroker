import { ItemEquipped } from "@/domain/models/item-equipped.model";
import itemEquippedModel from "../models/item-equipped.model";

export class ItemEquippedRepository {
  static getByUser(user: string): Promise<ItemEquipped | null> {
    return itemEquippedModel.findOne({ user });
  }

  static async bulk(itemEquipped: ItemEquipped[]): Promise<void> {
    await itemEquippedModel.insertMany(itemEquipped);
  }
}