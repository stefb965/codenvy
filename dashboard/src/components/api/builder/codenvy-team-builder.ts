/*
 *  [2015] - [2017] Codenvy, S.A.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
 */
'use strict';


interface Iteam {
  id: string;
  name?: string;
  parent?: string;
}

/**
 * This class is providing a builder for Team
 * @author Oleksii Orel
 */
export class CodenvyTeamBuilder {

  private team: Iteam = {id: 'organization1test'};

  /**
   * Sets the id of the team
   * @param id {string}
   * @returns {CodenvyTeamBuilder}
   */
  withId(id: string): CodenvyTeamBuilder {
    this.team.id = id;
    return this;
  }

  /**
   * Sets the name of the team
   * @param name {string}
   * @returns {CodenvyTeamBuilder}
   */
  withName(name: string): CodenvyTeamBuilder {
    this.team.name = name;
    return this;
  }


  /**
   * Sets the parent id of the team
   * @param parent {string}
   * @returns {CodenvyTeamBuilder}
   */
  withParent(parent: string): CodenvyTeamBuilder {
    this.team.parent = parent;
    return this;
  }

  /**
   * Build the team
   * @returns {Iteam}
   */
  build(): Iteam {
    return this.team;
  }

}
