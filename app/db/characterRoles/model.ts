import mongoose from "mongoose";

import { initializeModel } from "~/db/helpers";
import { CharacterRole, CharacterRoleName } from "~/helpers/dataTypes";

const CharacterRoleSchema = new mongoose.Schema<CharacterRole>({
  description: String,
  name: {
    type: String,
    enum: Object.values(CharacterRoleName),
  },
});

export const CharacterRoleModel = initializeModel<CharacterRole>(
  "character_role",
  CharacterRoleSchema
);
