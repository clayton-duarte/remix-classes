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
  CharacterAbility,
  SkillGlossary,
  skillGlossary,
  CharacterRole,
  SkillName,
} from "~/helpers/dataTypes";

class DbClient {
  private async client<TParams, TData>(
    action: string,
    collection: string,
    projection: TParams
  ): Promise<TData> {
    const response = await axios.post<{ documents: TData }>(
      `https://data.mongodb-api.com/app/data-izifl/endpoint/data/beta/action/${action}`,
      {
        database: "dnd_4e_db",
        dataSource: "Cluster0",
        projection,
        collection,
      },
      {
        headers: {
          "api-key": String(process.env.MONGODB_API_KEY),
          "Access-Control-Request-Headers": "*",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.documents;
  }

  public async findAllCharacterRoles() {
    return this.client<Partial<CharacterRole>, CharacterRole[]>(
      "find",
      "character_role",
      {}
    );
  }

  public fetchSkillNames(): SkillName[] {
    return Object.values(SkillName);
  }

  public fetchSkillGlossary(): SkillGlossary {
    return skillGlossary;
  }

  public fetchCharacterAbilities(): CharacterAbility[] {
    return Object.values(CharacterAbility);
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
    keyAbilities: CharacterAbility[]
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
