import axios from "axios";

import {
  CharacterPowerSourceGlossary,
  characterPowerSourceGlossary,
  CharacterRolesGlossary,
  characterRolesGlossary,
  characterClassesGlossary,
  CharacterClassGlossary,
  CharacterClassName,
  CharacterRoleName,
  characterRacesGlossary,
  CharacterRacesGlossary,
  CharacterRace,
  CharacterRaceName,
  PowerSourceName,
  CharacterAbilityName,
  SkillGlossary,
  skillGlossary,
  CharacterRole,
  SkillName,
} from "~/helpers/dataTypes";

// https://www.mongodb.com/docs/atlas/api/data-api-resources
enum TransactionName {
  findOne = "findOne",
  findMany = "find",
  insertOne = "insertOne",
  insertMany = "insertMany",
  updateOne = "updateOne",
  updateMany = "updateMany",
  deleteOne = "deleteOne",
  deleteMany = "deleteMany",
}

class DbClient {
  private async operator<TParams, TData>(args: {
    actionName: TransactionName.findOne;
    collection: string;
    filter: TParams;
  }): Promise<{ document: TData | null }>;
  private async operator<TParams, TData>(args: {
    actionName: TransactionName.findMany;
    collection: string;
    filter: TParams;
    sort?: Partial<TParams>;
    limit?: number;
    skip?: number;
  }): Promise<TData[]>;
  private async operator<TParams>(args: {
    actionName: TransactionName.insertOne;
    collection: string;
    document: TParams;
  }): Promise<{ insertedId: string }>;
  private async operator<TData>(args: {
    actionName: TransactionName.insertOne;
    collection: string;
    documents: TData[];
  }): Promise<{ insertedIds: string[] }>;
  private async operator<TFilter, TData>(args: {
    actionName: TransactionName.updateOne;
    collection: string;
    filter: TFilter;
    update: TData;
  }): Promise<{ matchedCount: 1; modifiedCount: 1 }>;
  private async operator<TFilter, TData>(args: {
    actionName: TransactionName.updateOne;
    collection: string;
    filter: TFilter;
    update: TData;
    upsert: true;
  }): Promise<{ matchedCount: 0; modifiedCount: 0; upsertedId: string }>;
  private async operator<TFilter, TData>(args: {
    actionName: TransactionName.updateMany;
    collection: string;
    filter: TFilter;
    update: TData;
  }): Promise<{ matchedCount: number; modifiedCount: number }>;
  private async operator<TFilter, TData>(args: {
    actionName: TransactionName.updateMany;
    collection: string;
    filter: TFilter;
    update: TData;
    upsert: true;
  }): Promise<{ matchedCount: 0; modifiedCount: 0; upsertedId: string }>;
  private async operator<TFilter>(args: {
    actionName: TransactionName.deleteOne;
    collection: string;
    filter: TFilter;
  }): Promise<{ deletedCount: 1 }>;
  private async operator<TFilter>(args: {
    actionName: TransactionName.deleteMany;
    collection: string;
    filter: TFilter;
  }): Promise<{ deletedCount: number }>;
  private async operator<TData>({
    actionName,
    ...args
  }: {
    [key: string]: unknown;
    actionName: TransactionName;
    collection: string;
  }): Promise<TData> {
    const response = await axios.post<TData>(
      `https://data.mongodb-api.com/app/data-izifl/endpoint/data/beta/action/${actionName}`,
      {
        database: "dnd_4e_db",
        dataSource: "Cluster0",
        ...args,
      },
      {
        headers: {
          "api-key": String(process.env.MONGODB_API_KEY),
          "Access-Control-Request-Headers": "*",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

  public async findAllCharacterRoles(): Promise<CharacterRole[]> {
    return this.operator<Partial<CharacterRole>, CharacterRole>({
      actionName: TransactionName.findMany,
      collection: "character_role",
      filter: {},
      limit: 10,
    });
  }

  public fetchSkillNames(): SkillName[] {
    return Object.values(SkillName);
  }

  public fetchSkillGlossary(): SkillGlossary {
    return skillGlossary;
  }

  public fetchCharacterAbilities(): CharacterAbilityName[] {
    return Object.values(CharacterAbilityName);
  }

  public fetchCharacterRoles(): CharacterRoleName[] {
    return Object.values(CharacterRoleName);
  }

  public fetchCharacterRolesGlossary(): CharacterRolesGlossary {
    return characterRolesGlossary;
  }

  public fetchCharacterPowerSources(): PowerSourceName[] {
    return Object.values(PowerSourceName);
  }

  public fetchCharacterPowerSourcesGlossary(): CharacterPowerSourceGlossary {
    return characterPowerSourceGlossary;
  }

  public fetchCharacterClasses(): CharacterClassName[] {
    return Object.values(CharacterClassName);
  }

  public fetchCharacterClassGlossary(): CharacterClassGlossary {
    return characterClassesGlossary;
  }

  public fetchCharacterClassByRoleAndPower(
    role: CharacterClassGlossary[CharacterClassName]["mainRole"],
    power: CharacterClassGlossary[CharacterClassName]["powerSource"]
  ): CharacterClassGlossary[CharacterClassName][] {
    return Object.values(characterClassesGlossary).filter(
      ({ mainRole, powerSource }) =>
        powerSource === power && // same power source
        mainRole === role // same main role
    );
  }

  public fetchCharacterClassByName(
    characterClassName: CharacterClassName
  ): CharacterClassGlossary[CharacterClassName] {
    return characterClassesGlossary[characterClassName];
  }

  public fetchCharacterRaceByName(
    characterRaceName: CharacterRaceName
  ): CharacterRacesGlossary[CharacterRaceName] {
    return characterRacesGlossary[characterRaceName];
  }

  public fetchCharacterRaceNames(): CharacterRaceName[] {
    return Object.values(CharacterRaceName);
  }

  public fetchCharacterRacesGlossary(): CharacterRacesGlossary {
    return characterRacesGlossary;
  }

  public fetchCharacterRacesByAbilityBonus(
    keyAbilities: CharacterAbilityName[]
  ): CharacterRace[] {
    const [coreAbility] = keyAbilities;

    return Object.values(characterRacesGlossary)
      .reduce((filteredRaces, currentRace): CharacterRace[] => {
        const withFilteredAbilities = {
          ...currentRace,
          abilityBonus: currentRace.abilityBonus.filter((ability) =>
            keyAbilities.includes(ability)
          ),
        };

        if (
          withFilteredAbilities.abilityBonus.length > 0 &&
          withFilteredAbilities.abilityBonus.includes(coreAbility)
        ) {
          filteredRaces.push(withFilteredAbilities);
        }

        return filteredRaces;
      }, [] as CharacterRace[])
      .sort(({ abilityBonus: a }, { abilityBonus: b }) => b.length - a.length);
  }
}

export default new DbClient();
