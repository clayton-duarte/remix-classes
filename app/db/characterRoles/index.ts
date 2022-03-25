import { CharacterRoleModel } from "~/db/characterRoles/model";
import { dbConnect } from "~/db/helpers";
import { CharacterRoleName, CharacterRole } from "~/helpers/dataTypes";

export const getAllCharacterRole = async () => {
  await dbConnect();

  const results = await CharacterRoleModel.find({});

  return results;
};

export const getCharacterRoleByName = async (name: CharacterRoleName) => {
  await dbConnect();

  const results = await CharacterRoleModel.findOne({ name });

  return results;
};

export const postCharacterRoleByName = async (characterRole: CharacterRole) => {
  await dbConnect();

  const results = await CharacterRoleModel.create({
    _id: characterRole.name, // make name a unique id
    ...characterRole,
  });

  return results;
};

export const putCharacterRoleByName = async (
  _id: string,
  characterRole: CharacterRole
) => {
  await dbConnect();

  const results = await CharacterRoleModel.updateOne({ _id, ...characterRole });

  return results;
};

export const deleteCharacterRoleByName = async (_id: string) => {
  await dbConnect();

  const results = await CharacterRoleModel.deleteOne({ _id });

  return results;
};
