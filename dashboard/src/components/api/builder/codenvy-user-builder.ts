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

interface IUser {
  id: string;
  name?: string;
  email?: string;
  aliases?: string;
}

/**
 * This class is providing a builder for User
 * @author Florent Benoit
 * @author Oleksii Orel
 */
export class CodenvyUserBuilder {

  user: IUser = {id: 'testUserId'};


  /**
   * Sets the email of the user
   * @param email the email to use
   * @returns {CodenvyUserBuilder}
   */
  withEmail(email: string): CodenvyUserBuilder {
    this.user.email = email;
    return this;
  }

  /**
   * Sets the id of the user
   * @param id the id to use
   * @returns {CodenvyUserBuilder}
   */
  withId(id: string): CodenvyUserBuilder {
    this.user.id = id;
    return this;
  }

  /**
   * Sets the name of the user
   * @param name {string}
   * @returns {CodenvyUserBuilder}
   */
  withName(name: string): CodenvyUserBuilder {
    this.user.name = name;
    return this;
  }

  /**
   * Sets the aliases of the user
   * @param aliases the aliases to use
   * @returns {CodenvyUserBuilder}
   */
  withAliases(aliases: string): CodenvyUserBuilder {
    this.user.aliases = aliases;
    return this;
  }

  /**
   * Build the user
   * @returns {CodenvyUserBuilder}
   */
  build(): IUser {
    return this.user;
  }

}
